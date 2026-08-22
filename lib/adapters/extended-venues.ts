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
export const getPerplMarkets=()=>load("Perpl","https://app.perpl.xyz/api/v1/pub/context",["markets","perps","data"]);
export const getSodexMarkets=()=>load("SoDEX","https://mainnet-gw.sodex.dev/api/v1/perps/markets/symbols",["markets","symbols","data"]);
