import type { CSSProperties } from 'react';
import ContactLink from '../ContactLink';
import Credit from '../Credit';
import LangSwitch from '../LangSwitch';
import { PixelStar } from '../icons';
import { CONTACT_LINKS } from '../../data/shared';
import { navItems, pathFor } from '../../data';
import type { Content, Lang } from '../../data/types';

// Static parts of the two home stages. The moon and the windows are islands laid on top.

interface Note {
  text: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
  hint?: boolean;
}

const DESKTOP_NOTES: Note[] = [
  { text: 'switch (opcode)', x: 34, y: 206, size: 30, rotate: -6 },
  { text: 'taken?', x: 176, y: 598, size: 28, rotate: 8 },
  { text: 'goto *dispatch[op];', x: 1112, y: 446, size: 28, rotate: -5 },
  { text: 'jmp *%rax', x: 1188, y: 704, size: 30, rotate: 6 },
  { text: 'z z z', x: 872, y: 118, size: 30, rotate: -10 },
  { text: 'click the moon', x: 872, y: 628, size: 22, rotate: -6, hint: true },
];

/** The desktop nav types itself out; its ith link has n characters (see .home-nav a). */
const typing = (i: number, label: string) => ({ '--i': String(i), '--n': String(label.length) }) as CSSProperties;

const MOBILE_NOTES: Note[] = [
  { text: 'z z z', x: 306, y: 112, size: 24, rotate: -10 },
  { text: 'tap the moon', x: 300, y: 474, size: 18, rotate: -6, hint: true },
  { text: 'jmp *%rax', x: 238, y: 946, size: 24, rotate: 6 },
];

function Notes({ notes }: { notes: Note[] }) {
  return (
    <>
      {notes.map((n) => {
        const style: CSSProperties = {
          left: n.x,
          top: n.y,
          fontSize: n.size,
          transform: `rotate(${n.rotate}deg)`,
          color: n.hint ? 'var(--muted-dark)' : 'var(--scribble)',
        };
        return (
          <div key={n.text} className="note" aria-hidden="true" style={style}>
            {n.text}
          </div>
        );
      })}
    </>
  );
}

/** MAIL, GITHUB, ORCID, EAT? and the credit. MAIL opens contact.exe: DesktopWindows or ContactPopup catches it. */
function HomeFoot({ variant, lang }: { variant: 'desktop' | 'mobile'; lang: Lang }) {
  return (
    <div className={`home-foot home-foot--${variant}`}>
      <div className="home-links">
        {CONTACT_LINKS.map((link) => (
          <ContactLink key={link.id} link={link} />
        ))}
      </div>
      <Credit lang={lang} />
    </div>
  );
}

function Chips({ t, mobile }: { t: Content; mobile?: boolean }) {
  return (
    <div className={mobile ? 'chips chips--mobile' : 'chips chips--desktop'}>
      <span className="chip-name">{t.nameChip}</span>
      <span className="chip-role">{mobile ? t.roleShort : t.role}</span>
    </div>
  );
}

export function DesktopScene({ t }: { t: Content }) {
  const nav = navItems(t.lang);
  return (
    <>
      <img className="scene-doodles" src="/static/images/doodles-home-desktop.svg" alt="" width={1440} height={900} />
      <PixelStar size={12} color="var(--chalk)" style={{ left: 776, top: 64 }} />
      <PixelStar size={9} color="var(--terminal)" style={{ left: 948, top: 34 }} />
      <Notes notes={DESKTOP_NOTES} />

      <h1 className="home-name home-name--desktop">Linfeng Zheng</h1>
      <Chips t={t} />

      <nav className="home-nav" aria-label="Main">
        {nav.map((item, i) => (
          <a key={item.label} href={item.href} style={typing(i, item.label)}>
            {item.label}
          </a>
        ))}
        <LangSwitch
          className="home-langs"
          lang={t.lang}
          page="home"
          label={t.ui.languages}
          linkStyle={(j, label) => typing(nav.length + j, label)}
        />
      </nav>

      <HomeFoot variant="desktop" lang={t.lang} />
    </>
  );
}

export function MobileScene({ t }: { t: Content }) {
  return (
    <>
      <img className="scene-doodles" src="/static/images/doodles-home-mobile.svg" alt="" width={390} height={1099} />
      <PixelStar size={9} color="var(--chalk)" style={{ left: 30, top: 160 }} />
      <Notes notes={MOBILE_NOTES} />

      <h1 className="home-name home-name--mobile">Linfeng Zheng</h1>
      <Chips t={t} mobile />
      <a className="about-chip" href={pathFor(t.lang, 'profile', 'about')}>
        ABOUT ME →
      </a>

      <HomeFoot variant="mobile" lang={t.lang} />
    </>
  );
}
