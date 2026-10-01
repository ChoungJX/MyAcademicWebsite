import type { ReactNode } from 'react';
import ContactLink from '../ContactLink';
import Credit from '../Credit';
import { BigCrescent, Crescent } from '../icons';
import { CONTACT_LINKS, EMAIL, GITHUB_USER, ORCID_ID } from '../../data/shared';
import { SECTIONS, pathFor } from '../../data';
import type { SectionId } from '../../data';
import type { Content, Lang, NewsItem } from '../../data/types';

// Static sections of the profile and News pages ("Paper & Graphite"). The publications list is an
// island (Publication.tsx) because of its BibTeX box, so profile.astro puts the page together.

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

/** The name and, beside it, the page's black label (PROFILE, NEWS). */
export function ProfileHeader({ t, label }: { t: Content; label: string }) {
  const home = pathFor(t.lang, 'home');
  return (
    <>
      <a className="corner-moon" href={home} aria-label={t.ui.home}>
        <BigCrescent />
      </a>
      <a className="side-tab" href={home}>
        HOME
      </a>
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

/** One news item. VIEW MORE on a NEW one leads to the publications. */
function NewsEntry({ n, lang }: { n: NewsItem; lang: Lang }) {
  return (
    <article className="news-item">
      <div className="news-date-row">
        <span className="news-date">[{n.date}]</span>
        {n.isNew && <span className="tag-new">NEW</span>}
      </div>
      <p className="news-text">{n.text}</p>
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

export function ProfileFooter({ t }: { t: Content }) {
  return (
    <footer className="profile-foot">
      <a className="btn-pixel" href={pathFor(t.lang, 'home')}>
        <Crescent />
        BACK HOME
      </a>
      <Credit lang={t.lang} />
    </footer>
  );
}
