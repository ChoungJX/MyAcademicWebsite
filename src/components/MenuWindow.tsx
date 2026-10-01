import { useId, useState } from 'react';
import { MinimizeGlyph, RestoreGlyph } from './icons';
import MenuLinks from './MenuLinks';
import Win95Window from './windows/Win95Window';
import { useFixedWindow } from './windows/fixed';
import type { Page } from '../data';
import type { Lang } from '../data/types';

interface Props {
  lang: Lang;
  page: Page;
  labels: { minimize: string; restore: string; languages: string };
}

const WIDTH = 232;
const START = { x: 40, y: 40 };

/**
 * Desktop menu on the profile and News pages: a Win95 window pinned to the top left, after zutomayo.net/news.
 * Drag it by the title bar; the title-bar button folds it down to the bar and back. Its MAIL opens
 * contact.exe (ContactPopup) beside it.
 */
export default function MenuWindow({ lang, page, labels }: Props) {
  const [pos, setPos] = useState(START);
  const [open, setOpen] = useState(true);
  const navId = useId();
  const drag = useFixedWindow(WIDTH, pos, setPos);

  const foldButton = (
    <button
      type="button"
      className="win__min"
      aria-label={open ? labels.minimize : labels.restore}
      aria-expanded={open}
      aria-controls={navId}
      onClick={() => setOpen((o) => !o)}
    >
      {open ? <MinimizeGlyph /> : <RestoreGlyph />}
    </button>
  );

  return (
    <Win95Window
      title="menu.exe"
      width={WIDTH}
      className="win--menu"
      style={{ left: pos.x, top: pos.y }}
      drag={drag}
      button={foldButton}
    >
      <nav id={navId} className="menu-win" aria-label="Menu" hidden={!open}>
        <MenuLinks lang={lang} page={page} tone="light" languagesLabel={labels.languages} />
      </nav>
    </Win95Window>
  );
}
