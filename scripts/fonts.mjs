// Copies the site's web fonts from Google Fonts into public/fonts/, with the fonts.css that the
// pages link, so no page loads anything from another server (Google Fonts is blocked in mainland
// China) and the build needs no network. Run `yarn fonts` after changing FAMILIES.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';

const OUT = new URL('../public/fonts/', import.meta.url);
// Google Fonts' css2 families and weights.
const FAMILIES = [
  'DotGothic16',
  'Reenie Beanie',
  'Zen Kaku Gothic New:wght@500;700;900',
  'Noto Sans SC:wght@500;700;900',
];
// Google picks the format by the browser, so ask as Chrome to get WOFF2.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

async function get(url, as) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return as === 'text' ? res.text() : Buffer.from(await res.arrayBuffer());
}

const query = FAMILIES.map((f) => `family=${f.replaceAll(' ', '+')}`).join('&');
const css = await get(`https://fonts.googleapis.com/css2?${query}&display=swap`, 'text');

// Google splits each font into slices by unicode-range, and the browser only downloads the slices
// a page uses. Google's CSS names the Latin, Cyrillic and Vietnamese slices in a comment; the CJK
// ones are numbered in their URLs.
const files = new Map();
for (const [, comment, body] of css.matchAll(/(?:\/\*\s*(.+?)\s*\*\/\s*)?@font-face\s*\{([^}]*)\}/g)) {
  const face = Object.fromEntries(
    body
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => [d.slice(0, d.indexOf(':')).trim(), d.slice(d.indexOf(':') + 1).trim()]),
  );
  const url = face.src.match(/url\((.+?)\)/)[1];
  // Noto Sans SC is a variable font: its three weights share each file, so they become one face
  // with a weight range.
  const file = files.get(url);
  if (file) {
    file.weights.push(face['font-weight']);
    continue;
  }
  const family = face['font-family'].replaceAll("'", '');
  const slice = url.match(/\.(\d+)\.woff2$/)?.[1] ?? comment;
  if (!slice) throw new Error(`no slice name for ${url}`);
  files.set(url, { face, family, slice, weights: [face['font-weight']] });
}

const slug = (family) => family.toLowerCase().replaceAll(' ', '-');
const weight = (f) => (f.weights.length > 1 ? `${f.weights[0]} ${f.weights.at(-1)}` : f.weights[0]);
const families = [...new Set([...files.values()].map((f) => f.family))];
// Files are <family>/<slice>.woff2, with the weight in front when the family has several.
for (const family of families) {
  const own = [...files.values()].filter((f) => f.family === family);
  const weighted = new Set(own.map(weight)).size > 1;
  for (const f of own) f.path = `${slug(family)}/${weighted ? `${f.weights[0]}-` : ''}${f.slice}.woff2`;
}

// Download everything first, so a failed request leaves public/fonts/ as it was.
const queue = [...files.entries()];
await Promise.all(
  Array.from({ length: 16 }, async () => {
    for (let item; (item = queue.shift()); ) item[1].data = await get(item[0]);
  }),
);
// Each family is under the SIL Open Font License, which has to travel with the fonts.
const ofl = (family) => family.toLowerCase().replaceAll(' ', '');
const licenses = await Promise.all(
  families.map((family) => get(`https://raw.githubusercontent.com/google/fonts/main/ofl/${ofl(family)}/OFL.txt`)),
);

rmSync(OUT, { recursive: true, force: true });
families.forEach((family, i) => {
  mkdirSync(new URL(`${slug(family)}/`, OUT), { recursive: true });
  writeFileSync(new URL(`${slug(family)}/OFL.txt`, OUT), licenses[i]);
});
const faces = [];
for (const f of files.values()) {
  writeFileSync(new URL(f.path, OUT), f.data);
  const { face } = f;
  faces.push(
    `@font-face{font-family:${face['font-family']};font-style:${face['font-style']};` +
      `font-weight:${weight(f)};font-display:${face['font-display']};` +
      `src:url(${f.path}) format('woff2');unicode-range:${face['unicode-range'].replaceAll(', ', ',')}}`,
  );
}
const header = "/* Written by scripts/fonts.mjs from Google Fonts. Each family's license is OFL.txt in its folder. */";
writeFileSync(new URL('fonts.css', OUT), `${header}\n${faces.join('\n')}\n`);
const mb = ([...files.values()].reduce((sum, f) => sum + f.data.length, 0) / 1e6).toFixed(1);
console.log(`wrote ${files.size} font files (${mb} MB) and fonts.css into public/fonts/`);
