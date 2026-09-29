'use strict';
const CHECKED='2026-09-29';
const programs=[
  {
    "id": "perpl-s1",
    "name": "Perpl",
    "mark": "P",
    "season": "Monad · Season One",
    "status": "active",
    "start": "2026-06-10",
    "end": null,
    "weekly": 50000,
    "weeklyLabel": "Announced pool · Wednesdays",
    "total": null,
    "totalLabel": "No verified season total",
    "note": "Season One launched on 10 June 2026. The official rules specify a weekly pool of 50,000 Perpl Points but no season end date. The timeline uses an estimated rolling 20-week target, not an official duration. Individual weekly payouts and the cumulative distributed total have not been collected.",
    "rules": "Points recognize organic trading, referrals and bonus activities; PLP participation is listed as coming soon. Referrer and referee each receive a 5% bonus on the referee's trading points. Activity is captured on Wednesdays and points are credited within 48 hours. Criteria and weights may change. Perpl Points are separate from mPoints.",
    "refs": [
      [
        "Official Season One rules",
        "https://github.com/PerplFoundation/perpl-docs/blob/main/docs/exchange/points.md"
      ],
      [
        "Perpl on Monad",
        "https://docs.perpl.xyz/"
      ]
    ],
    "history": [],
    "checkedAt": "2026-09-29",
    "dateNote": "Start verified · End not announced; projection only"
  },
  {
    "id": "sodex-s2",
    "name": "SoDEX",
    "mark": "S",
    "season": "Season 2 · Layer 1 Season",
    "status": "active",
    "start": "2026-09-01",
    "startAt": "2026-09-01T12:00:00Z",
    "end": "2027-01-19",
    "endAt": "2027-01-19T12:00:00Z",
    "officialWeeks": 20,
    "weekly": 900000,
    "weeklyLabel": "Base pool · Fridays 12:00 UTC",
    "total": null,
    "totalLabel": "Actual total not collected",
    "note": "Officially named Layer 1 Season. Starts 1 September 2026 at 12:00 UTC and lasts 20 weeks. The 19 January 2027, 12:00 UTC end is calculated from that official duration, not a rolling estimate. Weekly actual payouts have not been collected.",
    "rules": "The base weekly pool is 900,000 SoPoints. An additional 2,000,000-point weekly pool is reserved for eligible traders active during August 2026. Snapshots are Tuesdays at 12:00 UTC; distributions are Fridays at 12:00 UTC. Trading, Wealth/SLP holdings and referrals contribute to points. Bonus pools are not included in the base figure.",
    "refs": [
      [
        "Official Layer 1 Season rules",
        "https://sodex.com/documentation/sopoints/layer-1-season"
      ]
    ],
    "history": [],
    "checkedAt": "2026-09-29",
    "dateNote": "Start verified · End calculated from the official 20-week duration"
  },
  {
    "id": "lighter-rh",
    "name": "Lighter",
    "mark": "L",
    "season": "Robinhood Chain",
    "status": "active",
    "start": null,
    "end": null,
    "timelineDate": "2026-08-21",
    "timelineLabel": "First weekly drop",
    "termsDate": "2026-08-10",
    "weekly": 90000,
    "weeklyLabel": "Latest recorded distribution",
    "total": 330000,
    "totalLabel": "4 records · partial total",
    "note": "Four official distribution announcements are recorded here. Their sum is a partial history, not the lifetime program total. The official terms took effect on 10 August 2026. The first weekly drop was 21 August 2026; the timeline measures time since that drop, not the program launch. No end date is announced.",
    "rules": "Robinhood Chain points are tracked separately from the former Lighter Core seasons. Weekly amounts can change.",
    "refs": [
      [
        "Robinhood Chain points: first drop and effective terms",
        "https://docs.lighter.xyz/points-program/lighter-on-robinhood-chain-points"
      ],
      [
        "Official announcements",
        "https://t.me/s/lighter_announcements"
      ]
    ],
    "history": [
      {
        "label": "Post #423",
        "amount": 75000,
        "url": "https://t.me/lighter_announcements/423"
      },
      {
        "label": "Post #429",
        "amount": 80000,
        "url": "https://t.me/lighter_announcements/429"
      },
      {
        "label": "Post #435",
        "amount": 85000,
        "url": "https://t.me/lighter_announcements/435"
      },
      {
        "label": "Post #441",
        "amount": 90000,
        "url": "https://t.me/lighter_announcements/441"
      }
    ],
    "checkedAt": "2026-09-29",
    "dateNote": "First weekly drop verified · Not the program launch date"
  },
  {
    "id": "extended",
    "name": "Extended",
    "mark": "E",
    "season": "Points program",
    "status": "active",
    "start": null,
    "end": null,
    "weekly": 600000,
    "weeklyLabel": "Weekly cap · not a payout",
    "total": 68234519,
    "totalLabel": "Reported as of 22 Sep 2026",
    "note": "The 600,000 figure is a maximum per weekly distribution, not a guaranteed payout. The reported cumulative total is dated 22 September 2026; individual weekly totals have not been collected.",
    "rules": "The program recognizes eligible trading, liquidity, referrals and other contributions. Parameters and allocations may be revised.",
    "refs": [
      [
        "Points program and cumulative total",
        "https://docs.extended.exchange/extended-resources/points-program"
      ]
    ],
    "history": [],
    "checkedAt": "2026-09-29",
    "dateNote": "Current rules checked · Exact start and end not verified",
    "weeklyQualifier": "≤"
  },
  {
    "id": "paradex-s3",
    "name": "Paradex",
    "mark": "P",
    "season": "Season 3 · XP",
    "status": "active",
    "start": "2026-02-01",
    "end": null,
    "weekly": 4000000,
    "weeklyLabel": "Announced pool · Wednesdays",
    "total": null,
    "totalLabel": "No verified season total",
    "note": "Season 3 began on 1 February 2026. The end date is TBD. The base weekly pool is 4 million XP; affiliate bonuses are additional. The pool is not multiplied by elapsed weeks to invent a distributed total.",
    "rules": "XP rewards contributions to the exchange. The documentation says further Season 3 earning mechanics will be published.",
    "refs": [
      [
        "Season dates and XP pools",
        "https://docs.paradex.trade/docs/xp-referrals/xp"
      ]
    ],
    "history": [],
    "checkedAt": "2026-09-29",
    "dateNote": "Start verified · Official end is TBD; projection only"
  },
  {
    "id": "pacifica",
    "name": "Pacifica",
    "mark": "≈",
    "season": "Points program",
    "status": "active",
    "start": null,
    "end": null,
    "weekly": 10000000,
    "weeklyLabel": "Announced weekly pool · Thursdays",
    "total": null,
    "totalLabel": "Not verified",
    "note": "The relocated official rules are now accessible. They state Thursday, 4 September at 00:00 UTC but omit the year. The program is documented as ongoing with a 10 million weekly allocation. The year and exact end remain unverified; no full-date timeline is inferred.",
    "rules": "Snapshots occur Thursdays at 00:00 UTC and points arrive within 24 hours. Only eligible organic activity counts.",
    "refs": [
      [
        "Current official points rules",
        "https://docs.pacifica.fi/programs/points-program"
      ]
    ],
    "history": [],
    "startText": "4 September · year unconfirmed",
    "dateNote": "Official day/month only · Year and end not verified",
    "checkedAt": "2026-09-29"
  },
  {
    "id": "paradex-s2",
    "name": "Paradex",
    "mark": "P",
    "season": "Season 2 · XP",
    "status": "ended",
    "start": "2025-01-03",
    "end": "2026-01-29",
    "weekly": null,
    "weeklyLabel": "Historical pool not recorded",
    "total": 236000000,
    "totalLabel": "Approximate official total",
    "approx": true,
    "note": "The official XP documentation lists Season 2 from 3 January 2025 through 29 January 2026, with approximately 236 million XP distributed. Individual weekly amounts are not in this dataset.",
    "rules": "An archived season. The completion bar represents elapsed program time, not token claims or reward eligibility.",
    "refs": [
      [
        "Previous seasons",
        "https://docs.paradex.trade/docs/xp-referrals/xp"
      ]
    ],
    "history": [],
    "checkedAt": "2026-09-29",
    "dateNote": "Start and end explicitly verified"
  },
  {
    "start": "2025-12-17",
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "variational",
    "name": "Variational",
    "mark": "V",
    "season": "Omni · Points",
    "status": "active",
    "endDeadline": "2026-12-31",
    "weeklyLabel": "Variable pool · Fridays 00:00 UTC",
    "note": "The current documentation sets an end no later than Q4 2026. This supersedes older Q3 references and is a latest-end window, not a confirmed closing day. The 3 million retroactive launch points are not a lifetime total.",
    "rules": "Weekly allocations use eligible platform activity. The launch distribution covered activity through 11 December 2025.",
    "dateNote": "Start verified · Latest end: Q4 2026; exact day unannounced",
    "refs": [
      [
        "Current launch date and end window",
        "https://docs.variational.io/omni/rewards/points"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "ethereal",
    "name": "Ethereal",
    "mark": "E",
    "season": "Trading points",
    "status": "active",
    "weeklyLabel": "Weekly · Fridays",
    "note": "The current rules confirm a trading-points program but do not give exact start or end dates. Pre-deposit epochs and Ethena Exchange Points are separate; their dates are not reused here.",
    "rules": "Eligible trading earns Ethereal Points. Weekly activity snapshots occur on Wednesdays at 23:59 UTC and distributions on Fridays.",
    "dateNote": "Program verified · Exact start and end not verified",
    "refs": [
      [
        "Current rewards and points rules",
        "https://docs.ethereal.trade/points/rewards-and-points"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "bulk-challenger",
    "name": "BULK",
    "mark": "B",
    "season": "Challenger Series · Ranked Aura",
    "status": "active",
    "weeklyLabel": "Ranked Aura · no fixed pool published",
    "note": "The official documentation describes the Challenger Series. Its exact season dates are not specified. Existing AURA balances do not determine league ranking, so earlier AURA campaign dates are not reused.",
    "rules": "Trading earns Ranked Aura. Rankings change weekly through promotion and demotion; Challenger ranks participate in playoffs.",
    "dateNote": "Program verified · Season dates not verified",
    "refs": [
      [
        "Challenger Series rules",
        "https://docs.bulk.trade/bulk-exchange/points"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": null,
    "end": null,
    "weekly": 1000000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "hibachi",
    "name": "Hibachi",
    "mark": "H",
    "season": "Hibachi Points",
    "status": "active",
    "weeklyLabel": "Epoch pool · Mondays 03:00 UTC",
    "note": "The current official page includes the 28 September–5 October 2026 FX bonus window, confirming current activity. Those dates apply only to the bonus, not the full points season. Exact program start and end dates are not supplied.",
    "rules": "Seven-day epochs distribute one million points. Activity and referrals affect allocations; separate postseason vault mechanics should not be treated as the same season.",
    "dateNote": "Current activity verified · Bonus dates are not season dates",
    "refs": [
      [
        "Current points rules and dated FX window",
        "https://docs.hibachi.xyz/hibachi-rewards/hibachi-points"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": "2026-05-21",
    "end": null,
    "weekly": 300000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "nado-s2",
    "name": "Nado",
    "mark": "N",
    "season": "Ink · Season 2",
    "status": "active",
    "weeklyMax": 950000,
    "weeklyLabel": "Volume-linked floor–cap · not actual payout",
    "note": "Season 2 began on 21 May 2026. No exact end date is stated, so the existing rolling projection is used. The weekly pool varies with volume between 300,000 and 950,000 points.",
    "rules": "Season 2 replaced the fixed weekly pool with volume-linked emissions. Existing points and trader history carry forward.",
    "dateNote": "Start verified · End not announced; projection only",
    "refs": [
      [
        "Season 2 official launch and pool",
        "https://docs.nado.xyz/incentives-and-rewards/points/season-2-live"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": "2026-01-30",
    "end": "2026-05-21",
    "weekly": 950000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "nado-s1",
    "name": "Nado",
    "mark": "N",
    "season": "Ink · Season 1",
    "status": "ended",
    "weeklyLabel": "Historical weekly pool · Fridays",
    "note": "Season 1 ended on 21 May; its last payout was on 22 May. The year is established by the Season 2 launch page. The reported 24,941,776 cumulative points also include Private Alpha and Off-Season, so they are not shown as a Season 1-only total.",
    "rules": "Weekly snapshots occurred on Thursdays with distributions on Fridays. Trading, NLP and referrals were eligible.",
    "dateNote": "Dates cross-checked · Final payout: 22 May 2026",
    "refs": [
      [
        "Season 1 start, end and final payout",
        "https://docs.nado.xyz/incentives-and-rewards/points/season-1"
      ],
      [
        "Season 2 launch confirms 2026",
        "https://docs.nado.xyz/incentives-and-rewards/points/season-2-live"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": "2025-03-31",
    "end": null,
    "weekly": 500000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "ostium",
    "name": "Ostium",
    "mark": "O",
    "season": "Points program · across seasons",
    "status": "active",
    "startAt": "2025-03-31T14:00:00Z",
    "weeklyQualifier": "≥",
    "weeklyLabel": "Announced weekly minimum · not actual payout",
    "note": "This timeline begins at the overall points-program launch, not the start of Season 2. The official post was updated to describe Season 2 but does not specify its exact launch or the overall end. Ten million launch points were retroactive, not a current cumulative total.",
    "rules": "Trading, liquidity provision and referrals contribute to weekly points. The launch announcement specifies a minimum weekly allocation, subject to program changes.",
    "dateNote": "Overall launch verified · Season 2 start and program end unknown",
    "refs": [
      [
        "Program launch and Season 2 update",
        "https://www.ostium.com/blog/introducing-the-ostium-points-program"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "start": "2025-11-24",
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "standx-mainnet",
    "name": "StandX",
    "mark": "S",
    "season": "Mainnet points",
    "status": "active",
    "weeklyLabel": "Activity-based · no weekly pool verified",
    "note": "The official launch article body states 24 November 2025 and says Mainnet Holder Points began with that transition. Its publication header says 23 November; the event date in the body is used. No exact closing date is given.",
    "rules": "Holder, trader, maker and referral points have distinct mechanics. Historical launch rates are not assumed to remain current.",
    "dateNote": "Event date from article body · Publication date differs by one day",
    "refs": [
      [
        "Mainnet points launch",
        "https://docs.standx.com/blog/articles/standx-mainnet-now-live-trade-for-real"
      ],
      [
        "Current point categories",
        "https://docs.standx.com/docs/standx-perps-solutions/network-yield"
      ]
    ],
    "checkedAt": "2026-09-29"
  },
  {
    "status": "upcoming",
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "weeklyLabel": "No points rules verified",
    "totalLabel": "No points distributions verified",
    "history": [],
    "checkedAt": "2026-09-29",
    "startText": "Not announced / unverified",
    "dateNote": "Points dates unconfirmed · Exchange launch is not a points launch",
    "id": "arcus-upcoming",
    "name": "Arcus",
    "mark": "A",
    "season": "Robinhood Chain · Beta / waitlist",
    "note": "The official site describes a beta exchange and a cohort-based perps waitlist. No points program announcement was found in the reviewed homepage, blog index or help center. Included under Upcoming for discovery; a future points season is not confirmed.",
    "rules": "Waitlist priority uses prior trading history and referrals. A waitlist rank is not a verified points balance. The site lists 1 July 2026 for Perps Beta; that product date is not used as a points start date.",
    "refs": [
      [
        "Official Arcus site and beta FAQ",
        "https://arcus.xyz/"
      ],
      [
        "Official announcements",
        "https://arcus.xyz/blog"
      ],
      [
        "Official help center",
        "https://help.arcus.xyz/"
      ]
    ],
    "pointsConfirmed": false
  },
  {
    "status": "upcoming",
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "weeklyLabel": "No points rules verified",
    "totalLabel": "No points distributions verified",
    "history": [],
    "checkedAt": "2026-09-29",
    "startText": "Not announced / unverified",
    "dateNote": "Points dates unconfirmed · Exchange launch is not a points launch",
    "id": "noether-upcoming",
    "name": "Noether",
    "mark": "N",
    "season": "Stellar · Testnet",
    "note": "Official documentation describes a Stellar testnet perpetual exchange with mainnet planned but not live. No points program or points calendar was established from the reviewed introduction. Included for discovery while incentive details remain unconfirmed.",
    "rules": "Testnet uses test funds. Testnet participation is not evidence of points eligibility or a future reward. Mainnet timing and any points start or end remain unverified.",
    "refs": [
      [
        "Official introduction and network status",
        "https://docs.noether.exchange/"
      ]
    ],
    "pointsConfirmed": false
  }
];
const DAY=86400000;const parseDate=s=>Date.parse(s+'T00:00:00Z');
const fmtDate=s=>s?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(parseDate(s))):'Not verified';
const num=n=>new Intl.NumberFormat('en-US').format(n);
const compact=n=>new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:2}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function endInfo(p,now=Date.now()){
 if(p.status==='upcoming'&&p.pointsConfirmed===false)return null;
 if(p.end)return{date:p.end,ms:p.endAt?Date.parse(p.endAt):parseDate(p.end)+DAY,estimated:false,weeks:p.officialWeeks};
 if(p.endDeadline)return{date:p.endDeadline,ms:parseDate(p.endDeadline)+DAY,estimated:false,deadline:true};
 const anchor=p.start||p.timelineDate;
 if(!anchor||p.status!=='active')return null;
 if(p.estimatedEnd&&p.estimateSource&&parseDate(p.estimatedEnd)+DAY>now)return{date:p.estimatedEnd,ms:parseDate(p.estimatedEnd)+DAY,estimated:true,basis:p.estimateSource};
 const start=parseDate(anchor),block=140*DAY;
 const blocks=Math.floor(Math.max(0,now-start)/block)+1;
 const ms=start+blocks*block;
 return{date:new Date(ms).toISOString().slice(0,10),ms,estimated:true,weeks:blocks*20};
}
function timeline(p,now=Date.now()){
 if(p.status==='upcoming'&&p.pointsConfirmed===false)return{label:'No points program confirmed',percent:null,end:null};
 const anchor=p.start||p.timelineDate, end=endInfo(p,now);
 if(p.status==='review')return{label:'Dates under review',percent:null,end};
 if(end?.deadline)return{label:now>=end.ms?'Deadline passed · recheck':'Official latest end',percent:null,end};
 if(anchor&&end){const start=p.startAt?Date.parse(p.startAt):parseDate(anchor),elapsed=Math.max(0,now-start),percent=Math.max(0,Math.min(100,elapsed/(end.ms-start)*100));return{label:now<start?'Starts in '+Math.ceil((start-now)/DAY)+' days':now>=end.ms?'Season completed':'Week '+(Math.floor(elapsed/DAY/7)+1),percent,end,remaining:Math.max(0,Math.ceil((end.ms-now)/DAY))};}
 return{label:p.status==='ended'?'Season completed':p.status==='active'?'Start date needed':'Dates under review',percent:null,end};
}
function timelineHTML(p){
 const t=timeline(p),e=t.end;
 if(p.status==='upcoming'&&p.pointsConfirmed===false)return `<div class="timeline-box no-timeline upcoming-box"><div class="timeline-heading"><strong>${esc(t.label)}</strong><span class="time-pill">Upcoming</span></div><div class="timeline-dates"><div><small>Points start</small><strong>Not announced / unverified</strong></div><div><small>Points end</small><strong>Not announced / unverified</strong></div></div><div class="timeline-explainer">Exchange stage: ${esc(p.season)}. No points timeline or reward eligibility is assumed.</div></div>`;
 const dates=`<div class="timeline-dates"><div><small>${p.start?'Started':p.timelineLabel||'Start date'}</small><strong>${startText(p)}</strong></div><div><small>${endLabel(p)}</small><strong>${endText(p)}</strong></div></div><div class="timeline-explainer">${esc(p.dateNote||'')}</div>`;
 if(t.percent!==null){const pc=e.estimated?Math.min(99.9,Math.floor(t.percent*10)/10):Math.round(t.percent);return `<div class="timeline-box ${e.estimated?'projected':''}"><div class="timeline-heading"><strong>${esc(t.label)}${e.weeks?' / '+e.weeks:''}</strong><span class="time-pill">${pc}%${e.estimated?' · Estimated':''}</span></div><div class="track clear-progress" role="progressbar" aria-label="${esc(p.name+' '+p.season+(e.estimated?' estimated timeline progress':' time elapsed'))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><span class="fill" style="width:${t.percent}%"></span></div><div class="projection-caption"><span>${e.estimated?t.remaining+' days to projected end':t.remaining?t.remaining+' days left':'Completed'}</span><span>${e.weeks?e.weeks+(e.estimated?'-week target':' weeks · Official'):''}</span></div>${dates}${e.estimated?`<div class="timeline-explainer">${e.weeks?'Rolling 20-week projection':'Source-based estimate'} · Not official${p.timelineDate?' · Based on first weekly drop':''}</div>`:''}${p.officialWeeks?'<div class="timeline-explainer">Official duration · 12:00 UTC start and end</div>':''}</div>`;}
 return `<div class="timeline-box no-timeline"><div class="timeline-heading"><strong>${esc(t.label)}</strong><span class="time-pill">${e?.deadline?'Latest bound':p.status==='ended'?'Ended':'Pending'}</span></div>${dates}<div class="timeline-explainer">${e?.deadline?'Official latest-end window; not a confirmed closing day.':p.status==='active'?'No exact timeline is drawn without verified dates.':'See program details for source notes.'}</div></div>`;
}
function startText(p){return p.start||p.timelineDate?fmtDate(p.start||p.timelineDate):esc(p.startText||'Not verified');}
function endLabel(p){const e=endInfo(p);return e?.deadline?'Latest possible end':e?.estimated?'Estimated end · Not official':p.endText?'End window':'End date';}
function endText(p){const e=endInfo(p);return e?(e.deadline?'By ':'')+fmtDate(e.date):esc(p.endText||'Not available');}
function weeklyText(p,format=compact){if(p.weekly===null)return 'Not available';if(p.weeklyMax)return format(p.weekly)+'–'+format(p.weeklyMax);return (p.weeklyQualifier?esc(p.weeklyQualifier)+' ':'')+format(p.weekly);}
let filter='all';
const rows=document.getElementById('rows'),search=document.getElementById('search'),sort=document.getElementById('sort'),dialog=document.getElementById('detail');
const statusLabels={active:'Active',review:'Needs review',ended:'Completed',upcoming:'Upcoming'};
function filteredPrograms(){const q=search.value.trim().toLowerCase();const now=Date.now();return programs.filter(p=>{const matches=filter==='all'||p.status===filter||(filter==='ending'&&p.status==='active'&&endInfo(p,now)&&endInfo(p,now).ms>now&&endInfo(p,now).ms-now<=30*DAY);return matches&&`${p.name} ${p.season}`.toLowerCase().includes(q)}).sort((a,b)=>sort.value==='name'?a.name.localeCompare(b.name):sort.value==='start'?(b.start?parseDate(b.start):-Infinity)-(a.start?parseDate(a.start):-Infinity):sort.value==='end'?(endInfo(a,now)?.ms??Infinity)-(endInfo(b,now)?.ms??Infinity):({active:0,upcoming:1,review:2,ended:3}[a.status]-{active:0,upcoming:1,review:2,ended:3}[b.status]));}
function render(){const list=filteredPrograms();document.getElementById('result-count').textContent=list.length;document.getElementById('showing').textContent=`Showing ${list.length} of ${programs.length} entries`;document.getElementById('venue-count').textContent=new Set(programs.map(p=>p.name)).size;document.getElementById('active-count').textContent=programs.filter(p=>p.status==='active').length;rows.innerHTML=list.length?list.map(p=>`<button class="program-row" data-program="${p.id}" aria-label="View ${esc(p.name+' '+p.season)} details"><div class="exchange"><span class="monogram" aria-hidden="true">${p.mark}</span><span><strong>${p.name}</strong><small>${p.season}</small><span class="badge ${p.status}">${statusLabels[p.status]}</span></span></div><div class="timeline">${timelineHTML(p)}</div><div class="weekly"><span class="number ${p.weekly===null?'missing':''}">${weeklyText(p)}</span><span class="sub">${p.weeklyLabel}</span></div><div class="total"><span class="number ${p.total===null?'missing':''}">${p.total===null?'Not available':(p.approx?'≈ ':'')+compact(p.total)}</span><span class="sub">${p.totalLabel}</span></div><span class="chevron" aria-hidden="true">›</span></button>`).join(''):`<div class="empty"><h3>No matching entries.</h3><p>${filter==='ending'?'No active program has an official end, latest-end bound or estimated end within 30 days.':filter==='upcoming'?'No upcoming entry matches this search.':'Try another exchange or change the status filter.'}</p><button id="reset">Show all programs</button></div>`;rows.querySelectorAll('[data-program]').forEach(b=>b.addEventListener('click',()=>openProgram(b.dataset.program)));document.getElementById('reset')?.addEventListener('click',()=>{search.value='';setFilter('all')});}
function setFilter(value){filter=value;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b.dataset.filter===value);b.setAttribute('aria-pressed',String(b.dataset.filter===value))});render();}
function showDialog(){if(!dialog.open)dialog.showModal();}
function openProgram(id){const p=programs.find(x=>x.id===id);if(!p)throw new Error('Unknown program');document.getElementById('dialog-content').innerHTML=`<div class="eyebrow">PROGRAM DETAILS · CHECKED ${fmtDate(CHECKED)}</div><div class="detail-head"><span class="monogram">${p.mark}</span><div><h2 id="dialog-title">${p.name}</h2><p>${p.season} <span class="badge ${p.status}">${statusLabels[p.status]}</span></p></div></div><div class="detail-timeline">${timelineHTML(p)}</div><div class="detail-grid"><div><small>${p.timelineDate?'First weekly drop':'Start date'}</small><strong>${startText(p)}</strong></div><div><small>${endLabel(p)}</small><strong>${endText(p)}</strong></div><div><small>${p.weeklyLabel}</small><strong>${weeklyText(p,num)}</strong></div><div><small>${p.totalLabel}</small><strong>${p.total===null?'Not available':(p.approx?'≈ ':'')+num(p.total)}</strong></div></div><div class="note ${p.status==='review'?'review':''}">${p.note}</div><h3>Program notes</h3><p>${p.rules}</p><h3>Distribution history</h3>${p.history.length?`<p class="history-note">${p.history.length} verified announcements · ${num(p.history.reduce((sum,r)=>sum+r.amount,0))} points recorded. Partial coverage; not the full program total. Exact distribution dates are not verified here, so records use their announcement IDs.</p>${p.history.map(r=>`<div class="history-row"><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.label}</a><div class="track"><span class="fill" style="width:${r.amount/Math.max(...p.history.map(x=>x.amount))*100}%"></span></div><strong>${num(r.amount)}</strong></div>`).join('')}`:'<p>No individual weekly distributions are recorded for this program. An announced weekly pool is not a substitute for actual distribution history.</p>'}<h3>Official sources</h3><ul class="source-list">${p.refs.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join('')}</ul><p class="history-note">Research snapshot: ${fmtDate(CHECKED)}. Program facts do not refresh automatically. Elapsed time is calculated from known dates. Program points are not comparable monetary units.</p>`;showDialog();}
function openMethod(){document.getElementById('dialog-content').innerHTML=`<div class="eyebrow">ABOUT THE DATA</div><h2 id="dialog-title">Clarity over false precision.</h2><p>Openpers is an independent directory of perpetual exchange points programs. This first edition is a curated research snapshot dated ${fmtDate(CHECKED)}.</p><h3>What the labels mean</h3><ul><li><strong>Active:</strong> the reviewed documentation or recent official announcements describe an ongoing program.</li><li><strong>Upcoming:</strong> future programs and early exchanges to follow. Entries labeled No points program confirmed have no verified points launch and do not promise future rewards. Exchange beta and mainnet dates are separate from points dates.</li><li><strong>Needs review:</strong> dates or current status cannot be reconciled, or the live source could not be retrieved.</li><li><strong>Completed:</strong> an official source explicitly records the season end.</li><li><strong>Weekly cap / announced pool:</strong> a program parameter, not a recorded payment.</li><li><strong>Partial total:</strong> the sum of only the distributions collected here.</li></ul><h3>How time is calculated</h3><p>Dates use UTC. Week 1 starts on the listed start date; elapsed weeks are calendar calculations, not official epoch numbers. Progress uses exact UTC times where supplied; date-only official ends include the final day. Progress is capped at 100%. Official exact end dates take priority. Official latest-end windows are shown as bounds without a progress bar; an elapsed bound does not prove completion. Partial dates keep their published precision. Otherwise, a future source-backed estimate is used when recorded. With no such estimate, active programs with a known timeline anchor use the first future 20-week boundary: 20, 40, 60 weeks and so on. At each boundary the target rolls forward by 20 weeks and the percentage falls accordingly. These are planning projections, not exchange announcements. Estimated boundaries occur at 00:00 UTC on the displayed date. Programs without a known start or timeline anchor cannot be projected. Lighter Robinhood Chain uses its first weekly drop as the timeline anchor, separately from the terms effective date.</p><h3>What updates automatically?</h3><p>Elapsed time and rolling projections update while this page is open. Source facts and distributions are curated and do not update automatically. Old sources can remain online after a program changes; ambiguous entries stay under review.</p><h3>Coverage</h3><p>This edition covers ${new Set(programs.map(p=>p.name)).size} exchanges and ${programs.length} entries. Programs known to have ended before 1 January 2026 are excluded. It is not an exhaustive market list. Missing official dates stay unknown; clearly labeled projections may supplement them. Missing payouts remain unavailable. Point totals are never added across exchanges.</p>`;showDialog();}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));search.addEventListener('input',render);sort.addEventListener('change',render);document.getElementById('method-btn').addEventListener('click',openMethod);document.getElementById('footer-method').addEventListener('click',openMethod);document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});render();setInterval(render,60000);
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'filter_points_programs',title:'Filter points programs',description:'Filter the visible Openpers program list by exchange name and program status.',inputSchema:{type:'object',properties:{query:{type:'string'},status:{type:'string',enum:['all','active','upcoming','ending','ended','review']}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['query','status'].includes(k))||(input.query!==undefined&&typeof input.query!=='string')||(input.status!==undefined&&!['all','active','upcoming','ending','ended','review'].includes(input.status)))throw new Error('Invalid filter');search.value=input.query??'';setFilter(input.status??'all');return{count:filteredPrograms().length,programs:filteredPrograms().map(p=>({id:p.id,name:p.name,season:p.season,status:p.status}))}}})).catch(()=>{});}catch{}}
