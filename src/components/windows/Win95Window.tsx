import type { CSSProperties, PointerEventHandler, ReactNode, Ref } from 'react';
import { Crescent } from '../icons';

export interface DragHandlers {
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
}

interface BaseProps {
  title: string;
  width: number;
  /** Terminal-style window (whoami.sh). */
  dark?: boolean;
  mobile?: boolean;
  /** Extra class on the frame, e.g. the pinned menu window. */
  className?: string;
  style?: CSSProperties;
  /** Title-bar handlers that make the window draggable. */
  drag?: DragHandlers;
  /** The window's frame, e.g. for contact.exe to blink. */
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

/** The title bar ends in a close button, or in a button of the caller's own (the menu's minimize). */
type TitleButton = { closeLabel: string; onClose: () => void } | { button: ReactNode };

type Props = BaseProps & TitleButton;

export default function Win95Window(props: Props) {
  const { title, width, dark, mobile, className, style, drag, ref, children } = props;
  const classes = ['win', dark && 'win--dark', mobile && 'win--mobile', className].filter(Boolean).join(' ');
  return (
    <section ref={ref} className={classes} aria-label={title} style={{ width, ...style }}>
      <div className={drag ? 'win__bar win__bar--drag' : 'win__bar'} {...drag}>
        <Crescent />
        <span className="win__title">{title}</span>
        {'button' in props ? (
          props.button
        ) : (
          <button type="button" className="win__close" aria-label={`${props.closeLabel} ${title}`} onClick={props.onClose}>
            ×
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
