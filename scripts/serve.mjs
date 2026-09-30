import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createSubmissionHandler } from './submissions.mjs';

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']],
  ['/submission-form.js', ['submission-form.js', 'text/javascript; charset=utf-8']],
]);
const source = new URL('../public/openpers/', import.meta.url);

export function createPreviewServer(options = {}) {
  const submissions = createSubmissionHandler(options);
  return createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (await submissions(request, response, pathname)) return;
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    if (['/openpers', '/openpers/', '/openpers/index.html'].includes(pathname)) {
      response.writeHead(302, { Location: '/' }).end();
      return;
    }
    const asset = assets.get(pathname);
    if (!asset) {
      response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    try {
      const body = await readFile(new URL(asset[0], source));
      response.writeHead(200, {
        'Content-Type': asset[1],
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      }).end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(500, { 'Content-Type': 'text/plain' }).end('Unable to load page');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 5173);
  const server = createPreviewServer();
  server.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
  const host = process.env.HOST || '127.0.0.1';
  server.listen(port, host, () => console.log('Openpers: http://' + host + ':' + port + '/'));
}
