export type Lang = 'en' | 'zh' | 'ja';

/** One paragraph: plain text runs and inline links. */
export type RichText = (string | { text: string; href: string })[];

export interface NewsItem {
  /** YYYY.MM.DD */
  date: string;
  text: string;
  /** Shows the NEW tag; the first isNew item also becomes the home News window. */
  isNew?: boolean;
}

export interface Publication {
  year: string;
  kind: string;
  title: string;
  authors: { name: string; me?: boolean }[];
  venue: string;
  status: string;
  /** Full BibTeX entry, shown in the expandable box under the paper. */
  bibtex?: string;
  doi?: string;
}

export interface Degree {
  degree: string;
  year: string;
  expected?: boolean;
  field: string;
  school: string;
}

export interface Job {
  period: string;
  title: string;
  org: string;
  description: string;
}

export interface Content {
  lang: Lang;
  /** Value for <html lang>. */
  htmlLang: string;
  meta: { homeTitle: string; profileTitle: string; newsTitle: string; notFoundTitle: string; description: string };
  /** Name on the home page's name chip. */
  nameChip: string;
  /** Name in the local script, after the English one in the whoami window. */
  nameLocal: string;
  /** Role chip on the desktop home, and the shorter one on mobile. */
  role: string;
  roleShort: string;
  windows: {
    news: { message: string; read: string; later: string };
    paper: { status: string; venue: string; open: string; alt: string };
    contact: { message: string; mail: string; tooltip: string };
  };
  /** Screen-reader labels and tooltips. */
  ui: {
    close: string;
    reopen: string;
    moonTitle: string;
    openMenu: string;
    closeMenu: string;
    minimizeMenu: string;
    restoreMenu: string;
    home: string;
    languages: string;
    copy: string;
    copied: string;
  };
  /** ABOUT, the first section of the profile page: one entry per paragraph. */
  about: RichText[];
  news: NewsItem[];
  publications: Publication[];
  education: { degrees: Degree[]; expectedNote: string };
  experience: Job[];
  contact: { message: string; eat: string };
  /** The 404 page: its heading and the line under it. */
  notFound: { heading: string; body: string };
}
