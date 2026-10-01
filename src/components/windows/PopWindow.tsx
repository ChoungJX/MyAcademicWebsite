import type { CSSProperties, ReactNode, Ref } from 'react';
import Win95Window from './Win95Window';
import type { DragHandlers } from './Win95Window';

// Home windows pop open one after another when the page loads, after zutomayo.net's top page.
// The animation itself is .win--pop in global.css; this only staggers the start times.

const START = 0.5; // seconds before the first window
const STAGGER = 0.3; // seconds between windows

export interface PopWindowProps {
  title: string;
  width: number;
  dark?: boolean;
  mobile?: boolean;
  style?: CSSProperties;
  drag?: DragHandlers;
  ref?: Ref<HTMLElement>;
  closeLabel: string;
  onClose: () => void;
  /** Its turn: the nth window starts popping n × STAGGER after the first. */
  n: number;
  /** After the moon reopens the windows, the first one pops at once. */
  replay: boolean;
  children: ReactNode;
}

/**
 * A window on a home stage. It sets --pop, the moment it starts popping open, which whoami.sh
 * also times its typing from.
 */
export default function PopWindow({ n, replay, style, ...frame }: PopWindowProps) {
  const seconds = (replay ? 0 : START) + n * STAGGER;
  const pop = { '--pop': `${Number(seconds.toFixed(2))}s` } as CSSProperties;
  return <Win95Window {...frame} className="win--pop" style={{ ...style, ...pop }} />;
}
