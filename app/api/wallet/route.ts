const HL_API = "https://api.hyperliquid.xyz/info";
const LIGHTER_MAIN = "https://mainnet.zklighter.elliot.ai/api/v1";
const LIGHTER_RH = "https://api.rh.lighter.xyz/api/v1";
const SODEX = "https://mainnet-gw.sodex.dev/api/v1/perps";
const ARCUS = "https://api.arcus.xyz/v1";

const n = (value: unknown) => Number.isFinite(Number(value)) ? Number(value) : 0;

type AnyRecord = Record<string, any>;

async function deadlineFetch(url: string, init?: RequestInit, ms = 9000): Promise<Response> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      fetch(url, init),
      new Promise<Response>((_, reject) => { timer = setTimeout(() => reject(new Error("Provider timed out")), ms); }),
    ]);
  } finally { if (timer) clearTimeout(timer); }
}

async function hyperliquid(address: string) {
  const request = (type: string) => deadlineFetch(HL_API, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ type, user: address }),
  }).then(async r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); });
  try {
    const [state, fills, portfolio] = await Promise.all([request("clearinghouseState"), request("userFills"), request("portfolio")]);
    const positions = (state.assetPositions ?? []).map((row: AnyRecord) => row.position ?? row).filter((p: AnyRecord) => n(p.szi) !== 0).map((p: AnyRecord) => ({
      symbol: String(p.coin ?? "?"), side: n(p.szi) >= 0 ? "LONG" : "SHORT", size: Math.abs(n(p.szi)),
      value: Math.abs(n(p.positionValue)), entry: n(p.entryPx), pnl: n(p.unrealizedPnl), liquidation: n(p.liquidationPx),
      leverage: n(p.leverage?.value), marginMode: p.leverage?.type ?? "cross", funding: n(p.cumFunding?.sinceOpen),
    }));
    const recent = (Array.isArray(fills) ? fills : []).slice(0, 50);
    const allTime = (Array.isArray(portfolio) ? portfolio : []).find((row:AnyRecord)=>row?.[0]==="allTime")?.[1];
    const pnlHistory = Array.isArray(allTime?.pnlHistory) ? allTime.pnlHistory : [];
    const allTimePnl = pnlHistory.length ? n(pnlHistory[pnlHistory.length-1]?.[1]) : recent.reduce((s:number,f:AnyRecord)=>s+n(f.closedPnl),0);
    const transactions = recent.map((f:AnyRecord)=>({ id:String(f.tid ?? f.hash ?? `${f.time}-${f.coin}`), time:n(f.time), symbol:String(f.coin??"?"), side:String(f.side??f.dir??"—"), price:n(f.px), size:n(f.sz), value:n(f.px)*n(f.sz), fee:n(f.fee), realizedPnl:n(f.closedPnl), type:String(f.dir??"Trade") }));
    return { venue: "Hyperliquid", network: "HyperCore", ok: true, accountValue: n(state.marginSummary?.accountValue),
      withdrawable: n(state.withdrawable), totalExposure: positions.reduce((s:number,p:AnyRecord)=>s+p.value,0),
      unrealizedPnl: positions.reduce((s:number,p:AnyRecord)=>s+p.pnl,0), realizedPnl: recent.reduce((s:number,f:AnyRecord)=>s+n(f.closedPnl),0), allTimePnl,
      volume: n(allTime?.vlm)||null, volumeVerified:Boolean(n(allTime?.vlm)), volumeLabel:n(allTime?.vlm)?"ALL-TIME VOLUME":"NOT EXPOSED", trades: recent.length, positions, transactions };
  } catch (error) { return { venue:"Hyperliquid", network:"HyperCore", ok:false, error:error instanceof Error?error.message:"Unavailable", positions:[] }; }
}

function accountsFrom(payload: AnyRecord) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.accounts)) return payload.accounts;
  if (payload.account) return Array.isArray(payload.account) ? payload.account : [payload.account];
  if (payload.account_index !== undefined) return [payload];
  return [];
}

