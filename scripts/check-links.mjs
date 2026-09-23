import { readdir, readFile, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const root = resolve('dist');
const pages = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (entry.name.endsWith('.html')) pages.push(p);
  }
}
await walk(root);

async function exists(p) { try { return (await stat(p)).isFile(); } catch { return false; } }
async function resolvable(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true;
  const candidates = [
    join(root, clean),
    join(root, clean, 'index.html'),
    join(root, clean + '.html'),
  ];
  for (const c of candidates) if (await exists(c)) return true;
  return false;
}

let broken = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue;
    const target = href.startsWith('/') ? href : join(dirname(page).replace(root, ''), href);
    if (!(await resolvable(target))) {
      broken++;
      console.error(`${page.replace(root, '')}: broken link ${href}`);
    }
  }
}
if (broken) { console.error(`${broken} broken internal link(s)`); process.exit(1); }
console.log(`checked ${pages.length} pages, no broken internal links`);
