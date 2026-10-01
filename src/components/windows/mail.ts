import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { MAIL_LINK } from '../ContactLink';

/** contact.exe, which every MAIL link opens: the stage window on the desktop home, ContactPopup elsewhere. */
export const CONTACT_EXE = { title: 'contact.exe', width: 320 };

/**
 * Calls onMail, in place of the mail app, when a MAIL link inside `scope` (default: the whole page)
 * is clicked. The listener nearest the link wins: it prevents the default, and the others skip the
 * click. MAIL links are often plain HTML outside the island, so this listens on the DOM.
 */
export function useMailLinks(onMail: (link: HTMLElement) => void, scope: () => EventTarget | null = () => document) {
  const onClick = useEffectEvent((e: Event) => {
    if (e.defaultPrevented) return;
    const link = (e.target as Element).closest<HTMLElement>(MAIL_LINK);
    if (!link) return;
    e.preventDefault();
    onMail(link);
  });
  useEffect(() => {
    const root = scope();
    if (!root) return;
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, []);
}

// The whole window turns into its negative and back, like a terminal's visual bell. hue-rotate
// keeps the violets violet. Three blinks of 180 ms stay under three flashes a second; with reduced
// motion the window shows its negative once.
const NEGATIVE = 'invert(1) hue-rotate(180deg)';
const BLINK: Keyframe[] = [NEGATIVE, 'none', NEGATIVE, 'none', NEGATIVE, 'none'].map((filter) => ({
  filter,
  easing: 'steps(1, end)',
}));
const ONCE: Keyframe[] = [{ filter: NEGATIVE, easing: 'steps(1, end)' }, { filter: 'none' }];

/**
 * What MAIL does to contact.exe besides opening it. Put winRef on the window and mailRef on its
 * mail button. attend(true) makes a window that was already open blink; either way, focus then
 * moves to the mail button.
 */
export function useMailAttention() {
  const [focusTick, setFocusTick] = useState(0);
  const winRef = useRef<HTMLElement>(null);
  const mailRef = useRef<HTMLAnchorElement>(null);
  const blink = useRef<Animation | null>(null);

  // Runs after the render that mounts the window, so the button exists by then.
  useEffect(() => {
    if (focusTick > 0) mailRef.current?.focus({ preventScroll: true });
  }, [focusTick]);

  const attend = (alreadyOpen: boolean) => {
    const win = winRef.current;
    // A click during a blink lets it finish instead of starting over.
    if (alreadyOpen && win && blink.current?.playState !== 'running') {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      blink.current = win.animate(reduced ? ONCE : BLINK, reduced ? 600 : 900);
    }
    setFocusTick((n) => n + 1);
  };

  return { winRef, mailRef, attend };
}