async function lighter(address: string, robinhood: boolean, readOnlyToken?: string) {
  const base = robinhood ? LIGHTER_RH : LIGHTER_MAIN;
  const venue = robinhood ? "Lighter · Robinhood" : "Lighter";
  try {
    const response = await deadlineFetch(`${base}/account?by=l1_address&value=${address}&active_only=false`);
    if (!response.ok) throw new Error(response.status === 404 ? "Account not found" : `HTTP ${response.status}`);
    const payload = await response.json() as AnyRecord;
    const accounts = accountsFrom(payload);
    const historyPositions = accounts.flatMap((a:AnyRecord)=>(a.positions ?? a.position_details ?? []));
    const positions = historyPositions.filter((p:AnyRecord)=>n(p.position ?? p.size)!==0).map((p:AnyRecord)=>{
      const raw=n(p.position ?? p.size), sign=n(p.sign)||Math.sign(raw)||1;
      return { symbol:String(p.symbol ?? p.market_symbol ?? `Market #${p.market_id ?? "?"}`), side:sign>=0?"LONG":"SHORT", size:Math.abs(raw),
        value:Math.abs(n(p.position_value ?? p.value)), entry:n(p.avg_entry_price ?? p.entry_price), pnl:n(p.unrealized_pnl),
        realizedPnl:n(p.realized_pnl), liquidation:n(p.liquidation_price), leverage:n(p.leverage), marginMode:robinhood?"isolated":"account", funding:n(p.total_funding_paid) };
    });
    const collateral=accounts.reduce((s:number,a:AnyRecord)=>s+n(a.collateral ?? a.account_value ?? a.total_asset_value),0);
    const tradePayloads = await Promise.all(accounts.map(async(a:AnyRecord)=>{
      try { const r=await deadlineFetch(`${base}/trades?account_index=${a.account_index}&market_id=255&market_type=perp&sort_by=timestamp&sort_dir=desc&limit=50`,readOnlyToken?{headers:{Authorization:readOnlyToken}}:undefined); return r.ok ? r.json() : {code:r.status,message:`HTTP ${r.status}`}; } catch (error) { return {code:-1,message:error instanceof Error?error.message:"Trade history unavailable"}; }
    }));
    const rawTrades=tradePayloads.flatMap((p:AnyRecord)=>Array.isArray(p)?p:(p.trades??[])).sort((a:AnyRecord,b:AnyRecord)=>n(b.timestamp)-n(a.timestamp)).slice(0,50);
    const transactions=rawTrades.map((t:AnyRecord)=>({id:String(t.trade_id??t.id??`${t.timestamp}-${t.market_id}`),time:n(t.timestamp),symbol:String(t.symbol??t.market_symbol??`Market #${t.market_id??"?"}`),side:t.is_ask===true||n(t.ask_account_index)>=0&&String(t.side).toLowerCase()==="sell"?"SELL":String(t.side??t.type??"TRADE").toUpperCase(),price:n(t.price),size:n(t.size??t.base_amount),value:n(t.price)*n(t.size??t.base_amount),fee:n(t.fee??t.usd_fee),realizedPnl:n(t.realized_pnl),type:String(t.trade_type??t.type??"Trade") }));
    const historyError=tradePayloads.find((p:AnyRecord)=>n(p.code)!==0&&n(p.code)!==200)?.message;
    const historyStatus=historyError?"auth_required":"public";
    const allTimePnl=historyStatus==="public"?historyPositions.reduce((s:number,p:AnyRecord)=>s+n(p.realized_pnl),0):null;
    return { venue, network:robinhood?"Robinhood Chain":"Ethereum", quote:robinhood?"USDG":"USDC", ok:true,
      accountValue:collateral, withdrawable:accounts.reduce((s:number,a:AnyRecord)=>s+n(a.available_balance ?? a.available_collateral),0),
      totalExposure:positions.reduce((s:number,p:AnyRecord)=>s+p.value,0), unrealizedPnl:positions.reduce((s:number,p:AnyRecord)=>s+p.pnl,0),
      realizedPnl:positions.reduce((s:number,p:AnyRecord)=>s+n(p.realizedPnl),0), allTimePnl, trades:transactions.length, volume:null, volumeVerified:false, volumeLabel:historyError?"AUTH REQUIRED":"NOT EXPOSED", positions, transactions,
      historyStatus, historyMessage:historyError?"Lighter requires read-only authorization for this account's trade history. Public balance and open positions remain available.":undefined,
      accountIndexes:accounts.map((a:AnyRecord)=>a.account_index).filter((x:unknown)=>x!==undefined),
      points:robinhood?{ eligible:"Activity-dependent", multiplier:"2× via Robinhood Wallet", publicBalance:false }:undefined };
  } catch (error) { return { venue, network:robinhood?"Robinhood Chain":"Ethereum", quote:robinhood?"USDG":"USDC", ok:false, error:error instanceof Error?error.message:"Unavailable", positions:[] }; }
}

