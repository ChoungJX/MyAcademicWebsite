import { useLayoutEffect, useRef, useState } from 'react';
import Win95Window from './Win95Window';
import { ContactBody } from './bodies';
import type { Pos } from './drag';
import { centerInView, clampToViewport, isInView, useFixedWindow } from './fixed';
import { CONTACT_EXE, useMailAttention, useMailLinks } from './mail';
import type { Content } from '../../data/types';

interface Props {
  contact: Content['windows']['contact'];
  closeLabel: string;
}

/** Space between the menu window and contact.exe. */
const GAP = 16;

interface Placement {
  /** null: centered by CSS until it is dragged or moved into view. */
  pos: Pos | null;
  phone: boolean;
}

/** Beside the desktop menu window when MAIL there opened it, else in the middle of the screen. */
function place(link: HTMLElement): Placement {
  const phone = !window.matchMedia('(min-width: 900px)').matches;
  const menu = link.closest('.win--menu');
  if (phone || !menu) return { pos: null, phone };
  // Right of the menu, or left of it when the right side has no room, with the title bar level
  // with MAIL.
  const { width } = CONTACT_EXE;
  const m = menu.getBoundingClientRect();
  const x = m.right + GAP + width <= window.innerWidth ? m.right + GAP : m.left - GAP - width;
  const y = Math.round(link.getBoundingClientRect().top) - 4;
  return { pos: clampToViewport({ x: Math.round(x), y }, width), phone };
}

/**
 * contact.exe as a window fixed to the screen, for the profile and News pages and the phone home.
 * Every MAIL link opens it instead of the mail app, and an open one blinks. The desktop home has its
 * own contact.exe on the stage (DesktopWindows), which takes its MAIL first.
 */
export default function ContactPopup({ contact, closeLabel }: Props) {
  const [win, setWin] = useState<Placement | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const attention = useMailAttention();
  const drag = useFixedWindow(CONTACT_EXE.width, win?.pos ?? null, (pos) => setWin((w) => w && { ...w, pos }));

  useMailLinks((link) => {
    trigger.current = link;
    if (!win) {
      setWin(place(link));
    } else {
      // Open but not all on screen (dragged aside, or the phone page is zoomed in): it moves to
      // the middle of what is visible before it blinks.
      const el = attention.winRef.current;
      if (el && !isInView(el)) setWin((w) => w && { ...w, pos: centerInView(el) });
    }
    attention.attend(win !== null);
  });

  // CSS centers a new window in the viewport. When a zoomed-in phone page doesn't show that spot,
  // center it in what is visible instead. Runs before paint, so the window never shows elsewhere.
  useLayoutEffect(() => {
    if (!win || win.pos) return;
    const el = attention.winRef.current;
    if (el && !isInView(el)) setWin({ ...win, pos: centerInView(el) });
  }, [win]);

  if (!win) return null;

  const close = () => {
    setWin(null);
    // Back to the MAIL that opened it, unless that was in the drawer, which has closed since.
    if (trigger.current?.isConnected) trigger.current.focus({ preventScroll: true });
  };

  return (
    <Win95Window
      ref={attention.winRef}
      {...CONTACT_EXE}
      mobile={win.phone}
      className={win.pos ? 'win--popup win--pop' : 'win--popup win--center win--pop'}
      style={win.pos ? { left: win.pos.x, top: win.pos.y } : undefined}
      drag={win.phone ? undefined : drag}
      closeLabel={closeLabel}
      onClose={close}
    >
      <ContactBody {...contact} ref={attention.mailRef} />
    </Win95Window>
  );
}
