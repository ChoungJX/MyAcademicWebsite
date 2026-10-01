// Draws the share cards: the preview image a chat app or social site shows for a link to the site.
// Writes public/static/images/og-{en,zh,ja}.png, 1200x630. Apps that show a square thumbnail crop
// its middle, so the icon, the name and the labels stay inside x 285-915.
// Renders with the local Chrome; set CHROME to its path if it is somewhere else.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// The site's own fonts (scripts/fonts.mjs).
const FONTS = new URL('../public/fonts/fonts.css', import.meta.url).href;

// role is the home page's role chip (src/data/*.ts).
const CARDS = {
  en: {
    role: 'PHD STUDENT · SCIENCE TOKYO',
    topics: ['BRANCH PREDICTION', 'INTERPRETER'],
    labelFont: "'Zen Kaku Gothic New', sans-serif",
    chipFont: "'DotGothic16', monospace",
  },
  zh: {
    role: '博士生 · 东京科学大学',
    topics: ['分支预测', '解释器'],
    labelFont: "'Noto Sans SC', sans-serif",
    chipFont: "'Noto Sans SC', sans-serif",
  },
  ja: {
    role: '博士課程 · 東京科学大学',
    topics: ['分岐予測', 'インタプリタ'],
    labelFont: "'Zen Kaku Gothic New', sans-serif",
    chipFont: "'DotGothic16', monospace",
  },
};

// Pencil doodles in the margins: UFO, light bulb, sparkle, spiral, open book, and an if/T/N branch.
const DOODLES = `
<g transform="translate(40 60) rotate(-8 55 36)"><path d="M32 36q23-32 46 0"/><path d="M8 40q47-24 94 0q-47 24-94 0z"/><path d="M30 58l-8 12M80 58l8 12M55 60v12"/></g>
<g transform="translate(170 236) scale(0.8) rotate(-6 35 50)"><path d="M35 6a26 26 0 0 1 16 46q-6 5-6 14H25q0-9-6-14A26 26 0 0 1 35 6z"/><path d="M25 76h20M27 84h16M31 92h8M30 40l5 8l5-8"/></g>
<g transform="translate(1000 120) scale(0.8)"><path d="M20 2q2 16 18 18q-16 2-18 18q-2-16-18-18q16-2 18-18z"/></g>
<g transform="translate(980 270) scale(0.7)"><path d="M26 30a4 4 0 1 1 8 0a8 8 0 1 1-16 0a12 12 0 1 1 24 0a16 16 0 1 1-32 0a20 20 0 1 1 40 0"/></g>
<g transform="translate(950 430) rotate(6 60 42)"><path d="M60 18Q36 6 8 12v60q28-6 52 6q24-12 52-6V12Q84 6 60 18zM60 18v60"/><path d="M18 26q16-3 32 3M18 38q16-3 32 3M70 29q16-6 32-3M70 41q16-6 32-3"/></g>
<g transform="translate(40 400) scale(0.85) rotate(-3 85 75)"><path d="M85 12L132 50L85 88L38 50Z"/><path d="M38 50Q18 72 16 118M7 106l9 13l9-12"/><path d="M132 50Q152 72 154 118M145 107l9 12l9-13"/></g>`;
const BRANCH_LABELS = `
<g transform="translate(40 400) scale(0.85) rotate(-3 85 75)" font-family="Chalkboard SE, Comic Sans MS, Marker Felt, cursive" text-anchor="middle" fill="#aaa79a" stroke="none">
<text x="85" y="57" font-size="20">if</text><text x="16" y="142" font-size="18">T</text><text x="154" y="142" font-size="18">N</text></g>`;

const icon = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8').replace(
  '<svg ',
  '<svg class="icon" width="112" height="112" aria-hidden="true" ',
);

