// Draws the site icon, the home page's pixel moon with a star, and writes favicon.svg,
// favicon.ico and apple-touch-icon.png into public/. Run `yarn favicon` after changing ART.
import { writeFileSync } from 'node:fs';
import { crc32, deflateSync } from 'node:zlib';

// Tokens from global.css.
const COLORS = {
  K: '#0b0b0f', // --ink
  Y: '#ffd84d', // --yellow
  C: '#f3f1ea', // --chalk
  L: '#c8bfff', // --terminal
  H: '#8e7cf0', // --violet-hi
  D: '#3a2e8c', // --violet-deep
};

// One character per pixel; '.' is transparent. Lit from the left like the hero moon, with its
// violet shadow side and light rim on the right.
const ART = [
  '..KKKKKKKKKKKK..',
  '.KYKKKKKKKKKKKK.',
  'KYYYKKKKKKKKKKKK',
  'KKYKKKKCCDHKKKKK',
  'KKKKKCCCCCDHHKKK',
  'KKKKCCCCCCDDHHKK',
  'KKKKCCCCCCCDHCKK',
  'KKKCCCLCCCCDHHCK',
  'KKKCCCCCCCCDHHCK',
  'KKKCCCCCCCCDHHCK',
  'KKKCCCCCCLCDHHCK',
  'KKKKCLCCCCCDHCKK',
  'KKKKCCCCCCDDHHKK',
  'KKKKKCCCCCDHHKKK',
  '.KKKKKKCCDHKKKK.',
  '..KKKKKKKKKKKK..',
];
const N = ART.length;

/** One path per color, each run of pixels in a row as a 1-unit-high rectangle. */
function svg() {
  const paths = Object.entries(COLORS).map(([key, color]) => {
    let d = '';
    ART.forEach((row, y) => {
      for (const run of row.matchAll(new RegExp(`${key}+`, 'g'))) {
        d += `M${run.index} ${y}h${run[0].length}v1h-${run[0].length}z`;
      }
    });
    return d && `<path fill="${color}" d="${d}"/>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges">${paths.join('')}</svg>\n`;
}

/** The art at `scale` image pixels per art pixel, inside a border of `pad` art pixels filled with `fill`. */
function png(scale, pad = 0, fill) {
  const size = (N + 2 * pad) * scale;
  const stride = size * 4 + 1; // each row starts with its filter type, 0 (none)
  const raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const key = ART[Math.floor(y / scale) - pad]?.[Math.floor(x / scale) - pad];
      const color = key && key !== '.' ? COLORS[key] : fill;
      if (color) raw.set([1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16)).concat(255), y * stride + 1 + x * 4);
    }
  }
  const chunk = (type, data) => {
    const body = Buffer.concat([Buffer.from(type), data]);
    const out = Buffer.alloc(body.length + 8);
    out.writeUInt32BE(data.length, 0);
    body.copy(out, 4);
    out.writeUInt32BE(crc32(body), body.length + 4);
    return out;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header.set([8, 6], 8); // 8 bits per channel, RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** An .ico holding PNG images; browsers pick the size that fits the screen. */
function ico(images) {
  const dir = Buffer.alloc(6 + 16 * images.length);
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(images.length, 4);
  let offset = dir.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + 16 * i;
    dir[entry] = size;
    dir[entry + 1] = size;
    dir.writeUInt16LE(1, entry + 4); // color planes
    dir.writeUInt16LE(32, entry + 6); // bits per pixel
    dir.writeUInt32LE(data.length, entry + 8);
    dir.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([dir, ...images.map((image) => image.data)]);
}

const out = new URL('../public/', import.meta.url);
writeFileSync(new URL('favicon.svg', out), svg());
// 16, 32 and 48 px: browser tabs on 1x, 2x and 3x screens.
writeFileSync(new URL('favicon.ico', out), ico([1, 2, 3].map((scale) => ({ size: N * scale, data: png(scale) }))));
// 180 px for iPhone home screens. iOS rounds the corners itself and wants no transparency,
// so ink fills the cut corners and a 2-pixel border.
writeFileSync(new URL('apple-touch-icon.png', out), png(9, 2, COLORS.K));
