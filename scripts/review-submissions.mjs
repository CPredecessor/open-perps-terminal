import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Run on the server or against a private copy of its persistent submission directory.
// JSON output keeps untrusted input escaped; never execute submitted content or URLs.
const directory = resolve(process.env.SUBMISSIONS_DIR || '.local/submissions');
try {
  const files = (await readdir(directory)).filter(name => /^[a-f0-9-]{36}\.json$/.test(name)).sort();
  for (const file of files) console.log(JSON.stringify(JSON.parse(await readFile(resolve(directory, file), 'utf8'))));
  console.error(files.length + ' private submissions. Review sources before editing the public dataset.');
} catch (error) {
  if (error.code === 'ENOENT') console.error('No submissions yet.');
  else { console.error('Unable to read submissions.'); process.exitCode = 1; }
}
