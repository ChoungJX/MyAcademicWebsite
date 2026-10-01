import type { Content } from '../../data/types';

interface Props {
  size: number;
  left: number;
  top: number;
  ui: Pick<Content['ui'], 'reopen' | 'moonTitle'>;
  onClick: () => void;
}

/** The pixel moon on a home stage. Clicking it opens every window again and replays the pop. */
export default function MoonButton({ size, left, top, ui, onClick }: Props) {
  return (
    <button
      type="button"
      className="moon-btn"
      aria-label={ui.reopen}
      title={ui.moonTitle}
      onClick={onClick}
      style={{ left, top, width: size, height: size }}
    >
      <img className="pixelated" src="/static/images/moon.png" alt="" width={size} height={size} draggable={false} />
    </button>
  );
}
