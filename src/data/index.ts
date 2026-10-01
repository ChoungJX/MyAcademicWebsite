import type { Content, Lang } from './types';
import en from './en';
import zh from './zh';
import ja from './ja';

const CONTENT: Record<Lang, Content> = { en, zh, ja };

/** `lang` is the [...lang] route param: undefined for English, 'zh' or 'ja' otherwise. */
export function getContent(lang: string | undefined): Content {
  return CONTENT[(lang ?? 'en') as Lang] ?? en;
}

/** Static paths for the [...lang] routes: English lives at the site root. */
export function langPaths() {
  return [{ params: { lang: undefined } }, { params: { lang: 'zh' } }, { params: { lang: 'ja' } }];
}

export type Page = 'home' | 'profile' | 'news';

const PAGE_PATHS: Record<Page, string> = { home: '', profile: 'profile/', news: 'news/' };

/** The profile page's sections in page order, with the labels their headings and every menu use. */
export const SECTIONS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'news', label: 'NEWS' },
  { id: 'pubs', label: 'PUBLICATIONS' },
  { id: 'edu', label: 'EDUCATION' },
  { id: 'exp', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export function pathFor(lang: Lang, page: Page, hash?: SectionId): string {
  const prefix = lang === 'en' ? '/' : `/${lang}/`;
  const path = prefix + PAGE_PATHS[page];
  return hash ? `${path}#${hash}` : path;
}

export type NavId = 'top' | SectionId;

/** TOP, then the profile sections: the items of the home nav and of both menus. */
export function navItems(lang: Lang): { id: NavId; label: string; href: string }[] {
  return [
    { id: 'top', label: 'TOP', href: pathFor(lang, 'home') },
    ...SECTIONS.map((s) => ({ ...s, href: pathFor(lang, 'profile', s.id) })),
  ];
}
