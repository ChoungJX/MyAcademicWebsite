import { useState } from 'react';
import type { ReactNode } from 'react';
import MoonButton from './MoonButton';
import PopWindow from './PopWindow';
import { NewsBody, Neofetch } from './bodies';
import type { WindowsProps } from './types';

type WinId = 'news' | 'whoami';

const ALL_OPEN: Record<WinId, boolean> = { news: true, whoami: true };

/** The moon plus the News and whoami windows on the mobile home. Windows close but don't drag. */
export default function MobileWindows({ w, ui, nameLocal, newsTitle, links }: WindowsProps) {
  const [open, setOpen] = useState(ALL_OPEN);
  // Bumped by the moon. The windows' keys change, so they both remount and pop open again.
  const [round, setRound] = useState(0);

  const close = (id: WinId) => () => setOpen((o) => ({ ...o, [id]: false }));
  const reopen = () => {
    setOpen(ALL_OPEN);
    setRound((r) => r + 1);
  };

  // Top to bottom, which is also the order they pop open in. whoami.sh always comes first. The
  // doodles in the gap between the two windows (doodles-home-mobile.svg, y 719) follow this layout.
  const windows: { id: WinId; title: string; top: number; dark?: boolean; body: ReactNode }[] = [
    {
      id: 'whoami',
      title: 'whoami.sh',
      top: 305,
      dark: true,
      body: <Neofetch nameLocal={nameLocal} aboutHref={links.about} schoolHref={links.school} labHref={links.lab} advisorHref={links.advisor} mobile />,
    },
    {
      id: 'news',
      title: newsTitle,
      top: 745,
      body: (
        <NewsBody
          message={w.news.message}
          read={w.news.read}
          later={w.news.later}
          readHref={links.news}
          onLater={close('news')}
          mobile
        />
      ),
    },
  ];

  return (
    <div className="win-layer">
      <MoonButton size={390} left={0} top={110} ui={ui} onClick={reopen} />

      {windows.map(
        ({ id, top, body, ...frame }, n) =>
          open[id] && (
            <PopWindow
              key={`${id}-${round}`}
              {...frame}
              width={366}
              mobile
              style={{ left: 12, top }}
              n={n}
              replay={round > 0}
              closeLabel={ui.close}
              onClose={close(id)}
            >
              {body}
            </PopWindow>
          ),
      )}
    </div>
  );
}
