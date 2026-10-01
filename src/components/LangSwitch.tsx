import type { CSSProperties } from 'react';
import { LANGS } from '../data/shared';
import { pathFor } from '../data';
import type { Page } from '../data';
import type { Lang } from '../data/types';

interface Props {
  lang: Lang;
  page: Page;
  className: string;
  /** Screen-reader name of the group. */
  label: string;
  /** Style for the ith link. The home nav uses it to type the links out one after another. */
  linkStyle?: (i: number, text: string) => CSSProperties;
}

/** EN 中文 日本語: the same page in each language, with the current one marked. */
export default function LangSwitch({ lang, page, className, label, linkStyle }: Props) {
  return (
    <div className={className} role="group" aria-label={label}>
      {LANGS.map((l, i) => (
        <a
          key={l.lang}
          href={pathFor(l.lang, page)}
          hrefLang={l.htmlLang}
          lang={l.htmlLang}
          aria-current={l.lang === lang ? 'page' : undefined}
          style={linkStyle?.(i, l.label)}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
