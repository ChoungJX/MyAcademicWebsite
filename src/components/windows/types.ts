import type { Content } from '../../data/types';

/** Props for the home-page window islands. Plain data only, so Astro can serialize them. */
export interface WindowsProps {
  w: Content['windows'];
  ui: Content['ui'];
  nameLocal: string;
  /** Title of the News window, e.g. "News 2026.09.23". */
  newsTitle: string;
  /** Profile anchors, plus the school, lab and advisor pages linked from the whoami card. */
  links: { news: string; pubs: string; about: string; school: string; lab: string; advisor: string };
}
