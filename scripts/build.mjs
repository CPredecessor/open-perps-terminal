import { copyFile, mkdir } from 'node:fs/promises';

const destination = new URL('../dist/', import.meta.url);
await mkdir(destination, { recursive: true });
for (const name of ['index.html', 'style.css', 'app.js', 'submission-form.js']) {
  await copyFile(new URL('../public/openpers/' + name, import.meta.url), new URL(name, destination));
}
console.log('Openpers static site built in dist/');
