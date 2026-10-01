import { useEffect, useRef, useState } from 'react';
import { CloseX } from './icons';
import MenuLinks from './MenuLinks';
import type { Page } from '../data';
import type { Lang } from '../data/types';

interface Props {
  lang: Lang;
  page: Page;
  /** 'box': boxed burger on the mobile home. 'text': burger + MENU on the phone profile and News pages. */
  variant: 'box' | 'text';
  labels: { open: string; close: string; languages: string };
}

/** Phone menu: a burger button plus the slide-out drawer, after zutomayo.net/news. */
export default function MenuDrawer({ lang, page, variant, labels }: Props) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`menu-trigger menu-trigger--${variant}`}
        aria-label={variant === 'box' ? labels.open : undefined}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
      >
        <span className="bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {variant === 'text' && 'MENU'}
      </button>

      {open && (
        <>
          <div className="menu-scrim" onClick={close} />
          <nav id="site-menu" className="menu" aria-label="Menu">
            <button ref={closeBtn} type="button" className="menu__close" aria-label={labels.close} onClick={close}>
              <CloseX />
            </button>
            <MenuLinks
              lang={lang}
              page={page}
              tone="violet"
              languagesLabel={labels.languages}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </>
      )}
    </>
  );
}