async function sodex(address:string){
  const venue="SoDEX";
  try{
    const get=(path:string)=>deadlineFetch(`${SODEX}${path}`,{headers:{accept:"application/json"}}).then(async r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);const p=await r.json() as AnyRecord;if(n(p.code)!==0)throw new Error(p.error?.message??p.error??`Code ${p.code}`);return p.data??p});
    const genesis=Date.UTC(2025,0,1), now=Date.now(), windowMs=90*86400000;
    async function tradeWindow(start:number,end:number,depth=0):Promise<{rows:AnyRecord[];complete:boolean}>{
      const rows=await get(`/accounts/${address}/trades?startTime=${start}&endTime=${end}&limit=1000`);const list=Array.isArray(rows)?rows:(rows.trades??[]);
      if(list.length<1000)return{rows:list,complete:true};
      if(depth>=6||end-start<=86400000)return{rows:list,complete:false};
      const mid=Math.floor((start+end)/2);const [a,b]=await Promise.all([tradeWindow(start,mid,depth+1),tradeWindow(mid+1,end,depth+1)]);return{rows:[...a.rows,...b.rows],complete:a.complete&&b.complete};
    }
    const windows=[] as Promise<{rows:AnyRecord[];complete:boolean}>[];for(let start=genesis;start<now;start+=windowMs)windows.push(tradeWindow(start,Math.min(start+windowMs-1,now)));
    const [state,positionPayload,historyWindows]=await Promise.all([get(`/accounts/${address}/state`),get(`/accounts/${address}/positions`),Promise.all(windows)]);
    const rawPositions=Array.isArray(state.P)?state.P:Array.isArray(positionPayload)?positionPayload:(positionPayload.positions??positionPayload.orders??[]);
    const positions=rawPositions.filter((p:AnyRecord)=>n(p.size??p.s??p.position??p.q)!==0).map((p:AnyRecord)=>{const raw=n(p.size??p.s??p.position??p.q);return{symbol:String(p.symbol??p.sym??p.market??p.m??"?"),side:String(p.side??(raw>=0?"LONG":"SHORT")).toUpperCase(),size:Math.abs(raw),value:Math.abs(n(p.value??p.notional??p.pv)),entry:n(p.entryPrice??p.entry_price??p.ep),pnl:n(p.unrealizedPnl??p.unrealized_pnl??p.upnl),liquidation:n(p.liquidationPrice??p.liquidation_price??p.lp)}});
    const allRows=historyWindows.flatMap(w=>w.rows);const deduped=[...new Map(allRows.map((t:AnyRecord)=>[String(t.tradeID??t.tradeId??t.id??`${t.time}-${t.symbol}-${t.price}-${t.size}`),t])).values()];
    const rawTrades=deduped.sort((a:AnyRecord,b:AnyRecord)=>n(b.time??b.timestamp)-n(a.time??a.timestamp)).slice(0,50);
    const transactions=rawTrades.map((t:AnyRecord)=>({id:String(t.tradeID??t.tradeId??t.id??`${t.time}-${t.symbol}`),time:n(t.time??t.timestamp),symbol:String(t.symbol??t.market??"?"),side:String(t.side??t.direction??"TRADE").toUpperCase(),price:n(t.price??t.p),size:n(t.size??t.qty??t.q),value:n(t.value??t.notional)||n(t.price??t.p)*n(t.size??t.qty??t.q),fee:n(t.fee),realizedPnl:n(t.realizedPnl??t.realized_pnl),type:String(t.type??"Trade")}));
    const complete=historyWindows.every(w=>w.complete);const volume=deduped.reduce((s:number,t:AnyRecord)=>s+(n(t.value??t.notional??t.quoteAmount)||n(t.price??t.p)*n(t.size??t.qty??t.q)),0);
    return{venue,network:"ValueChain",quote:"vUSDC",ok:true,accountValue:n(state.av??state.accountValue),withdrawable:n(state.amw??state.availableMargin),totalExposure:positions.reduce((s:number,p:AnyRecord)=>s+p.value,0),unrealizedPnl:positions.reduce((s:number,p:AnyRecord)=>s+p.pnl,0),allTimePnl:null,trades:transactions.length,volume:complete?volume:null,volumeVerified:complete,volumeLabel:complete?"ALL-TIME VOLUME":"HISTORY INCOMPLETE",positions,transactions,historyStatus:complete?"public":"partial",historyMessage:transactions.length?undefined:"No public SoDEX trades found for the primary account."};
  }catch(error){return{venue,network:"ValueChain",quote:"vUSDC",ok:false,error:error instanceof Error?error.message:"Unavailable",positions:[],transactions:[]};}
}

