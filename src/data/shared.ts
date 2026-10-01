import type { Lang, Publication } from './types';

export const EMAIL = 'zheng.l.fe73@m.isct.ac.jp';
export const GITHUB_USER = 'ChoungJX';
export const GITHUB = `https://github.com/${GITHUB_USER}`;
export const ORCID_ID = '0009-0005-4607-4106';
export const EAT = 'https://eat.rabbitravel.xyz/';
export const ZUTOMAYO = 'https://zutomayo.net/';

/** MAIL, GITHUB, ORCID and EAT?, in this order in the menus, the home footer and CONTACT. */
export const CONTACT_LINKS = [
  { id: 'mail', label: 'MAIL', href: `mailto:${EMAIL}` },
  { id: 'github', label: 'GITHUB', href: GITHUB },
  { id: 'orcid', label: 'ORCID', href: `https://orcid.org/${ORCID_ID}` },
  { id: 'eat', label: 'EAT?', href: EAT },
] as const;

/** ogLocale is the page's language in the form link previews (Open Graph) expect. */
export const LANGS: { lang: Lang; label: string; htmlLang: string; ogLocale: string }[] = [
  { lang: 'en', label: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  { lang: 'zh', label: '中文', htmlLang: 'zh-Hans', ogLocale: 'zh_CN' },
  { lang: 'ja', label: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP' },
];

/** These sites have Japanese and English pages; the Japanese site links the Japanese ones. */
export const LAB_URL = { ja: 'https://titech-caras.github.io/', en: 'https://titech-caras.github.io/index-en.html' };
export const ADVISOR_URL = { ja: 'https://hiroshi-sasaki.github.io/', en: 'https://hiroshi-sasaki.github.io/index-en.html' };
export const ISCT_URL = { ja: 'https://www.isct.ac.jp/ja', en: 'https://www.isct.ac.jp/en' };
export const CQUPT_URL = 'https://www.cqupt.edu.cn/';

/** Which of those pages a page in `lang` links: English for the English and Chinese pages. */
export const localPage = (lang: Lang, urls: { ja: string; en: string }) => (lang === 'ja' ? urls.ja : urls.en);

/** The whoami window reads like terminal output, so it stays in English on every page. */
export const NEOFETCH = {
  user: 'linfeng',
  host: 'science-tokyo',
  name: 'Linfeng Zheng',
  role: 'PhD Student',
  lab: 'CARAS Lab',
  advisor: 'Dr. Hiroshi Sasaki',
  research: ['Branch Prediction', 'Interpreter'],
};

/** Everything about the CAL paper except its status label, which each language words itself. */
export const CAL_PAPER: Omit<Publication, 'status'> = {
  year: '2026',
  kind: 'IEEE CAL · LETTER',
  title: 'Improving Indirect Branch Prediction in Interpreters via Hardware/Software Co-Design',
  authors: [{ name: 'Linfeng Zheng', me: true }, { name: 'Hiroshi Sasaki' }],
  venue: 'IEEE Computer Architecture Letters (CAL), 2026',
  // IEEE Xplore's "Cite This" entry without its keywords. The paper is in Early Access, so volume and
  // number are empty and the pages may change; copy the entry again once the paper is in an issue.
  bibtex: `@ARTICLE{11714309,
  author={Zheng, Linfeng and Sasaki, Hiroshi},
  journal={IEEE Computer Architecture Letters},
  title={Improving Indirect Branch Prediction in Interpreters via Hardware/Software Co-Design},
  year={2026},
  volume={},
  number={},
  pages={1-4},
  doi={10.1109/LCA.2026.3738406}}`,
  doi: '10.1109/LCA.2026.3738406',
};
