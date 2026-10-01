import { useEffect, useEffectEvent } from 'react';
import { useDrag } from './drag';
import type { Pos } from './drag';
import type { DragHandlers } from './Win95Window';

/** While dragging, keep this much of the title bar on screen so the window can be grabbed again. */
const KEEP = { x: 60, y: 36 };

export function clampToViewport({ x, y }: Pos, width: number): Pos {
  return {
    x: Math.max(KEEP.x - width, Math.min(window.innerWidth - KEEP.x, x)),
    y: Math.max(0, Math.min(window.innerHeight - KEEP.y, y)),
  };
}

/** The part of the viewport on screen. Pinch zoom on a phone shrinks it to a piece of the page. */
function visibleArea() {
  const vv = window.visualViewport;
  if (vv) return { x: vv.offsetLeft, y: vv.offsetTop, w: vv.width, h: vv.height };
  const root = document.documentElement;
  return { x: 0, y: 0, w: root.clientWidth, h: root.clientHeight };
}

/** Whether a window's whole frame is on screen. */
export function isInView(win: HTMLElement) {
  const r = win.getBoundingClientRect();
  const v = visibleArea();
  return r.left >= v.x && r.top >= v.y && r.right <= v.x + v.w && r.bottom <= v.y + v.h;
}

/** The position that puts a fixed window in the middle of what is on screen. */
export function centerInView(win: HTMLElement): Pos {
  const v = visibleArea();
  return { x: Math.round(v.x + (v.w - win.offsetWidth) / 2), y: Math.round(v.y + (v.h - win.offsetHeight) / 2) };
}

/**
 * A window fixed to the viewport (the menu window and contact.exe): it drags by its title bar and
 * stays within reach when the viewport shrinks. A window with no position yet is centered by CSS,
 * so a drag starts from the middle of the screen.
 */
export function useFixedWindow(width: number, pos: Pos | null, setPos: (p: Pos) => void): DragHandlers {
  const onResize = useEffectEvent(() => {
    if (pos) setPos(clampToViewport(pos, width));
  });
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return useDrag(
    (bar) => {
      const win = bar.closest<HTMLElement>('.win');
      if (!win) return null;
      const root = document.documentElement;
      return { origin: pos ?? { x: (root.clientWidth - win.offsetWidth) / 2, y: (root.clientHeight - win.offsetHeight) / 2 } };
    },
    (p) => setPos(clampToViewport(p, width)),
  );
}
