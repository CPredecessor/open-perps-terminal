import assert from 'node:assert/strict';
import test from 'node:test';
import { createPreviewServer } from '../scripts/serve.mjs';

test('serves Points explorer at root and retires terminal routes', async () => {
  const server = createPreviewServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  try {
    const page = await fetch(base);
    assert.equal(page.status, 200);
    const html = await page.text();
    assert.match(html, /Points explorer/);
    assert.doesNotMatch(html, /Longs versus shorts/);
    for (const path of ['/app.js', '/style.css']) {
      const asset = await fetch(base + path);
      assert.equal(asset.status, 200);
      assert.ok((await asset.text()).length > 0);
    }
    const legacy = await fetch(base + '/openpers/index.html', { redirect: 'manual' });
    assert.equal(legacy.status, 302);
    assert.equal(legacy.headers.get('location'), '/');
    for (const path of ['/wallet', '/api/markets', '/api/positioning', '/api/wallet', '/package.json', '/.env']) {
      assert.equal((await fetch(base + path)).status, 404);
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
