import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import MoonButton from './MoonButton';
import PopWindow from './PopWindow';
import type { PopWindowProps } from './PopWindow';
import { ContactBody, NewsBody, Neofetch, PaperBody } from './bodies';
import { useDrag } from './drag';
import type { Pos } from './drag';
import { isInView } from './fixed';
import { CONTACT_EXE, useMailAttention, useMailLinks } from './mail';
import type { WindowsProps } from './types';

type WinId = 'paper' | 'contact' | 'whoami' | 'news';

interface WinState {
  x: number;
  y: number;
  z: number;
  open: boolean;
  /** Opened on its own by MAIL, so it pops at once instead of waiting its turn. */
  solo?: boolean;
}

// Positions on the 1440x900 desktop stage.
const INITIAL: Record<WinId, WinState> = {
  paper: { x: 330, y: 500, z: 1, open: true },
  contact: { x: 994, y: 492, z: 2, open: true },
  whoami: { x: 976, y: 48, z: 3, open: true },
  news: { x: 660, y: 690, z: 4, open: true },
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

interface StageWindowProps extends Omit<PopWindowProps, 'style' | 'drag'> {
  state: WinState;
  /** Brings the window to the front when its title bar is grabbed. */
  onRaise: () => void;
  onMove: (pos: Pos) => void;
}

/** A window on the desktop stage, dragged by its title bar within the stage. */
function StageWindow({ state, onRaise, onMove, ...frame }: StageWindowProps) {
  const drag = useDrag(
    (bar) => {
      onRaise();
      // The stage is CSS-scaled; convert screen pixels back to stage pixels. Measure the stage,
      // not the bar, which is also scaled while its window is still popping open.
      const stage = bar.closest<HTMLElement>('.stage') ?? bar;
      return { origin: state, scale: stage.getBoundingClientRect().width / stage.offsetWidth || 1 };
    },
    ({ x, y }) => onMove({ x: clamp(x, -240, 1400), y: clamp(y, 0, 868) }),
  );
  return <PopWindow {...frame} style={{ left: state.x, top: state.y, zIndex: state.z }} drag={drag} />;
}

/** The moon and the four draggable windows on the desktop home. */
export default function DesktopWindows({ w, ui, nameLocal, newsTitle, links }: WindowsProps) {
  const [wins, setWins] = useState(INITIAL);
  // Bumped by the moon. The windows' keys change, so they all remount and pop open again.
  const [round, setRound] = useState(0);
  const topZ = useRef(10);
  const layer = useRef<HTMLDivElement>(null);
  const contact = useMailAttention();

  const patch = (id: WinId, next: Partial<WinState>) =>
    setWins((prev) => ({ ...prev, [id]: { ...prev[id], ...next } }));
  const raise = (id: WinId) => {
    topZ.current += 1;
    patch(id, { z: topZ.current });
  };

  // MAIL in the footer is plain HTML outside this island, so catch its clicks on the stage. It
  // opens contact.exe instead of the mail app. An open contact.exe comes to the front and blinks,
  // after going back to its spot if it was dragged partly off screen.
  useMailLinks(
    () => {
      const wasOpen = wins.contact.open;
      raise('contact');
      if (!wasOpen) patch('contact', { open: true, solo: true });
      else if (contact.winRef.current && !isInView(contact.winRef.current))
        patch('contact', { x: INITIAL.contact.x, y: INITIAL.contact.y });
      contact.attend(wasOpen);
    },
    () => layer.current?.closest('.stage') ?? null,
  );

  const close = (id: WinId) => () => patch(id, { open: false });
  const reopen = () => {
    topZ.current = 10;
    setWins(INITIAL);
    setRound((r) => r + 1);
  };

  // Back to front, which is also the order they pop open in.
  const windows: { id: WinId; title: string; width: number; dark?: boolean; body: ReactNode }[] = [
    { id: 'paper', title: 'paper.pdf', width: 300, body: <PaperBody {...w.paper} openHref={links.pubs} /> },
    { id: 'contact', ...CONTACT_EXE, body: <ContactBody {...w.contact} ref={contact.mailRef} /> },
    {
      id: 'whoami',
      title: 'whoami.sh',
      width: 440,
      dark: true,
      body: <Neofetch nameLocal={nameLocal} aboutHref={links.about} schoolHref={links.school} labHref={links.lab} advisorHref={links.advisor} />,
    },
    {
      id: 'news',
      title: newsTitle,
      width: 380,
      body: (
        <NewsBody
          message={w.news.message}
          read={w.news.read}
          later={w.news.later}
          readHref={links.news}
          onLater={close('news')}
        />
      ),
    },
  ];

  return (
    <div className="win-layer" ref={layer}>
      <MoonButton size={520} left={420} top={140} ui={ui} onClick={reopen} />

      {windows.map(({ id, body, ...frame }, n) => {
        const state = wins[id];
        return (
          state.open && (
            <StageWindow
              key={`${id}-${round}`}
              {...frame}
              ref={id === 'contact' ? contact.winRef : undefined}
              state={state}
              n={state.solo ? 0 : n}
              replay={state.solo || round > 0}
              closeLabel={ui.close}
              onClose={close(id)}
              onRaise={() => raise(id)}
              onMove={(pos) => patch(id, pos)}
            >
              {body}
            </StageWindow>
          )
        );
      })}
    </div>
  );
}
