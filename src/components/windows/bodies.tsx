import type { CSSProperties, ReactNode, Ref } from 'react';
import { Envelope, Sparkle } from '../icons';
import { EMAIL, NEOFETCH } from '../../data/shared';

export function NewsBody({
  message,
  readHref,
  read,
  later,
  onLater,
  mobile,
}: {
  message: string;
  readHref: string;
  read: string;
  later: string;
  onLater: () => void;
  mobile?: boolean;
}) {
  const btn = mobile ? 'btn95 btn95--mobile' : 'btn95';
  return (
    <div className="news-body">
      <div className="news-msg">
        <Sparkle />
        <p>{message}</p>
      </div>
      <div className="btn-row">
        <a className={btn} href={readHref}>
          {read}
        </a>
        <button type="button" className={btn} onClick={onLater}>
          {later}
        </button>
      </div>
    </div>
  );
}

export function PaperBody({
  status,
  venue,
  open,
  alt,
  openHref,
}: {
  status: string;
  venue: string;
  open: string;
  alt: string;
  openHref: string;
}) {
  return (
    <div className="paper-body">
      <div className="paper-sheet">
        <img src="/static/images/paper-title.png" alt={alt} width={266} height={210} draggable={false} />
      </div>
      <div className="paper-meta">
        <span className="paper-status">{status}</span>
        <span className="paper-venue">{venue}</span>
      </div>
      <a className="btn95" href={openHref}>
        {open}
      </a>
    </div>
  );
}

export function ContactBody({
  message,
  mail,
  tooltip,
  ref,
}: {
  message: string;
  mail: string;
  tooltip: string;
  /** The mail button, which gets focus when MAIL opens the window or makes it blink. */
  ref?: Ref<HTMLAnchorElement>;
}) {
  return (
    <div className="contact-body">
      <div className="contact-row">
        <Envelope width={40} height={32} body="var(--violet)" flap="#ffffff" />
        <div className="contact-text">
          <p className="contact-msg">{message}</p>
          <p className="contact-mail">{EMAIL}</p>
        </div>
      </div>
      <a ref={ref} className="btn95 btn95--primary" href={`mailto:${EMAIL}`} title={tooltip}>
        <Envelope width={20} height={16} body="var(--chalk)" flap="var(--bevel-lo)" />
        {mail}
      </a>
    </div>
  );
}

const PALETTE = ['#3a2e8c', '#5b47d6', '#8e7cf0', '#c8bfff', '#e9e6ff', '#f3f1ea', '#ffd84d', '#77728a'];

/** The command whoami.sh types before it prints the card. */
const COMMAND = 'neofetch';

/** The next command it types, a link to ABOUT. `more` is the Unix pager. */
const NEXT = 'more about me';

/** One line of the card: the key in yellow, then its value, unless the value wraps onto the lines below. */
function Field({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <div>
      <span className="neo__key">{name}</span>:{children !== undefined && <> {children}</>}
    </div>
  );
}

interface NeofetchProps {
  nameLocal: string;
  aboutHref: string;
  schoolHref: string;
  labHref: string;
  advisorHref: string;
  mobile?: boolean;
}

/**
 * whoami.sh: neofetch-style card. Once the window has popped open, it types the command, prints
 * the card and types `more about me`, which links to ABOUT (CSS animations, timed from the
 * window's --pop). The mobile layout wraps long values onto their own lines.
 */
export function Neofetch({ nameLocal, aboutHref, schoolHref, labHref, advisorHref, mobile }: NeofetchProps) {
  const [first, ...rest] = NEOFETCH.research;
  const advisor = (
    <a className="neo__link" href={advisorHref}>
      {NEOFETCH.advisor}
    </a>
  );
  return (
    <div className="neo" style={{ '--n': String(COMMAND.length) } as CSSProperties}>
      <div>
        <span className="neo__prompt">&gt;</span> <span className="neo__typed">{COMMAND}</span>
        <span className="neo__caret" aria-hidden="true" />
      </div>
      <div className="neo__row neo__out">
        <img className="pixelated" src="/static/images/bust.png" alt="Pixel-art portrait of Linfeng Zheng" width={120} height={150} draggable={false} />
        <div className="neo__info">
          <div>
            <span className="neo__key">{NEOFETCH.user}</span>
            <span className="neo__at">@</span>
            <a className="neo__key neo__link" href={schoolHref}>
              {NEOFETCH.host}
            </a>
          </div>
          <div aria-hidden="true">{'-'.repeat(NEOFETCH.user.length + NEOFETCH.host.length + 1)}</div>
          <Field name="Name">
            {NEOFETCH.name}
            {!mobile && (
              <>
                {' / '}
                <span className="name-local">{nameLocal}</span>
              </>
            )}
          </Field>
          <Field name="Role">{NEOFETCH.role}</Field>
          <Field name="Lab">
            <a className="neo__link" href={labHref}>
              {NEOFETCH.lab}
            </a>
          </Field>
          {mobile ? (
            <>
              <Field name="Advisor" />
              <div className="neo__indent">{advisor}</div>
              <Field name="Research" />
              {NEOFETCH.research.map((r) => (
                <div key={r} className="neo__indent">
                  {r}
                </div>
              ))}
            </>
          ) : (
            <>
              <Field name="Advisor">{advisor}</Field>
              <Field name="Research">{first}</Field>
              {rest.map((r) => (
                <div key={r} className="neo__cont">
                  {r}
                </div>
              ))}
            </>
          )}
          <div className="neo__palette" aria-hidden="true">
            {PALETTE.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
      <div className="neo__out">
        <span className="neo__prompt">&gt;</span>{' '}
        <a className="neo__link neo__typed neo__next" href={aboutHref} style={{ '--n': String(NEXT.length) } as CSSProperties}>
          {NEXT}
        </a>
        <span className="cursor" />
      </div>
    </div>
  );
}
