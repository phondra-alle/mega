import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

// Render the real .svx page and its imported components; do not hand-copy tables.
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } });
try {
  const { default: Page } = await server.ssrLoadModule(
    '/src/routes/kb/incidents/4471-review/+page.svx',
  );
  const { render } = await server.ssrLoadModule('svelte/server');
  const result = render(Page);
  const assets = await fs.readdir('dist/assets');
  const css = (await Promise.all(assets.filter((name) => name.endsWith('.css'))
    .map((name) => fs.readFile(path.join('dist/assets', name), 'utf8')))).join('\n');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${result.head}<style>${css}</style></head><body>${result.body}</body></html>`;

  for (const expected of ['374', '33', '379', '412', 'DR-S2KB-HMV7', 'R-41236']) {
    assert(html.includes(expected), `Missing rendered evidence: ${expected}`);
  }
  assert(!html.includes('no desk ref:'));
  assert(!html.includes('/Users/'));
  assert(!html.includes('<script'), 'Static export must not depend on JavaScript');
  await fs.mkdir('rendered', { recursive: true });
  await fs.writeFile('rendered/4471-review.html', html);
  await fs.writeFile('dist/4471-review.html', html);
  console.log('Real component render verified: rendered/4471-review.html');
} finally {
  await server.close();
}
