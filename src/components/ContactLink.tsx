import type { ReactNode } from 'react';
import { CONTACT_LINKS } from '../data/shared';

/** Selects the MAIL links. Clicks on them open contact.exe instead of the mail app (useMailLinks). */
export const MAIL_LINK = 'a[data-contact]';

type Link = (typeof CONTACT_LINKS)[number];

interface Props {
  link: Link;
  onClick?: () => void;
  /** Defaults to the link's label. */
  children?: ReactNode;
}

/** One of CONTACT_LINKS. MAIL gets data-contact; without JavaScript it stays a plain mailto: link. */
export default function ContactLink({ link, onClick, children }: Props) {
  return (
    <a href={link.href} data-contact={link.id === 'mail' ? '' : undefined} onClick={onClick}>
      {children ?? link.label}
    </a>
  );
}
