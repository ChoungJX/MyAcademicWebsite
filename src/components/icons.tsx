import type { CSSProperties, ReactNode } from 'react';

// Hand-drawn pixel icons. Each path is a set of 1-unit rectangles on a small grid.

const crisp = { shapeRendering: 'crispEdges' } as const;

/** An icon drawn on a w×h unit grid and shown at width×height, with sharp pixel edges. */
function Pixels({ width, height, grid, children }: { width: number; height: number; grid: string; children: ReactNode }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${grid}`} aria-hidden="true" style={crisp}>
      {children}
    </svg>
  );
}

/** Yellow crescent used in every window title bar and the BACK HOME button. */
export function Crescent() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden="true">
      <path
        fill="var(--yellow)"
        d="M4 0h6v2h-6zM2 2h4v2h-4zM0 4h4v2h-4zM0 6h4v2h-4zM0 8h4v2h-4zM2 10h4v2h-4zM4 12h6v2h-6z"
      />
    </svg>
  );
}

/** Left arrow on the 404 page's GO BACK button, in the button's text color. */
export function BackArrow() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
      <path fill="currentColor" d="M4 0h2v2h-2zM2 2h2v2h-2zM0 4h12v2h-12zM2 6h2v2h-2zM4 8h2v2h-2z" />
    </svg>
  );
}

/** Violet sparkle in the News window. */
export function Sparkle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <path
        fill="var(--violet)"
        d="M12 0h4v4h-4zM12 4h4v4h-4zM8 8h12v4h-12zM0 12h28v4h-28zM8 16h12v4h-12zM12 20h4v4h-4zM12 24h4v4h-4z"
      />
    </svg>
  );
}

export function PixelStar({ size, color, style }: { size: number; color: string; style?: CSSProperties }) {
  return (
    <svg className="px-star" width={size} height={size} viewBox="0 0 3 3" aria-hidden="true" style={{ ...crisp, ...style }}>
      <path fill={color} d="M1 0h1v1h-1zM0 1h3v1h-3zM1 2h1v1h-1z" />
    </svg>
  );
}

export function Envelope({ width, height, body, flap }: { width: number; height: number; body: string; flap: string }) {
  return (
    <Pixels width={width} height={height} grid="10 8">
      <path fill={body} d="M0 0h10v8h-10z" />
      <path fill={flap} d="M1 1h1v1h-1zM8 1h1v1h-1zM2 2h1v1h-1zM7 2h1v1h-1zM3 3h1v1h-1zM6 3h1v1h-1zM4 4h2v1h-2z" />
    </Pixels>
  );
}

export function CloseX() {
  return (
    <Pixels width={20} height={18} grid="10 9">
      <path
        fill="#ffffff"
        d="M0 0h2v1h-2zM8 0h2v1h-2zM1 1h2v1h-2zM7 1h2v1h-2zM2 2h2v1h-2zM6 2h2v1h-2zM3 3h4v1h-4zM4 4h2v1h-2zM3 5h4v1h-4zM2 6h2v1h-2zM6 6h2v1h-2zM1 7h2v1h-2zM7 7h2v1h-2zM0 8h2v1h-2zM8 8h2v1h-2z"
      />
    </Pixels>
  );
}

/** Win95 title-bar glyphs for the menu window's fold button. */
export function MinimizeGlyph() {
  return (
    <Pixels width={12} height={12} grid="6 6">
      <path fill="var(--ink)" d="M1 4h4v1h-4z" />
    </Pixels>
  );
}

export function RestoreGlyph() {
  return (
    <Pixels width={12} height={12} grid="6 6">
      <path fill="var(--ink)" d="M0 0h6v2h-6zM0 2h1v4h-1zM5 2h1v4h-1zM1 5h4v1h-4z" />
    </Pixels>
  );
}

/** Big black crescent: the mobile profile page's link back to the home page. */
export function BigCrescent() {
  return (
    <svg width="26" height="40" viewBox="0 0 80 120" aria-hidden="true">
      <path
        fill="var(--ink)"
        d="M40 0h32v8h-32zM24 8h40v8h-40zM16 16h32v8h-32zM8 24h32v8h-32zM8 32h24v8h-24zM0 40h32v8h-32zM0 48h32v8h-32zM0 56h32v8h-32zM0 64h32v8h-32zM8 72h24v8h-24zM8 80h32v8h-32zM16 88h32v8h-32zM24 96h40v8h-40zM40 104h32v8h-32z"
      />
    </svg>
  );
}

// Menu icons, one per item. They are drawn for the violet drawer; tone 'light' recolors them
// for the light menu window, where chalk-colored shapes would disappear.

export type IconTone = 'violet' | 'light';

interface ToneProps {
  tone?: IconTone;
}

export function IconTop({ tone = 'violet' }: ToneProps) {
  return (
    <Pixels width={14} height={20} grid="7 10">
      <path
        fill={tone === 'light' ? 'var(--violet)' : 'var(--yellow)'}
        d="M3 0h4v1h-4zM1 1h5v1h-5zM1 2h4v1h-4zM0 3h4v4h-4zM1 7h4v1h-4zM1 8h5v1h-5zM3 9h4v1h-4z"
      />
    </Pixels>
  );
}

/** An ID card: photo on the left, two lines of text. */
export function IconAbout({ tone = 'violet' }: ToneProps) {
  const light = tone === 'light';
  return (
    <Pixels width={20} height={16} grid="10 8">
      {light ? (
        <>
          <path fill="var(--ink)" d="M0 0h10v1h-10zM0 7h10v1h-10zM0 1h1v6h-1zM9 1h1v6h-1z" />
          <path fill="#ffffff" d="M1 1h8v6h-8z" />
        </>
      ) : (
        <path fill="var(--chalk)" d="M0 0h10v8h-10z" />
      )}
      <path fill="var(--violet)" d="M2 2h2v3h-2z" />
      <path fill={light ? 'var(--ink)' : 'var(--bevel-lo)'} d="M5 2h3v1h-3zM5 4h2v1h-2z" />
    </Pixels>
  );
}

export function IconNews({ tone = 'violet' }: ToneProps) {
  const light = tone === 'light';
  return (
    <Pixels width={18} height={18} grid="9 9">
      <path
        fill={light ? 'var(--ink)' : 'var(--chalk)'}
        d="M4 0h1v2h-1zM3 2h3v1h-3zM2 3h5v1h-5zM0 4h9v1h-9zM2 5h5v1h-5zM3 6h3v1h-3zM4 7h1v2h-1z"
      />
      {light && <path fill="var(--yellow)" d="M4 3h1v3h-1zM3 4h3v1h-3z" />}
    </Pixels>
  );
}

export function IconPublications({ tone = 'violet' }: ToneProps) {
  if (tone === 'light') {
    // An outlined page, so the white sheet shows on the light window.
    return (
      <Pixels width={16} height={20} grid="8 10">
        <path fill="var(--ink)" d="M0 0h5v1h-5zM0 1h1v9h-1zM5 1h1v1h-1zM6 2h1v1h-1zM7 3h1v7h-1zM1 9h6v1h-6zM4 1h1v2h-1zM4 3h3v1h-3z" />
        <path fill="#ffffff" d="M1 1h3v3h-3zM1 4h6v5h-6z" />
        <path fill="var(--violet)" d="M5 2h1v1h-1zM2 5h4v1h-4zM2 7h3v1h-3z" />
      </Pixels>
    );
  }
  return (
    <Pixels width={16} height={20} grid="8 10">
      <path fill="var(--chalk)" d="M0 0h5v3h-5zM0 3h8v7h-8z" />
      <path fill="var(--terminal)" d="M5 1h1v2h-1zM6 2h1v1h-1z" />
      <path fill="var(--bevel-lo)" d="M1 1h3v1h-3zM1 4h6v1h-6zM1 6h6v1h-6zM1 8h4v1h-4z" />
    </Pixels>
  );
}

export function IconEducation({ tone = 'violet' }: ToneProps) {
  return (
    <Pixels width={20} height={16} grid="10 8">
      <path fill="var(--ink)" d="M4 0h2v1h-2zM2 1h6v1h-6zM0 2h10v1h-10zM2 3h6v1h-6zM4 4h2v1h-2zM2 5h6v3h-6z" />
      <path fill={tone === 'light' ? 'var(--violet)' : 'var(--yellow)'} d="M9 3h1v3h-1zM8 6h2v2h-2z" />
    </Pixels>
  );
}

export function IconExperience({ tone = 'violet' }: ToneProps) {
  const light = tone === 'light';
  return (
    <Pixels width={20} height={20} grid="10 10">
      <path fill="var(--bevel-lo)" d="M0 0h9v1h-9zM0 1h10v9h-10z" />
      <path fill={light ? 'var(--violet-hi)' : 'var(--terminal)'} d="M2 0h5v3h-5z" />
      <path fill="var(--bevel-lo)" d="M5 1h1v1h-1z" />
      <path fill={light ? '#ffffff' : 'var(--chalk)'} d="M1 5h8v4h-8z" />
      <path fill="var(--bevel-lo)" d="M2 6h6v1h-6z" />
    </Pixels>
  );
}

export function IconContact({ tone = 'violet' }: ToneProps) {
  return tone === 'light' ? (
    <Envelope width={20} height={16} body="var(--violet)" flap="#ffffff" />
  ) : (
    <Envelope width={20} height={16} body="var(--chalk)" flap="var(--bevel-lo)" />
  );
}
