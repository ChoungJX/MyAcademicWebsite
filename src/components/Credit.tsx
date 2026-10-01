import { ZUTOMAYO } from '../data/shared';
import type { Lang } from '../data/types';

const FULL_NAME = 'ずっと真夜中でいいのに。';

/**
 * Required on every page: the look borrows ZUTOMAYO's design language. The Japanese pages spell
 * out the band's full name; the others show ZUTOMAYO and keep the full name as a tooltip.
 */
export default function Credit({ lang }: { lang: Lang }) {
  const ja = lang === 'ja';
  return (
    <p className="credit">
      STYLE INSPIRED BY{' '}
      <a href={ZUTOMAYO} title={ja ? undefined : FULL_NAME}>
        {ja ? FULL_NAME : 'ZUTOMAYO'}
      </a>
    </p>
  );
}
