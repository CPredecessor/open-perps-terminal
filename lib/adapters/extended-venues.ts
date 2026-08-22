import { numeric, type VenueName, type VenueResult } from "../market";

type Row=Record<string,unknown>;
const first=(r:Row,keys:string[])=>keys.map(k=>r[k]).find(v=>v!==undefined);
const list=(payload:unknown,keys:string[])=>{if(Array.isArray(payload))return payload as Row[];if(!payload||typeof payload!=="object")return[];const p=payload as Row;for(const key of keys)if(Array.isArray(p[key]))return p[key] as Row[];return[]};

async function load(venue:VenueName,url:string,keys:string[]):Promise<VenueResult>{
  try{
    const response=await fetch(url,{next:{revalidate:15}});if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const payload=await response.json();
    const markets=list(payload,keys).map((r,i)=>{
      const rawSymbol=String(first(r,["symbol","marketDisplayName","market_symbol","name","ticker","baseAsset"])??`MARKET-${i}`);
      const symbol=rawSymbol.replace(/[-_/]?(PERP|USD|USDC|USDG)$/i,"");
      const price=numeric(first(r,["markPrice","mark_price","lastPrice","last_price","last_trade_price","oraclePrice","oracle_price","price"]));
      const rawFunding=numeric(first(r,["fundingRate","funding_rate","current_funding_rate","funding"]));
      const rawOi=numeric(first(r,["openInterestNotional","open_interest_notional","openInterest","open_interest","oi"]));
      return{symbol,venue,price,change:numeric(first(r,["priceChange24h","price_change_24h","change24h","daily_price_change","price_change_percent"])),volume:numeric(first(r,["volume24hNotional","volume_24h_notional","daily_quote_token_volume","volume24h","volume_24h","quote_volume"])),oi:rawOi>0&&rawOi<1e7&&price>100?rawOi*price:rawOi,funding:rawFunding*(Math.abs(rawFunding)<1?100:1)};
    }).filter(m=>m.price>0||m.volume>0||m.oi>0);
    return{venue,ok:true,markets};
  }catch(error){return{venue,ok:false,markets:[],error:error instanceof Error?error.message:"Unknown error"}}
}

export const getArcusMarkets=()=>load("Arcus Perps","https://api.arcus.xyz/v1/markets",["markets"]);
export async function getPerplMarkets():Promise<VenueResult>{
  const venue="Perpl" as const;try{const r=await fetch("https://app.perpl.xyz/api/v1/pub/context",{next:{revalidate:15}});if(!r.ok)throw new Error(`HTTP ${r.status}`);const p=await r.json() as Row;const markets=list(p,["markets"]).map((m,i)=>{const state=(m.state??{}) as Row,funding=(m.funding??{}) as Row,config=(m.config??{}) as Row;const pd=numeric(config.price_decimals),sd=numeric(config.size_decimals),price=numeric(state.mrk)/10**pd,oiBase=numeric(state.oi)/10**sd,prev=numeric(state.prv)/10**pd;return{symbol:String(m.name??m.symbol??`MARKET-${i}`),venue,price,change:prev?((price-prev)/prev)*100:0,volume:numeric(state.dva)/1e6,oi:oiBase*price,funding:numeric(funding.rate)/1e6}});return{venue,ok:true,markets}}catch(error){return{venue,ok:false,markets:[],error:error instanceof Error?error.message:"Unknown error"}}
}
export async function getSodexMarkets():Promise<VenueResult>{
  const venue="SoDEX" as const;try{const [sr,tr]=await Promise.all([fetch("https://mainnet-gw.sodex.dev/api/v1/perps/markets/symbols",{next:{revalidate:15}}),fetch("https://mainnet-gw.sodex.dev/api/v1/perps/markets/tickers",{next:{revalidate:15}})]);if(!sr.ok||!tr.ok)throw new Error(`HTTP ${sr.status}/${tr.status}`);const [sp,tp]=await Promise.all([sr.json(),tr.json()]) as [Row,Row];const symbols=list(sp,["data","symbols"]),tickers=list(tp,["data","tickers"]);const bySymbol=new Map(tickers.map(t=>[String(t.symbol),t]));const markets=symbols.map((s,i)=>{const t=bySymbol.get(String(s.name??s.symbol))??{};const price=numeric(first(t,["lastPx","markPx","lastPrice"])),open=numeric(first(t,["openPx","openPrice"]));return{symbol:String(s.baseCoin??s.name??`MARKET-${i}`).replace(/-USD$/i,""),venue,price,change:open?((price-open)/open)*100:0,volume:numeric(first(t,["quoteVolume","quoteVol","volume24h"])),oi:numeric(first(t,["openInterestUSD","openInterestValue","openInterest"]))||numeric(s.openInterestCapUSD),funding:numeric(first(t,["fundingRate","funding"]))}});return{venue,ok:true,markets:markets.filter(m=>m.price>0)}}catch(error){return{venue,ok:false,markets:[],error:error instanceof Error?error.message:"Unknown error"}}
}
