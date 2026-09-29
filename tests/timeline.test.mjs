import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/openpers/app.js', import.meta.url), 'utf8');
const api = vm.runInNewContext(source.slice(0, source.indexOf("let filter='all'")) + '\n({programs,endInfo,timeline,timelineHTML,startText,endText,weeklyText})');

test('latest-end bounds never imply an exact completion or progress percentage', () => {
  const p = {status:'active', start:'2025-12-17', endDeadline:'2026-12-31'};
  const before = api.timeline(p, Date.parse('2026-09-29T00:00:00Z'));
  const after = api.timeline(p, Date.parse('2027-01-02T00:00:00Z'));
  assert.equal(before.percent, null);
  assert.equal(after.percent, null);
  assert.equal(after.label, 'Deadline passed · recheck');
  assert.equal(api.endInfo(p).estimated, false);
  assert.match(api.endText(p), /^By /);
});

test('partial dates remain partial and cannot create invented timelines', () => {
  const p = {status:'active', startText:'4 September · year unconfirmed'};
  assert.equal(api.endInfo(p), null);
  assert.equal(api.timeline(p).percent, null);
  assert.equal(api.startText(p), p.startText);
  const ended = {status:'ended', start:'2024-05-29', endText:'November 2024 · day unspecified'};
  assert.equal(api.endInfo(ended), null);
  assert.equal(api.endText(ended), ended.endText);
});

test('weekly ranges and limits keep their meaning', () => {
  assert.equal(api.weeklyText({weekly:300000,weeklyMax:950000}), '300K–950K');
  assert.equal(api.weeklyText({weekly:600000,weeklyQualifier:'≤'}), '≤ 600K');
  assert.equal(api.weeklyText({weekly:null}), 'Not available');
});

test('all records have unique IDs, sources and render without invalid numbers', () => {
  assert.equal(new Set(api.programs.map(p => p.id)).size, api.programs.length);
  for (const p of api.programs) {
    assert.ok(p.refs.length, p.id);
    assert.doesNotMatch(api.timelineHTML(p), /NaN|undefined|Invalid Date/, p.id);
    if (p.start && p.end) assert.ok(p.start <= p.end, p.id);
  }
});