const page = (c) => `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${FONTS}">
<style>
body { margin: 0; }
.card { position: relative; width: 1200px; height: 630px; overflow: hidden; background: #dcdad0; color: #1b1b1f; }
.card > * { position: absolute; margin: 0; }
.icon { left: 306px; top: 150px; }
.name { left: 438px; top: 158px; font: 400 96px/1 'Reenie Beanie', cursive; white-space: nowrap; }
.role { left: 306px; top: 300px; padding: 3px 12px 6px; background: #0b0b0f; color: #fff; font: 900 30px/1.1 ${c.labelFont}; letter-spacing: 0.04em; }
.topics { left: 306px; top: 364px; display: flex; gap: 12px; font: 22px/1 ${c.chipFont}; letter-spacing: 0.06em; }
.topics span { padding: 6px 12px; background: #5b47d6; color: #fff; }
.rule { left: 306px; top: 440px; width: 588px; height: 1px; background: #6b6a62; }
.domain { left: 306px; top: 458px; font: 20px/1 'DotGothic16', monospace; letter-spacing: 0.06em; color: #4a4a44; }
.tab { right: 0; top: 190px; width: 48px; height: 250px; display: flex; align-items: center; justify-content: center; background: #5b47d6; color: #fff; font: 20px/1 'DotGothic16', monospace; letter-spacing: 0.3em; writing-mode: vertical-rl; }
</style>
</head>
<body>
<div class="card">
<svg width="1200" height="630" viewBox="0 0 1200 630" aria-hidden="true" style="left: 0; top: 0">
<defs>
<filter id="rough" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="rough2" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" seed="18"/><feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="G" yChannelSelector="R"/></filter>
</defs>
<g fill="none" stroke="#aaa79a" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
<g filter="url(#rough)">${DOODLES}${BRANCH_LABELS}</g>
<g filter="url(#rough2)" opacity="0.45" transform="translate(1.2 0.9)">${DOODLES}</g>
</g>
</svg>
${icon}
<p class="name">Linfeng Zheng</p>
<p class="role">${c.role}</p>
<div class="topics">${c.topics.map((t) => `<span>${t}</span>`).join('')}</div>
<div class="rule"></div>
<p class="domain">me.rabbitravel.xyz</p>
<div class="tab">HOME</div>
</div>
</body>
</html>
`;

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}. Set CHROME to its path.`);
  process.exit(1);
}

// Chrome's --screenshot flag leaves Chrome running on macOS, so drive it over the DevTools protocol:
// requests, replies and events are NUL-separated JSON on file descriptors 3 (in) and 4 (out).
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
const chrome = spawn(
  CHROME,
  ['--headless', `--user-data-dir=${join(tmp, 'profile')}`, '--no-first-run', '--remote-debugging-pipe'],
  { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] },
);
const timeout = setTimeout(() => chrome.kill(), 60_000);
const [, , , toChrome, fromChrome] = chrome.stdio;
let nextId = 0;
const pending = new Map();
const listeners = [];
let buffer = '';
fromChrome.setEncoding('utf8');
fromChrome.on('data', (chunk) => {
  buffer += chunk;
  let end;
  while ((end = buffer.indexOf('\0')) >= 0) {
    const message = JSON.parse(buffer.slice(0, end));
    buffer = buffer.slice(end + 1);
    const call = pending.get(message.id);
    if (call) {
      pending.delete(message.id);
      if (message.error) call.reject(new Error(message.error.message));
      else call.resolve(message.result);
    }
    for (const l of listeners) if (l.method === message.method) l.resolve(message.params);
  }
});
const exited = new Promise((resolve) => chrome.on('exit', resolve));
exited.then(() => {
  for (const waiter of [...pending.values(), ...listeners]) waiter.reject(new Error('Chrome exited'));
});

function send(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    toChrome.write(JSON.stringify({ id, method, params, sessionId }) + '\0');
  });
}

/** Resolves on the next event called `method`. */
function next(method) {
  return new Promise((resolve, reject) => {
    const l = { method, reject, resolve: (params) => (listeners.splice(listeners.indexOf(l), 1), resolve(params)) };
    listeners.push(l);
  });
}

try {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  const size = { width: 1200, height: 630 };
  await send('Emulation.setDeviceMetricsOverride', { ...size, deviceScaleFactor: 1, mobile: false }, sessionId);
  for (const [lang, card] of Object.entries(CARDS)) {
    const html = join(tmp, `${lang}.html`);
    writeFileSync(html, page(card));
    const loaded = next('Page.loadEventFired');
    await send('Page.navigate', { url: pathToFileURL(html).href }, sessionId);
    await loaded;
    // Lay the page out so it asks for every font it uses, then wait for them.
    const expression = 'document.body.offsetHeight, document.fonts.ready.then(() => true)';
    await send('Runtime.evaluate', { expression, awaitPromise: true }, sessionId);
    const clip = { x: 0, y: 0, ...size, scale: 1 };
    const { data } = await send('Page.captureScreenshot', { format: 'png', clip }, sessionId);
    writeFileSync(new URL(`../public/static/images/og-${lang}.png`, import.meta.url), Buffer.from(data, 'base64'));
    console.log(`wrote public/static/images/og-${lang}.png`);
  }
} finally {
  chrome.kill();
  await exited;
  clearTimeout(timeout);
  rmSync(tmp, { recursive: true, force: true });
}