async function arcus(address:string){
  const venue="Arcus Perps";
  try{
    const get=(path:string)=>deadlineFetch(`${ARCUS}${path}`).then(async r=>{const p=await r.json() as AnyRecord;if(r.status===403)throw new Error(p.error??"Address whitelist required");if(!r.ok)throw new Error(p.error??`HTTP ${r.status}`);return p});
    const [account,positionPayload,fillPayload,rateLimit]=await Promise.all([get(`/account?address=${address}`),get(`/positions?address=${address}`),get(`/fills?address=${address}&limit=50`),get(`/rateLimit?address=${address}`)]);
    const rawPositions=Object.values(positionPayload.positions??{});
    const positions=rawPositions.map((p:AnyRecord)=>{const raw=n(p.size??p.positionSize);return{symbol:String(p.marketDisplayName??p.market??p.marketId??"?"),side:String(p.side??(raw>=0?"LONG":"SHORT")).toUpperCase(),size:Math.abs(raw),value:Math.abs(n(p.notional??p.positionValue)),entry:n(p.entryPrice),pnl:n(p.unrealizedPnl),liquidation:n(p.liquidationPrice)}});
    const rawFills=(fillPayload.fills??fillPayload.data??[]).slice(0,50);
    const transactions=rawFills.map((t:AnyRecord)=>({id:String(t.tradeId??t.fillId??t.id),time:n(t.timestamp??t.time),symbol:String(t.marketDisplayName??t.market??t.marketId??"?"),side:String(t.side??"TRADE").toUpperCase(),price:n(t.price),size:n(t.size),value:n(t.notional)||n(t.price)*n(t.size),fee:n(t.fee),realizedPnl:n(t.realizedPnl),type:String(t.type??"Fill")}));
    const lifetimeVolume=Math.max(0,(n(rateLimit.order?.cap)-20000)*0.10);
    return{venue,network:"Robinhood Chain",quote:"USDG",ok:true,accountValue:n(account.accountValue??account.equity),withdrawable:n(account.availableBalance??account.withdrawable),totalExposure:positions.reduce((s:number,p:AnyRecord)=>s+p.value,0),unrealizedPnl:positions.reduce((s:number,p:AnyRecord)=>s+p.pnl,0),allTimePnl:n(account.realizedPnl??account.allTimePnl),trades:transactions.length,volume:lifetimeVolume,volumeVerified:true,volumeLabel:"ALL-TIME VOLUME",positions,transactions};
  }catch(error){const message=error instanceof Error?error.message:"Unavailable";return{venue,network:"Robinhood Chain",quote:"USDG",ok:false,access:message.toLowerCase().includes("whitelist")?"whitelist":undefined,error:message,positions:[],transactions:[]};}
}

