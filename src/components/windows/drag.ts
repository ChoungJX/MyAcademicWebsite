import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { DragHandlers } from './Win95Window';

export interface Pos {
  x: number;
  y: number;
}

export interface DragStart {
  /** Where the window is when the drag starts, in the units `move` gets back. */
  origin: Pos;
  /** Screen pixels per unit. The desktop stage is scaled with CSS. */
  scale?: number;
}

/**
 * Title-bar dragging for every draggable window. `start` runs when the left button goes down on
 * the bar, but not on its buttons or links; it returns null to ignore the press. While the button
 * is held, `move` gets the window's new position, rounded to whole units.
 */
export function useDrag(start: (bar: HTMLElement) => DragStart | null, move: (pos: Pos) => void): DragHandlers {
  const drag = useRef<{ sx: number; sy: number; origin: Pos; scale: number } | null>(null);
  const end = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    drag.current = null;
  };
  return {
    onPointerDown(e) {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest('button, a')) return;
      const s = start(e.currentTarget);
      if (!s) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { sx: e.clientX, sy: e.clientY, origin: s.origin, scale: s.scale ?? 1 };
    },
    onPointerMove(e) {
      const d = drag.current;
      if (!d) return;
      move({
        x: Math.round(d.origin.x + (e.clientX - d.sx) / d.scale),
        y: Math.round(d.origin.y + (e.clientY - d.sy) / d.scale),
      });
    },
    onPointerUp: end,
    onPointerCancel: end,
  };
}
