import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/openpers/app.js', import.meta.url), 'utf8');
const api = vm.runInNewContext(source.slice(0, source.indexOf("let filter='all'")) + '\n({programs,endInfo,timeline,timelineHTML,startText,endText,weeklyText,usd,venueMetrics,metricCells,totalInfo,traderCell,traderMetrics})');

test('estimated totals preserve official totals, whole weeks, ranges and season boundaries', () => {
  const p={status:'active',start:'2026-09-01',weekly:100,total:null};
  const now=Date.parse('2026-09-29T00:00:00Z');
  assert.equal(api.totalInfo(p,now).text,'≈ 400');
  assert.equal(api.totalInfo(p,Date.parse('2026-09-07')).weeks,0);
  assert.equal(api.totalInfo({...p,weeklyMax:200},now).text,'≈ 400–800');
  assert.equal(api.totalInfo({...p,weeklyQualifier:'≤'},now).text,'≈ ≤ 400');
  assert.equal(api.totalInfo({...p,total:350,totalLabel:'Official total'},now).text,'350');
  assert.equal(api.totalInfo({...p,total:150,totalLabel:'Partial history'},now).estimated,true);
  assert.equal(api.totalInfo({...p,status:'ended',end:'2026-09-14'},now).text,'≈ 200');
  assert.equal(api.totalInfo({...p,start:null},now).text,'Not available');
  assert.equal(api.totalInfo({...p,weekly:null},now).text,'Not available');
});

test('latest-end bounds never imply an exact completion or progress percentage', () => {
  const p = {status:'active', start:'2025-12-17', endDeadline:'2026-12-31'};
  const before = api.timeline(p, Date.parse('2026-09-29T00:00:00Z'));
  const after = api.timeline(p, Date.parse('2027-01-02T00:00:00Z'));
  assert.equal(before.percent, 50);
  assert.equal(after.percent, 50);
  assert.equal(before.placeholder, true);
  assert.equal(after.label, 'End window passed · recheck');
  assert.equal(api.endInfo(p), null);
  assert.equal(api.endText(p), 'End date unknown');
  assert.doesNotMatch(api.timelineHTML(p), /role="progressbar"|aria-valuenow/);
});

test('partial dates remain partial and cannot create invented timelines', () => {
  const p = {status:'active', startText:'4 September · year unconfirmed'};
  assert.equal(api.endInfo(p), null);
  assert.equal(api.timeline(p).percent, 50);
  assert.equal(api.startText(p), p.startText);
  const ended = {status:'ended', start:'2024-05-29', endText:'November 2024 · day unspecified'};
  assert.equal(api.endInfo(ended), null);
  assert.equal(api.endText(ended), ended.endText);
});

test('unknown ends never roll forward while official durations retain actual progress', () => {
  const unknown={status:'active',start:'2025-01-01'};
  for(const date of ['2026-09-29','2028-01-01']){
    const t=api.timeline(unknown,Date.parse(date));
    assert.equal(t.percent,50);
    assert.equal(t.end,null);
    assert.equal(t.placeholder,true);
  }
  const official={status:'active',start:'2026-09-01',startAt:'2026-09-01T12:00:00Z',end:'2027-01-19',endAt:'2027-01-19T12:00:00Z'};
  assert.equal(api.timeline(official,Date.parse('2026-11-10T12:00:00Z')).percent,50);
  assert.equal(api.timeline(official,Date.parse('2027-01-20')).percent,100);
  assert.match(api.timelineHTML(official),/role="progressbar"/);
});

test('missing metrics are distinct from zero and venue scopes remain separate', () => {
  assert.equal(api.usd(null),'Not available');
  assert.equal(api.usd(undefined),'Not available');
  assert.equal(api.usd(0),'$0');
  assert.equal(api.venueMetrics.Lighter.slug,'lighter-robinhood-perps');
  assert.equal(api.venueMetrics.Paradex.slug,'paradex-perps');
  assert.equal(api.venueMetrics.Pacifica.funding,null);
  assert.match(api.metricCells({name:'Pacifica'}),/Self-funded/);
  assert.equal(api.programs.find(p=>p.name==='Ethereal').status,'review');
});

test('elapsed weeks use UTC anchors without estimating an end', () => {
  const p={status:'active',start:'2026-06-10',startAt:'2026-06-10T12:00:00Z'};
  assert.equal(api.timeline(p,Date.parse('2026-06-10T11:59:59Z')).weekLabel,'Not started');
  assert.equal(api.timeline(p,Date.parse('2026-06-17T11:59:59Z')).weekLabel,'Week 1');
  assert.equal(api.timeline(p,Date.parse('2026-06-17T12:00:00Z')).weekLabel,'Week 2');
  const now=Date.parse('2026-09-29T12:00:00Z');
  assert.equal(api.timeline(p,now).weekLabel,'Week 16');
  assert.equal(api.timeline({status:'active',timelineDate:'2026-08-21'},now).weekLabel,'Week 6 since first drop');
  assert.equal(api.timeline({status:'active',timelineDate:'2025-03-03',weekSuffix:'since reported launch'},now).weekLabel,'Week 83 since reported launch');
  assert.equal(api.timeline({status:'upcoming',pointsConfirmed:true,timelineDate:'2026-09-26'},now).weekLabel,null);
  assert.equal(api.timeline({status:'active'},now).weekLabel,null);
  assert.equal(api.timeline({...p,status:'review'},now).weekLabel,null);
  assert.equal(api.timeline(p,now).percent,50);
  assert.equal(api.timeline(p,now).end,null);
});

