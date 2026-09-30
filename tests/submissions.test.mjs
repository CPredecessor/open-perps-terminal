import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createPreviewServer } from '../scripts/serve.mjs';
import { validateSubmission } from '../scripts/submissions.mjs';

const fields = { kind: 'dex', name: 'Example DEX', website: 'https://example.com/', description: 'An example submission for review.', xHandle: '@example', company: '' };
async function fixture(t, options = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'openpers-form-'));
  let now = Date.parse('2026-09-30T12:00:00Z');
  const server = createPreviewServer({ directory, now: () => now, ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(directory, { recursive: true, force: true }); });
  return { directory, origin, advance: ms => { now += ms; }, token: async () => (await (await fetch(origin + '/api/submission-token')).json()).token,
    post: (body, extra = {}) => fetch(origin + '/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, ...extra }, body: JSON.stringify(body) }) };
}

test('anonymous submissions persist privately and retries do not duplicate records', async t => {
  const f = await fixture(t), token = await f.token(); f.advance(3000);
  const response = await f.post({ ...fields, token }); assert.equal(response.status, 201);
  const receipt = await response.json();
  const entry = JSON.parse(await readFile(join(f.directory, receipt.id + '.json'), 'utf8'));
  assert.equal(entry.status, 'pending'); assert.equal(entry.xHandle, 'example'); assert.equal(entry.website, fields.website);
  assert.equal('token' in entry, false); assert.equal('ip' in entry, false);
  assert.equal((await f.post({ ...fields, token })).status, 201);
  assert.equal((await f.post({ ...fields, token, name: 'Other DEX' })).status, 409);
  assert.equal((await readdir(f.directory)).length, 1);
  for (const path of ['/api/submissions', '/.local/submissions/' + receipt.id + '.json']) {
    assert.ok([404, 405].includes((await fetch(f.origin + path)).status));
  }
});
test('validation, origin, token age and honeypot reject unwanted writes', async t => {
  const f = await fixture(t, { perHour: 20 }), token = await f.token();
  assert.equal((await f.post({ ...fields, token })).status, 400); f.advance(3000);
  assert.equal((await f.post({ ...fields, token }, { Origin: 'https://other.example' })).status, 403);
  assert.equal((await f.post({ ...fields, token: token + 'x' })).status, 400);
  assert.equal((await f.post({ ...fields, token, company: 'bot' })).status, 400);
  assert.equal((await f.post({ ...fields, token, website: 'javascript:alert(1)' })).status, 400);
  assert.equal((await f.post({ ...fields, token, xHandle: 123 })).status, 400);
  assert.equal((await f.post({ ...fields, token, description: 'x'.repeat(13000) })).status, 413);
  f.advance(31 * 60000); assert.equal((await f.post({ ...fields, token })).status, 400);
  assert.deepEqual(await readdir(f.directory), []);
});
test('rate limit returns retry timing and expires without trusting forwarded IP', async t => {
  const f = await fixture(t, { perHour: 1 }), token = await f.token(); f.advance(3000);
  assert.equal((await f.post({ ...fields, token })).status, 201);
  const blocked = await f.post({ ...fields, token }, { 'X-Forwarded-For': '1.2.3.4' });
  assert.equal(blocked.status, 429); assert.equal(blocked.headers.get('retry-after'), '3600');
  f.advance(3600001); const next = await f.token(); f.advance(3000);
  assert.equal((await f.post({ ...fields, token: next })).status, 201);
});
test('invalid URLs and missing required fields never validate', () => {
  for (const website of ['http://example.com', 'https://user:pass@example.com', 'https://localhost']) assert.equal(validateSubmission({ ...fields, website }), null);
  assert.equal(validateSubmission({ ...fields, description: '' }), null);
  assert.equal(validateSubmission({ ...fields, kind: 'publish' }), null);
});
