"use client";

import { useEffect, useMemo, useState } from "react";

type Market = { symbol:string; venue:"Hyperliquid"|"Lighter"; price:number; change:number; volume:number; oi:number; funding:number; spark:number[] };
const markets: Market[] = [
  {symbol:"BTC",venue:"Hyperliquid",price:117842,change:2.84,volume:3280000000,oi:1740000000,funding:.0081,spark:[34,38,35,43,46,44,52,49,57,61,59,67]},
  {symbol:"ETH",venue:"Hyperliquid",price:4482.6,change:4.12,volume:2140000000,oi:1180000000,funding:.0064,spark:[28,31,29,36,33,42,39,48,51,49,55,63]},
  {symbol:"BTC",venue:"Lighter",price:117816,change:2.78,volume:472000000,oi:218000000,funding:.0079,spark:[31,34,33,38,42,40,47,45,51,55,53,60]},
  {symbol:"SOL",venue:"Hyperliquid",price:196.84,change:5.37,volume:918000000,oi:462000000,funding:.0124,spark:[25,29,26,34,31,39,44,41,50,47,56,64]},
  {symbol:"ETH",venue:"Lighter",price:4480.9,change:4.05,volume:326000000,oi:164000000,funding:.0061,spark:[27,30,29,35,34,40,38,46,49,47,54,61]},
  {symbol:"HYPE",venue:"Hyperliquid",price:48.36,change:-1.46,volume:184000000,oi:136000000,funding:-.0042,spark:[62,58,61,54,56,49,52,46,43,47,41,38]},
  {symbol:"SOL",venue:"Lighter",price:196.77,change:5.31,volume:112000000,oi:72000000,funding:.0118,spark:[24,27,26,32,30,37,41,39,47,45,53,60]},
  {symbol:"DOGE",venue:"Lighter",price:.2384,change:-.82,volume:68000000,oi:41000000,funding:-.0016,spark:[56,52,55,50,51,47,49,44,46,42,43,39]},
];
const money=(v:number)=>v>=1e9?`$${(v/1e9).toFixed(2)}B`:`$${(v/1e6).toFixed(0)}M`;
const price=(v:number)=>v<1?`$${v.toFixed(4)}`:v<1000?`$${v.toLocaleString("en-US",{maximumFractionDigits:2})}`:`$${v.toLocaleString("en-US",{maximumFractionDigits:1})}`;

function Sparkline({points,positive}:{points:number[];positive:boolean}){const coords=points.map((p,i)=>`${i/(points.length-1)*100},${70-p}`).join(" ");return <svg className={`spark ${positive?"up":"down"}`} viewBox="0 0 100 48" preserveAspectRatio="none"><polyline points={coords}/></svg>}

