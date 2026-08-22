const HL_API = "https://api.hyperliquid.xyz/info";
const LIGHTER_MAIN = "https://mainnet.zklighter.elliot.ai/api/v1";
const LIGHTER_RH = "https://api.rh.lighter.xyz/api/v1";

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
    const [state, fills] = await Promise.all([request("clearinghouseState"), request("userFills")]);
    const positions = (state.assetPositions ?? []).map((row: AnyRecord) => row.position ?? row).filter((p: AnyRecord) => n(p.szi) !== 0).map((p: AnyRecord) => ({
      symbol: String(p.coin ?? "?"), side: n(p.szi) >= 0 ? "LONG" : "SHORT", size: Math.abs(n(p.szi)),
      value: Math.abs(n(p.positionValue)), entry: n(p.entryPx), pnl: n(p.unrealizedPnl), liquidation: n(p.liquidationPx),
      leverage: n(p.leverage?.value), marginMode: p.leverage?.type ?? "cross", funding: n(p.cumFunding?.sinceOpen),
    }));
    const recent = (Array.isArray(fills) ? fills : []).slice(0, 100);
    return { venue: "Hyperliquid", network: "HyperCore", ok: true, accountValue: n(state.marginSummary?.accountValue),
      withdrawable: n(state.withdrawable), totalExposure: positions.reduce((s:number,p:AnyRecord)=>s+p.value,0),
      unrealizedPnl: positions.reduce((s:number,p:AnyRecord)=>s+p.pnl,0), realizedPnl: recent.reduce((s:number,f:AnyRecord)=>s+n(f.closedPnl),0),
      volume: recent.reduce((s:number,f:AnyRecord)=>s+n(f.px)*n(f.sz),0), trades: recent.length, positions };
  } catch (error) { return { venue:"Hyperliquid", network:"HyperCore", ok:false, error:error instanceof Error?error.message:"Unavailable", positions:[] }; }
}

function accountsFrom(payload: AnyRecord) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.accounts)) return payload.accounts;
  if (payload.account) return Array.isArray(payload.account) ? payload.account : [payload.account];
  if (payload.account_index !== undefined) return [payload];
  return [];
}

async function lighter(address: string, robinhood: boolean) {
  const base = robinhood ? LIGHTER_RH : LIGHTER_MAIN;
  const venue = robinhood ? "Lighter · Robinhood" : "Lighter";
  try {
    const response = await deadlineFetch(`${base}/account?by=l1_address&value=${address}&active_only=true`);
    if (!response.ok) throw new Error(response.status === 404 ? "Account not found" : `HTTP ${response.status}`);
    const payload = await response.json() as AnyRecord;
    const accounts = accountsFrom(payload);
    const positions = accounts.flatMap((a:AnyRecord)=>(a.positions ?? a.position_details ?? [])).filter((p:AnyRecord)=>n(p.position ?? p.size)!==0).map((p:AnyRecord)=>{
      const raw=n(p.position ?? p.size), sign=n(p.sign)||Math.sign(raw)||1;
      return { symbol:String(p.symbol ?? p.market_symbol ?? `Market #${p.market_id ?? "?"}`), side:sign>=0?"LONG":"SHORT", size:Math.abs(raw),
        value:Math.abs(n(p.position_value ?? p.value)), entry:n(p.avg_entry_price ?? p.entry_price), pnl:n(p.unrealized_pnl),
        realizedPnl:n(p.realized_pnl), liquidation:n(p.liquidation_price), leverage:n(p.leverage), marginMode:robinhood?"isolated":"account", funding:n(p.total_funding_paid) };
    });
    const collateral=accounts.reduce((s:number,a:AnyRecord)=>s+n(a.collateral ?? a.account_value ?? a.total_asset_value),0);
    return { venue, network:robinhood?"Robinhood Chain":"Ethereum", quote:robinhood?"USDG":"USDC", ok:true,
      accountValue:collateral, withdrawable:accounts.reduce((s:number,a:AnyRecord)=>s+n(a.available_balance ?? a.available_collateral),0),
      totalExposure:positions.reduce((s:number,p:AnyRecord)=>s+p.value,0), unrealizedPnl:positions.reduce((s:number,p:AnyRecord)=>s+p.pnl,0),
      realizedPnl:positions.reduce((s:number,p:AnyRecord)=>s+n(p.realizedPnl),0), trades:0, volume:0, positions,
      accountIndexes:accounts.map((a:AnyRecord)=>a.account_index).filter((x:unknown)=>x!==undefined),
      points:robinhood?{ eligible:"Activity-dependent", multiplier:"2× via Robinhood Wallet", publicBalance:false }:undefined };
  } catch (error) { return { venue, network:robinhood?"Robinhood Chain":"Ethereum", quote:robinhood?"USDG":"USDC", ok:false, error:error instanceof Error?error.message:"Unavailable", positions:[] }; }
}

export async function GET(request: Request) {
  const address = new URL(request.url).searchParams.get("address")?.trim() ?? "";
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return Response.json({ error:"Enter a valid 42-character EVM address." }, { status:400 });
  const sources = await Promise.all([hyperliquid(address), lighter(address,false), lighter(address,true)]);
  return Response.json({ address, generatedAt:new Date().toISOString(), sources,
    summary:{ activeSources:sources.filter(s=>s.ok&&((s.accountValue??0)>0||s.positions.length>0)).length,
      accountValue:sources.reduce((sum,s)=>sum+(s.ok?n(s.accountValue):0),0), exposure:sources.reduce((sum,s)=>sum+(s.ok?n(s.totalExposure):0),0),
      unrealizedPnl:sources.reduce((sum,s)=>sum+(s.ok?n(s.unrealizedPnl):0),0), positions:sources.reduce((sum,s)=>sum+s.positions.length,0) },
    notes:{ robinhood:"Robinhood Chain is a separate Lighter deployment. Accounts, market IDs and collateral are not shared with Lighter Mainnet.", points:"Public wallet endpoints do not expose a verified total points balance. The analyzer will not estimate it." }
  }, { headers:{"cache-control":"public, s-maxage=10, stale-while-revalidate=30"} });
}
