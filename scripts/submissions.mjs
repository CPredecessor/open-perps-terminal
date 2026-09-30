import { createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const LIMIT = 12000;
const WINDOW = 60 * 60 * 1000;
const TOKEN_LIFE = 30 * 60 * 1000;
const text = (value, min, max) => typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;

export function validateSubmission(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  if (!['dex', 'correction'].includes(input.kind)) return null;
  if (!text(input.name, 2, 100) || !text(input.website, 8, 500) || !text(input.description, 10, 3000)) return null;
  if (input.xHandle !== undefined && (typeof input.xHandle !== 'string' || (input.xHandle && !/^@?[A-Za-z0-9_]{1,15}$/.test(input.xHandle)))) return null;
  if (input.referralUrl !== undefined && (typeof input.referralUrl !== 'string' || input.referralUrl.length > 1000)) return null;
  try {
    const url = new URL(input.website.trim());
    if (url.protocol !== 'https:' || url.username || url.password || !url.hostname.includes('.')) return null;
    let referralUrl = '';
    if (input.referralUrl?.trim()) {
      const referral = new URL(input.referralUrl.trim());
      if (referral.protocol !== 'https:' || referral.username || referral.password || !referral.hostname.includes('.')) return null;
      referralUrl = referral.href;
    }
    return { kind: input.kind, name: input.name.trim(), website: url.href,
      description: input.description.trim(), xHandle: (input.xHandle || '').replace(/^@/, ''), referralUrl };
  } catch { return null; }
}

export function createSubmissionHandler({ directory, origin, now = Date.now, minimumAge = 2000, perHour = 5 } = {}) {
  const storage = directory || resolve(process.env.SUBMISSIONS_DIR || '.local/submissions');
  const expectedOrigin = origin || process.env.PUBLIC_ORIGIN;
  const secret = randomBytes(32);
  const buckets = new Map();
  let globalBucket = { start: now(), count: 0 };
  const sign = value => createHmac('sha256', secret).update(value).digest('base64url');
  const reply = (res, status, body, extra = {}) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff', ...extra }).end(JSON.stringify(body));
  };
  function tokenData(token) {
    if (typeof token !== 'string' || token.length > 300) return null;
    const [id, timestamp, signature, extra] = token.split('.');
    if (extra || !/^[a-f0-9-]{36}$/.test(id || '') || !/^\d{13}$/.test(timestamp || '') || !signature) return null;
    const expected = Buffer.from(sign(id + '.' + timestamp)), actual = Buffer.from(signature);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const age = now() - Number(timestamp);
    return age >= minimumAge && age <= TOKEN_LIFE ? { id } : null;
  }
  function limited(key) {
    const time = now();
    if (time - globalBucket.start >= WINDOW) globalBucket = { start: time, count: 0 };
    for (const [address, bucket] of buckets) if (time - bucket.start >= WINDOW) buckets.delete(address);
    let bucket = buckets.get(key);
    if (!bucket) {
      if (buckets.size >= 10000) return true;
      bucket = { start: time, count: 0 }; buckets.set(key, bucket);
    }
    bucket.count++; globalBucket.count++;
    return bucket.count > perHour || globalBucket.count > 200;
  }
  return async function submissions(req, res, path) {
    if (path !== '/api/submission-token' && path !== '/api/submissions') return false;
    const allowed = path.endsWith('token') ? 'GET' : 'POST';
    if (req.method !== allowed) { reply(res, 405, { error: 'Method not allowed.' }, { Allow: allowed }); return true; }
    if (allowed === 'GET') {
      const payload = randomUUID() + '.' + now();
      reply(res, 200, { token: payload + '.' + sign(payload) }); return true;
    }
    const requestOrigin = expectedOrigin || 'http://' + req.headers.host;
    if (req.headers.origin !== requestOrigin || req.headers['sec-fetch-site'] === 'cross-site') {
      reply(res, 403, { error: 'Please submit from the Openpers website.' }); return true;
    }
    if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) {
      reply(res, 415, { error: 'Unsupported submission format.' }); return true;
    }
    if (limited(req.socket.remoteAddress || 'unknown')) {
      reply(res, 429, { error: 'Too many attempts. Please try again in an hour.' }, { 'Retry-After': '3600' }); return true;
    }
    if (Number(req.headers['content-length']) > LIMIT) {
      req.resume(); reply(res, 413, { error: 'Submission is too large.' }); return true;
    }
    try {
      const chunks = []; let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > LIMIT) { reply(res, 413, { error: 'Submission is too large.' }); return true; }
        chunks.push(chunk);
      }
      let body;
      try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
      catch { reply(res, 400, { error: 'Invalid submission.' }); return true; }
      const data = validateSubmission(body), token = tokenData(body?.token);
      if (!data || !token || body.company) {
        reply(res, 400, { error: 'Check the fields. If the form has been open for a while, close and reopen it before retrying.' }); return true;
      }
      const filename = resolve(storage, token.id + '.json');
      const entry = { id: token.id, receivedAt: new Date(now()).toISOString(), status: 'pending', ...data };
      await mkdir(storage, { recursive: true, mode: 0o700 });
      try { await writeFile(filename, JSON.stringify(entry, null, 2) + '\n', { flag: 'wx', mode: 0o600 }); }
      catch (error) {
        if (error.code !== 'EEXIST') throw error;
        const previous = JSON.parse(await readFile(filename, 'utf8'));
        if (Object.keys(data).some(key => previous[key] !== data[key])) {
          reply(res, 409, { error: 'This form was already submitted. Reopen it for a new submission.' }); return true;
        }
      }
      reply(res, 201, { id: entry.id, message: 'Received for review. Nothing is published automatically.' });
    } catch {
      reply(res, 503, { error: 'We could not save your submission. Please keep your text and try again later.' });
    }
    return true;
  };
}