export default function Home(){
  const [venue,setVenue]=useState("All venues"),[query,setQuery]=useState(""),[sort,setSort]=useState<"volume"|"change">("volume");
  const [watchlist,setWatchlist]=useState(["BTC-Hyperliquid"]);
  const [marketData,setMarketData]=useState(markets);
  const [dataMode,setDataMode]=useState<"loading"|"live"|"snapshot">("loading");
  useEffect(()=>{fetch("/api/markets").then(r=>r.ok?r.json():Promise.reject()).then(payload=>{
    if(!Array.isArray(payload.markets)||!payload.markets.length) throw new Error("No markets");
    const normalized:Market[]=payload.markets.filter((m:Market)=>m.price>0).map((m:Market)=>({...m,spark:m.spark??(m.change>=0?[30,34,32,39,42,40,47,45,52,55,53,61]:[61,57,59,53,55,48,51,44,46,41,43,37])}));
    if(!normalized.length) throw new Error("No priced markets"); setMarketData(normalized);setDataMode("live");
  }).catch(()=>setDataMode("snapshot"))},[]);
  const filtered=useMemo(()=>marketData.filter(m=>(venue==="All venues"||m.venue===venue)&&m.symbol.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="volume"?b.volume-a.volume:b.change-a.change),[venue,query,sort,marketData]);
  const toggle=(m:Market)=>{const key=`${m.symbol}-${m.venue}`;setWatchlist(v=>v.includes(key)?v.filter(x=>x!==key):[...v,key])};
  return <main>
    <header className="topbar"><a className="brand" href="#"><span className="brand-mark"><i/><i/><i/></span><span>OPEN PERPS</span><em>TERMINAL</em></a><nav><a className="active" href="#markets">Markets</a><a href="#compare">Compare</a><a href="/wallet">Wallet analyzer</a><a href="#about">About</a></nav><div className="header-actions"><span className={`live ${dataMode}`}><i/> {dataMode==="live"?"Live data":dataMode==="loading"?"Connecting":"Demo snapshot"}</span><a className="github" href="https://github.com/CPredecessor/open-perps-terminal" target="_blank" rel="noreferrer">GitHub ↗</a></div></header>
    <div className="shell">
      <section className="intro"><div><p className="eyebrow">OPEN-SOURCE PERPETUAL DEX INTELLIGENCE</p><h1>One terminal.<br/><span>Every perp market.</span></h1><p className="lede">Compare liquidity, volume, open interest and funding across Hyperliquid and Lighter—without the noise.</p></div><div className="status-card"><div><span>DATA STATUS</span><strong><i/> {dataMode==="live"?"Public APIs connected":dataMode==="loading"?"Connecting to venues":"Fallback snapshot active"}</strong></div><div className="status-row"><span>Hyperliquid <b>{marketData.filter(m=>m.venue==="Hyperliquid").length} loaded</b></span><span>Lighter <b>{marketData.filter(m=>m.venue==="Lighter").length} loaded</b></span></div><small>{dataMode==="live"?"Normalized live response · 15s cache":"Safe fallback · retry on reload"}</small></div></section>
      <section className="metric-grid"><article><span>24H PERP VOLUME</span><strong>$8.42B</strong><small className="positive">↗ 12.4% vs. yesterday</small><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div></article><article><span>OPEN INTEREST</span><strong>$4.16B</strong><small className="positive">↗ 5.8% in 24h</small><div className="metric-line"/></article><article><span>ACTIVE MARKETS</span><strong>386</strong><small>Across 2 open protocols</small><div className="protocol-dots"><i className="hl"/>312 <i className="li"/>74</div></article><article><span>WEIGHTED FUNDING</span><strong>0.0068%</strong><small>8-hour average</small><div className="funding-scale"><i/><b/></div></article></section>
      <section id="compare" className="compare-grid"><VenueCard name="Hyperliquid" subtitle="HyperCore" logo="H" volume="$6.84B" oi="$3.72B" markets="312" share="81.2%"/><VenueCard name="Lighter" subtitle="ZK rollup" logo="L" volume="$1.58B" oi="$440M" markets="74" share="18.8%" lighter/></section>
      <section id="markets" className="markets-panel"><div className="panel-head"><div><p className="section-kicker">MARKET SCREENER</p><h2>Perpetual markets</h2></div><div className="filters"><label><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search market" aria-label="Search market"/></label><select value={venue} onChange={e=>setVenue(e.target.value)}><option>All venues</option><option>Hyperliquid</option><option>Lighter</option></select><button onClick={()=>setSort(sort==="volume"?"change":"volume")}>Sort: {sort==="volume"?"Volume":"24h change"} ↕</button></div></div>
        <div className="table-wrap"><table><thead><tr><th></th><th>MARKET</th><th>VENUE</th><th>PRICE</th><th>24H</th><th>24H VOLUME</th><th>OPEN INTEREST</th><th>FUNDING / 8H</th><th>7D TREND</th></tr></thead><tbody>{filtered.map(m=>{const key=`${m.symbol}-${m.venue}`;return <tr key={key}><td><button className={`star ${watchlist.includes(key)?"saved":""}`} onClick={()=>toggle(m)}>★</button></td><td><div className="asset"><i>{m.symbol[0]}</i><b>{m.symbol}<small>-PERP</small></b></div></td><td><span className={`venue-tag ${m.venue==="Hyperliquid"?"tag-hl":"tag-li"}`}>{m.venue}</span></td><td className="number">{price(m.price)}</td><td className={m.change>=0?"positive":"negative"}>{m.change>=0?"+":""}{m.change.toFixed(2)}%</td><td className="number">{money(m.volume)}</td><td className="number muted">{money(m.oi)}</td><td className={m.funding>=0?"positive-soft":"negative"}>{m.funding.toFixed(4)}%</td><td><Sparkline points={m.spark} positive={m.change>=0}/></td></tr>})}</tbody></table>{!filtered.length&&<div className="empty">No markets match your filters.</div>}</div>
      </section>
      <section id="about" className="open-source"><div><p className="section-kicker">BUILT IN THE OPEN</p><h2>Market data should be<br/>public infrastructure.</h2></div><div><p>Open Perps normalizes public protocol data into one transparent interface. No paywall, no hidden scoring model, no trading custody.</p><div className="source-actions"><a href="https://github.com/CPredecessor/open-perps-terminal" target="_blank" rel="noreferrer">View source ↗</a><span>Apache-2.0</span><span>Community driven</span></div></div></section>
    </div><footer><span>OPEN PERPS TERMINAL · PUBLIC MVP</span><span>Data is informational, not financial advice.</span></footer>
  </main>
}

function VenueCard({name,subtitle,logo,volume,oi,markets,share,lighter=false}:{name:string;subtitle:string;logo:string;volume:string;oi:string;markets:string;share:string;lighter?:boolean}){return <article className={`venue-card ${lighter?"lighter":"hyper"}`}><div className="venue-head"><div><i className="venue-logo">{logo}</i><span><b>{name}</b><small>{subtitle}</small></span></div><span className="online">● ONLINE</span></div><div className="venue-stats"><span>24h volume <b>{volume}</b></span><span>Open interest <b>{oi}</b></span><span>Markets <b>{markets}</b></span><span>Market share <b>{share}</b></span></div><div className="share"><i style={{width:share}}/></div></article>}
