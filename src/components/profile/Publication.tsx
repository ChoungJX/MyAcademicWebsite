import { useEffect, useId, useRef, useState } from 'react';
import type { Publication as Pub } from '../../data/types';

interface Props {
  p: Pub;
  labels: { copy: string; copied: string };
}

/** One paper. BIBTEX expands a box with the entry and a copy button. */
export default function Publication({ p, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelId = useId();
  const code = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    if (!p.bibtex) return;
    try {
      await navigator.clipboard.writeText(p.bibtex);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access refused: select the entry so Cmd/Ctrl+C still works.
      if (!code.current) return;
      const range = document.createRange();
      range.selectNodeContents(code.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <article className="pub">
      <div className="pub-meta">
        <span className="pub-year">{p.year}</span>
        <span>{p.kind}</span>
      </div>
      <h3>{p.title}</h3>
      <p>
        {p.authors.map((a, i) => (
          <span key={a.name}>
            {i > 0 && ', '}
            {a.me ? <strong className="pub-me">{a.name}</strong> : a.name}
          </span>
        ))}
      </p>
      <p className="pub-venue">{p.venue}</p>

      <div className="pub-actions">
        <span className="pub-status">{p.status}</span>
        {p.bibtex && (
          <button
            type="button"
            className="btn-ink"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            BIBTEX
          </button>
        )}
        {p.doi ? (
          <a className="btn-ink" href={`https://doi.org/${p.doi}`}>
            DOI
          </a>
        ) : (
          <span className="btn-soon">DOI · SOON</span>
        )}
      </div>

      {p.bibtex && (
        <div id={panelId} className="bib" hidden={!open}>
          <div className="bib-bar">
            <span>cite.bib</span>
            <button type="button" className="bib-copy" onClick={copy}>
              {copied ? labels.copied : labels.copy}
            </button>
          </div>
          <pre>
            <code ref={code}>{p.bibtex}</code>
          </pre>
          <span className="sr-only" aria-live="polite">
            {copied ? labels.copied : ''}
          </span>
        </div>
      )}
    </article>
  );
}
