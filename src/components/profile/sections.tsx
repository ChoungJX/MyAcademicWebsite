import type { ReactNode } from 'react';
import ContactLink from '../ContactLink';
import Credit from '../Credit';
import { BackArrow, BigCrescent, Crescent } from '../icons';
import { CONTACT_LINKS, EMAIL, GITHUB_USER, ORCID_ID } from '../../data/shared';
import { SECTIONS, pathFor } from '../../data';
import type { SectionId } from '../../data';
import type { Content, Lang, NewsItem } from '../../data/types';

// Static sections of the profile, News and 404 pages ("Paper & Graphite"). The publications list is
// an island (Publication.tsx) because of its BibTeX box, so profile.astro puts the page together.

/** How many news items the profile page shows. The News page lists them all. */
const PROFILE_NEWS = 3;

/** One section of the profile page: its label from SECTIONS as the heading, then the content. */
export function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const label = SECTIONS.find((s) => s.id === id)?.label;
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="label">
        {label}
      </h2>
      {children}
    </section>
  );
}

/** The ways back to the home page: the moon in the phone's corner, the HOME tab on desktop. */
export function HomeLinks({ t }: { t: Content }) {
  const home = pathFor(t.lang, 'home');
  return (
    <>
      <a className="corner-moon" href={home} aria-label={t.ui.home}>
        <BigCrescent />
      </a>
      <a className="side-tab" href={home}>
        HOME
      </a>
    </>
  );
}

/** The name and, beside it, the page's black label (PROFILE, NEWS). */
export function ProfileHeader({ t, label }: { t: Content; label: string }) {
  return (
    <>
      <HomeLinks t={t} />
      <header className="profile-head">
        <h1 className="profile-name">Linfeng Zheng</h1>
        <span className="label">{label}</span>
      </header>
    </>
  );
}

export function AboutSection({ t }: { t: Content }) {
  return (
    <Section id="about">
      <div className="about">
        {t.about.map((paragraph, i) => (
          <p key={i}>
            {paragraph.map((run, j) =>
              typeof run === 'string' ? (
                run
              ) : (
                <a key={j} href={run.href}>
                  {run.text}
                </a>
              ),
            )}
          </p>
        ))}
      </div>
    </Section>
  );
}

/** The first line of an entry: its date (or code) in brackets and an optional violet tag. */
function EntryHead({ stamp, tag }: { stamp: string; tag?: string }) {
  return (
    <div className="entry-head">
      <span className="entry-stamp">[{stamp}]</span>
      {tag && <span className="tag">{tag}</span>}
    </div>
  );
}

/** One news item. VIEW MORE on a NEW one leads to the publications. */
function NewsEntry({ n, lang }: { n: NewsItem; lang: Lang }) {
  return (
    <article className="entry">
      <EntryHead stamp={n.date} tag={n.isNew ? 'NEW' : undefined} />
      <p className="entry-title">{n.text}</p>
      {n.isNew && (
        <a className="btn-ink" href={pathFor(lang, 'profile', 'pubs')}>
          VIEW MORE
        </a>
      )}
    </article>
  );
}

/** The profile's NEWS: the newest few items, then ALL NEWS to the News page. */
export function NewsSection({ t }: { t: Content }) {
  return (
    <Section id="news">
      {t.news.slice(0, PROFILE_NEWS).map((n) => (
        <NewsEntry key={n.date} n={n} lang={t.lang} />
      ))}
      <a className="btn-pixel all-news" href={pathFor(t.lang, 'news')}>
        ALL NEWS →
      </a>
    </Section>
  );
}

/** The News page: every item, one section per year. t.news is newest first, so the years are too. */
export function NewsArchive({ t }: { t: Content }) {
  const years = [...new Set(t.news.map((n) => n.date.slice(0, 4)))];
  return (
    <div className="news-archive">
      {years.map((year) => (
        <section key={year} aria-labelledby={`news-${year}`}>
          <h2 id={`news-${year}`} className="label label--year">
            {year}
          </h2>
          {t.news
            .filter((n) => n.date.startsWith(year))
            .map((n) => (
              <NewsEntry key={n.date} n={n} lang={t.lang} />
            ))}
        </section>
      ))}
    </div>
  );
}

/**
 * The 404 page's notice, set like a news item. The address stays empty in the HTML: the page's
 * script fills in the one that was asked for.
 */
export function NotFoundEntry({ t }: { t: Content }) {
  return (
    <article className="entry nf-entry">
      <EntryHead stamp="404" tag="NOT FOUND" />
      <h1 className="entry-title">{t.notFound.heading}</h1>
      <p className="nf-body">{t.notFound.body}</p>
      <p id="nf-path" className="nf-path" hidden />
    </article>
  );
}

export function EducationSection({ t }: { t: Content }) {
  return (
    <Section id="edu">
      <div className="edu-table">
        <div className="edu-head">ACADEMIC STATUS</div>
        <dl>
          {t.education.degrees.map((d) => (
            <div key={d.degree} className="edu-row">
              <dt>
                <span className="edu-degree">{d.degree}</span>
                <span className="edu-year">
                  {d.year}
                  {d.expected && '*'}
                </span>
              </dt>
              <dd>
                <span className="edu-field">{d.field}</span>
                <span className="edu-school">{d.school}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="edu-note">{t.education.expectedNote}</p>
    </Section>
  );
}

export function ExperienceSection({ t }: { t: Content }) {
  return (
    <Section id="exp">
      {t.experience.map((j) => (
        <div key={j.period} className="job">
          <span className="job-period">{j.period}</span>
          <div className="job-main">
            <span className="job-title">{j.title}</span>
            <span className="job-org">{j.org}</span>
            <p className="job-desc">{j.description}</p>
          </div>
        </div>
      ))}
    </Section>
  );
}

export function ContactSection({ t }: { t: Content }) {
  const detail = { mail: EMAIL, github: GITHUB_USER, orcid: ORCID_ID, eat: t.contact.eat };
  return (
    <Section id="contact">
      <p className="contact-lead">{t.contact.message}</p>
      <div className="contact-links">
        {CONTACT_LINKS.map((link) => (
          <ContactLink key={link.id} link={link}>
            <span>{link.label}</span>
            {detail[link.id]}
          </ContactLink>
        ))}
      </div>
    </Section>
  );
}

/**
 * BACK HOME and the credit. The 404 page also asks for GO BACK beside BACK HOME. It stays hidden in the
 * HTML: the page's script shows it when there is a page to go back to.
 */
export function ProfileFooter({ t, goBack = false }: { t: Content; goBack?: boolean }) {
  const home = (
    <a className="btn-pixel" href={pathFor(t.lang, 'home')}>
      <Crescent />
      BACK HOME
    </a>
  );
  return (
    <footer className="profile-foot">
      {goBack ? (
        <div className="foot-buttons">
          {home}
          <button id="go-back" type="button" className="btn-pixel btn-pixel--outline" hidden>
            <BackArrow />
            GO BACK
          </button>
        </div>
      ) : (
        home
      )}
      <Credit lang={t.lang} />
    </footer>
  );
}
