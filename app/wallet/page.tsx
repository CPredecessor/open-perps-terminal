"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    ethereum?: {
      request(args:{method:string;params?:unknown[]}):Promise<unknown>;
      on?(event:string,handler:(...args:any[])=>void):void;
      removeListener?(event:string,handler:(...args:any[])=>void):void;
    };
  }
}

const SAMPLE="0xb83de012dba672c76a7dbbbf3e459cb59d7d6e36";
const usd=(v:number|null=0)=>v===null?"NOT AVAILABLE":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",notation:Math.abs(v)>=1e6?"compact":"standard",maximumFractionDigits:2}).format(v);
const short=(a:string)=>`${a.slice(0,8)}…${a.slice(-6)}`;

export default function WalletPage(){
  const [address,setAddress]=useState(""),[data,setData]=useState<any>(null),[error,setError]=useState(""),[loading,setLoading]=useState(false),[connected,setConnected]=useState(false),[connecting,setConnecting]=useState(false);
  async function run(target:string){setError("");setLoading(true);setData(null);try{const r=await fetch(`/api/wallet?address=${encodeURIComponent(target)}`);const j=await r.json();if(!r.ok)throw new Error(j.error);setData(j)}catch(err){setError(err instanceof Error?err.message:"Analysis failed")}finally{setLoading(false)}}
  async function analyze(e?:FormEvent){e?.preventDefault();await run(address)}
  function useSample(){setAddress(SAMPLE);void run(SAMPLE)}
  async function connectWallet(){setError("");if(!window.ethereum){setError("No injected EVM wallet found. Install MetaMask, Rabby or open this page in a wallet browser.");return}setConnecting(true);try{const result=await window.ethereum.request({method:"eth_requestAccounts"});const account=Array.isArray(result)&&typeof result[0]==="string"?result[0]:"";if(!account)throw new Error("The wallet did not return an account.");setAddress(account);setConnected(true);await run(account)}catch(err){setError(err instanceof Error?err.message:"Wallet connection was cancelled.")}finally{setConnecting(false)}}
  function disconnectWallet(){setConnected(false);setAddress("");setData(null);setError("")}
  useEffect(()=>{const provider=window.ethereum;if(!provider?.on)return;const handleAccounts=(accounts:unknown)=>{const next=Array.isArray(accounts)&&typeof accounts[0]==="string"?accounts[0]:"";if(!next){disconnectWallet();return}setAddress(next);setConnected(true);void run(next)};provider.on("accountsChanged",handleAccounts);return()=>provider.removeListener?.("accountsChanged",handleAccounts)},[]);
  return <main className="wallet-page">
    <header className="topbar"><Link className="brand" href="/"><span className="brand-mark"><i/><i/><i/></span><span>OPEN PERPS</span><em>TERMINAL</em></Link><nav><Link href="/">Markets</Link><Link className="active" href="/wallet">Wallet analyzer</Link><a href="https://github.com/CPredecessor/open-perps-terminal" target="_blank">GitHub ↗</a></nav><div className="header-actions"><span className="read-only"><i/> READ-ONLY</span></div></header>
    <div className="wallet-shell">
      <section className="wallet-intro"><p className="section-kicker">CROSS-DEX WALLET INTELLIGENCE</p><h1>Inspect one address<br/><span>across six venues.</span></h1><p>Connect an EVM wallet to fill its public address, or paste any address manually.</p>
        <div className="wallet-connect-row">{connected?<div className="connected-wallet"><span><i/> {short(address)}</span><button onClick={disconnectWallet}>Forget wallet</button></div>:<button className="connect-wallet" onClick={connectWallet} disabled={connecting}>{connecting?"Connecting…":"Connect EVM wallet"}</button>}<span className="wallet-safety">ADDRESS ONLY · NO SIGNATURE · NO TRANSACTION</span></div>
        <form onSubmit={analyze}><label><span>0x</span><input value={address} onChange={e=>setAddress(e.target.value.trim())} placeholder="Paste a 42-character EVM address" aria-label="Wallet address"/></label><button id="analyze" disabled={loading}>{loading?"Scanning venues…":"Analyze wallet →"}</button></form>
        <div className="quick-test"><span>QUICK TEST</span><button onClick={useSample}>Abraxas public wallet · {short(SAMPLE)}</button></div>{error&&<div className="wallet-error">{error}</div>}
      </section>

      {!data&&!loading&&<section className="source-strip"><Source name="Hyperliquid" detail="HyperCore · public" tone="green"/><Source name="Lighter" detail="Ethereum · USDC" tone="violet"/><Source name="Lighter × Robinhood" detail="Robinhood · USDG" tone="lime"/><Source name="SoDEX" detail="ValueChain · public" tone="green"/><Source name="Arcus Perps" detail="Robinhood · whitelist" tone="violet"/><Source name="Perpl" detail="Monad · read-only key" tone="lime"/></section>}
      {loading&&<section className="scan-state"><div className="scanner"/><p>Querying public account endpoints…</p><span>Hyperliquid · Lighter · Robinhood · SoDEX · Arcus · Perpl</span></section>}
      {data&&<Results data={data}/>} 
      <section className="rh-note"><div><p className="section-kicker">NETWORK MAP</p><h2>Each venue stays on<br/>its native network.</h2></div><div className="rh-facts"><span><b>PERPL</b>Monad · USDC</span><span><b>SODEX</b>ValueChain · vUSDC</span><span><b>ARCUS</b>Robinhood Chain · USDG</span><span><b>LIGHTER × RH</b>Robinhood Chain · USDG</span></div><p className="fine">Perpl is queried only through app.perpl.xyz on Monad. It does not reuse the Robinhood Lighter or Arcus account model.</p></section>
    </div>
  </main>
}