function perpl(){return{venue:"Perpl",network:"Monad",quote:"USDC",ok:false,access:"unsafe_scope",volume:null,volumeVerified:false,volumeLabel:"AUTH BLOCKED",error:"Perpl API enrollment is not guaranteed read-only. This terminal will not request a trading-capable key.",positions:[],transactions:[]};}

function safeReadOnlyToken(value:unknown){const token=typeof value==="string"?value.trim():"";return token.length<=512&&/^ro:\d+:(single|all):\d+:[a-zA-Z0-9_-]+$/.test(token)?token:undefined}

async function analyzeAddress(address:string,auth?:AnyRecord){
  const sources = await Promise.all([hyperliquid(address), lighter(address,false,safeReadOnlyToken(auth?.lighterMain)), lighter(address,true,safeReadOnlyToken(auth?.lighterRobinhood)), sodex(address), arcus(address), Promise.resolve(perpl())]);
  return { address, generatedAt:new Date().toISOString(), sources,
    summary:{ activeSources:sources.filter(s=>s.ok&&((s.accountValue??0)>0||s.positions.length>0)).length,
      accountValue:sources.reduce((sum,s)=>sum+(s.ok?n(s.accountValue):0),0), exposure:sources.reduce((sum,s)=>sum+(s.ok?n(s.totalExposure):0),0),
      unrealizedPnl:sources.reduce((sum,s)=>sum+(s.ok?n(s.unrealizedPnl):0),0), allTimePnl:sources.reduce((sum,s)=>sum+(s.ok&&s.allTimePnl!==null?n(s.allTimePnl):0),0), allTimeSources:sources.filter(s=>s.ok&&s.allTimePnl!==null).length, volume:sources.reduce((sum,s)=>sum+(s.ok&&s.volumeVerified?n(s.volume):0),0), volumeSources:sources.filter(s=>s.ok&&s.volumeVerified).length, positions:sources.reduce((sum,s)=>sum+s.positions.length,0), transactions:sources.reduce((sum,s)=>sum+(s.transactions?.length??0),0) },
    notes:{ robinhood:"Robinhood Chain is a separate Lighter deployment. Accounts, market IDs and collateral are not shared with Lighter Mainnet.", points:"Public wallet endpoints do not expose a verified total points balance. The analyzer will not estimate it." }
  };
}

export async function GET(request: Request) {
  const address = new URL(request.url).searchParams.get("address")?.trim() ?? "";
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return Response.json({ error:"Enter a valid 42-character EVM address." }, { status:400 });
  return Response.json(await analyzeAddress(address), { headers:{"cache-control":"public, s-maxage=10, stale-while-revalidate=30"} });
}

export async function POST(request:Request){
  let body:AnyRecord;try{body=await request.json() as AnyRecord}catch{return Response.json({error:"Invalid request."},{status:400})}
  const address=typeof body.address==="string"?body.address.trim():"";
  if(!/^0x[a-fA-F0-9]{40}$/.test(address))return Response.json({error:"Enter a valid 42-character EVM address."},{status:400});
  return Response.json(await analyzeAddress(address,body.auth),{headers:{"cache-control":"private, no-store","pragma":"no-cache"}})
}