test('weekly ranges and limits keep their meaning', () => {
  assert.equal(api.weeklyText({weekly:300000,weeklyMax:950000}), '300K–950K');
  assert.equal(api.weeklyText({weekly:600000,weeklyQualifier:'≤'}), '≤ 600K');
  assert.equal(api.weeklyText({weekly:null}), 'Not available');
});

test('unconfirmed upcoming entries never project a points season from product dates', () => {
  const p = {status:'upcoming',pointsConfirmed:false,start:'2026-07-01',end:'2026-12-31',season:'Beta'};
  assert.equal(api.endInfo(p), null);
  assert.equal(api.timeline(p).percent, null);
  const html = api.timelineHTML(p);
  assert.match(html, /No points program confirmed/);
  assert.doesNotMatch(html, /progressbar|Estimated|2026/);
});

test('upcoming entries are searchable and excluded from active programs', () => {
  const prefix = source.slice(0, source.indexOf('function render()'));
  const run = (status, query) => vm.runInNewContext(prefix + `\nfilter=${JSON.stringify(status)}; filteredPrograms().map(p=>p.name);`, {
    document:{getElementById:id=>({value:id==='search'?query:'status'})}
  });
  assert.deepEqual(Array.from(run('active','arcus')), ['Arcus']);
  assert.equal(run('upcoming','arcus').length, 0);
  assert.deepEqual(Array.from(run('active','monad')), ['Perpl']);
  assert.deepEqual(Array.from(run('upcoming','stellar')), ['Noether']);
  assert.deepEqual(Array.from(run('active','robinhood chain')), ['Lighter', 'Arcus']);
  assert.deepEqual(Array.from(run('upcoming','noether')), ['Noether']);
  assert.equal(api.programs.some(p=>p.name==='Hyperliquid'), false);
  assert.deepEqual(Array.from(run('no-points','hyperliquid')), ['tradeXYZ']);
  assert.equal(run('ended','lighter').length, 0);
  assert.ok(run('ended','nado').length);
});

test('all records have unique IDs, sources and render without invalid numbers', () => {
  assert.equal(new Set(api.programs.map(p => p.id)).size, api.programs.length);
  for (const p of api.programs) {
    assert.ok(p.refs.length, p.id);
    assert.doesNotMatch(api.timelineHTML(p), /NaN|undefined|Invalid Date/, p.id);
    if (p.start && p.end) assert.ok(p.start <= p.end, p.id);
  }
});

test('trader metrics preserve period, rounding, scope and missing values',()=>{
 assert.match(api.traderCell({name:'Nado'}),/≈ 1,250/);
 assert.match(api.traderCell({name:'Nado'}),/24h · reported/);
 assert.match(api.traderCell({name:'Ostium'}),/Daily · 29 Sep 2026/);
 assert.match(api.traderCell({name:'Variational'}),/Not available/);
 assert.match(api.traderCell({name:'Arcus'}),/Not available/);
 assert.doesNotMatch(api.traderCell({name:'Ostium'}),/\$/);
 api.traderMetrics.Test={value:0,period:'Daily',scope:'Test',checkedAt:'2026-09-30'};
 assert.match(api.traderCell({name:'Test'}),/>0</);
});

test('live venues and token rewards never imply points timelines or totals',()=>{
 for(const name of ['GMX','tradeXYZ']){
 const p=api.programs.find(p=>p.name===name);
 assert.equal(api.timeline(p).percent,null);
 assert.equal(api.totalInfo({...p,weekly:500,start:'2026-01-01'}).estimated,false);
 assert.equal(api.weeklyText(p),'Not applicable');
 assert.doesNotMatch(api.timelineHTML(p),/class="fill"|role="progressbar"/);
 }
 assert.equal(api.programs.filter(p=>p.name==='Aster').length,1);
 assert.equal(api.programs.find(p=>p.name==='Ventuals').weekly,500000);
});

test('Arcus launch uses Season 1 date, leaves unknown pool and end blank',()=>{const p=api.programs.find(p=>p.name==='Arcus');assert.equal(p.start,'2026-10-01');assert.equal(p.status,'active');assert.equal(p.weekly,null);assert.equal(p.end,null);assert.equal(api.timeline(p,Date.parse('2026-10-02')).percent,50);assert.match(api.metricCells(p),/2 Oct 2026/);});