function Source({name,detail,tone}:{name:string;detail:string;tone:string}){return <article className={`source-card ${tone}`}><i/><div><b>{name}</b><span>{detail}</span></div><em>READY</em></article>}
function Results({data}:{data:any}){return <section className="wallet-results"><div className="result-head"><div><p className="section-kicker">ANALYSIS COMPLETE</p><h2>{short(data.address)}</h2></div><span>{new Date(data.generatedAt).toLocaleTimeString()} UTC snapshot</span></div><div className="wallet-metrics"><article><span>COMBINED VALUE</span><b>{usd(data.summary.accountValue)}</b></article><article><span>VERIFIED ALL-TIME VOLUME</span><b>{usd(data.summary.volume)}</b></article><article><span>ALL-TIME PNL</span><b className={data.summary.allTimePnl>=0?"gain":"loss"}>{usd(data.summary.allTimePnl)}</b></article><article><span>UNREALIZED PNL</span><b className={data.summary.unrealizedPnl>=0?"gain":"loss"}>{usd(data.summary.unrealizedPnl)}</b></article></div>
  <div className="venue-results">{data.sources.map((s:any)=><article className="venue-result" key={s.venue}><div className="vr-head"><div><i className={s.venue.includes("Robinhood")?"rh-logo":s.venue==="Hyperliquid"?"hl-logo":"li-logo"}>{s.venue[0]}</i><span><b>{s.venue}</b><small>{s.network}{s.quote?` · ${s.quote}`:""}{s.accountIndexes?.length?` · Account #${s.accountIndexes.join(", #")}`:""}</small></span></div><em className={s.ok?"ok":"bad"}>{s.ok?"● CONNECTED":"● UNAVAILABLE"}</em></div>{s.ok?<><div className="vr-stats"><span>Account value <b>{usd(s.accountValue)}</b></span><span>{s.volumeLabel||"AVAILABLE VOLUME"}<b>{usd(s.volume)}</b></span><span>All-time PnL <b className={s.allTimePnl===null?"muted":s.allTimePnl>=0?"gain":"loss"}>{s.allTimePnl===null?"AUTH REQUIRED":usd(s.allTimePnl)}</b></span><span>Unrealized PnL <b className={s.unrealizedPnl>=0?"gain":"loss"}>{usd(s.unrealizedPnl)}</b></span></div>{s.points&&<div className="points-row"><span>ROBINHOOD POINTS</span><b>{s.points.multiplier}</b><em>Balance private / unavailable</em></div>}<PositionTable positions={s.positions}/><TransactionTable transactions={s.transactions??[]} historyMessage={s.historyMessage}/></>:<div className="source-empty">{s.error||"No public account response"}</div>}</article>)}</div>
  <div className="integrity-note"><b>DATA INTEGRITY</b><p>Every venue is queried independently on its own network. Perpl uses Monad; Arcus and Lighter × Robinhood use Robinhood Chain. Restricted account history is marked unavailable rather than inferred from another venue.</p></div></section>}
function PositionTable({positions}:{positions:any[]}){if(!positions.length)return <div className="source-empty">No open positions found on this venue.</div>;return <div className="position-wrap"><table><thead><tr><th>MARKET</th><th>SIDE</th><th>VALUE</th><th>ENTRY</th><th>PNL</th><th>LIQUIDATION</th></tr></thead><tbody>{positions.map((p,i)=><tr key={`${p.symbol}-${i}`}><td><b>{p.symbol}</b></td><td><span className={p.side==="LONG"?"long":"short"}>{p.side}</span></td><td>{usd(p.value)}</td><td>{usd(p.entry)}</td><td className={p.pnl>=0?"gain":"loss"}>{usd(p.pnl)}</td><td>{p.liquidation?usd(p.liquidation):"—"}</td></tr>)}</tbody></table></div>}
function TransactionTable({transactions,historyMessage}:{transactions:any[];historyMessage?:string}){if(!transactions.length)return <div className="source-empty">{historyMessage||"No public trade history returned for this venue."}</div>;return <div className="tx-block"><div className="tx-title"><b>LAST {transactions.length} TRADES</b><span>Newest first</span></div><div className="position-wrap"><table><thead><tr><th>TIME</th><th>MARKET</th><th>SIDE / TYPE</th><th>PRICE</th><th>SIZE</th><th>VALUE</th><th>REALIZED PNL</th><th>FEE</th></tr></thead><tbody>{transactions.map((t,i)=><tr key={`${t.id}-${i}`}><td>{t.time?new Date(t.time<1e12?t.time*1000:t.time).toLocaleString():"—"}</td><td><b>{t.symbol}</b></td><td>{t.side} · {t.type}</td><td>{usd(t.price)}</td><td>{t.size}</td><td>{usd(t.value)}</td><td className={t.realizedPnl>=0?"gain":"loss"}>{usd(t.realizedPnl)}</td><td>{usd(t.fee)}</td></tr>)}</tbody></table></div></div>}
