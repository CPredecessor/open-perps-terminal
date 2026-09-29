import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/openpers/app.js', import.meta.url), 'utf8');
const api = vm.runInNewContext(source.slice(0, source.indexOf("let filter='all'")) + '\n({programs,endInfo,timeline,timelineHTML,startText,endText,weeklyText,usd,venueMetrics,metricCells})');

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
  assert.deepEqual(Array.from(run('upcoming','arcus')), ['Arcus']);
  assert.equal(run('active','arcus').length, 0);
  assert.deepEqual(Array.from(run('upcoming','noether')), ['Noether']);
  assert.equal(run('all','hyperliquid').length, 0);
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
