import type { ComponentType } from 'react';
import ContactLink from './ContactLink';
import LangSwitch from './LangSwitch';
import { IconAbout, IconContact, IconEducation, IconExperience, IconNews, IconPublications, IconTop } from './icons';
import type { IconTone } from './icons';
import { CONTACT_LINKS } from '../data/shared';
import { navItems } from '../data';
import type { NavId, Page } from '../data';
import type { Lang } from '../data/types';

interface Props {
  lang: Lang;
  page: Page;
  /** Icon colors: 'violet' in the drawer, 'light' in the menu window. */
  tone: IconTone;
  languagesLabel: string;
  /** Called when a menu item is followed, so the drawer can close. */
  onNavigate?: () => void;
}

const ICONS: Record<NavId, ComponentType<{ tone?: IconTone }>> = {
  top: IconTop,
  about: IconAbout,
  news: IconNews,
  pubs: IconPublications,
  edu: IconEducation,
  exp: IconExperience,
  contact: IconContact,
};

/** Menu items and the language switch, shared by the phone drawer and the desktop menu window. */
export default function MenuLinks({ lang, page, tone, languagesLabel, onNavigate }: Props) {
  return (
    <>
      <ul className="menu__list">
        {navItems(lang).map(({ id, label, href }) => {
          const Icon = ICONS[id];
          return (
            <li key={label}>
              <a className="menu__item" href={href} onClick={onNavigate}>
                {label}
                <Icon tone={tone} />
              </a>
              {id === 'contact' && (
                <ul className="menu__sub">
                  {CONTACT_LINKS.map((link) => (
                    <li key={link.id}>
                      {/* MAIL opens contact.exe, so the drawer closes to show it. */}
                      <ContactLink link={link} onClick={link.id === 'mail' ? onNavigate : undefined} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <LangSwitch className="menu__langs" lang={lang} page={page} label={languagesLabel} />
    </>
  );
}
