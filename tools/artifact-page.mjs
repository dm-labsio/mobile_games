// Turns a game's full index.html into the fragment the claude.ai Artifact publisher expects:
// the publisher wraps the file in its own <html>/<head>/<body>, so we keep only the head
// extras (title, styles, font links) and the body's contents.
//
//   node tools/artifact-page.mjs games/voxel-pop/index.html out/voxel-pop.html
import fs from 'node:fs';
import path from 'node:path';

const [src, dest] = process.argv.slice(2);
if (!src || !dest) { console.error('usage: node tools/artifact-page.mjs <index.html> <out.html>'); process.exit(1); }

const html = fs.readFileSync(src, 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const headKeep = head
  .replace(/<meta\s+charset=[^>]*>\s*/i, '')
  .replace(/<meta\s+name="viewport"[^>]*>\s*/i, '')
  .trim();

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, `${headKeep}\n${body.trim()}\n`);
console.log(`wrote ${dest} (${fs.statSync(dest).size} bytes)`);
