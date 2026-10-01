import type { Content } from './types';
import { ADVISOR_URL, CAL_PAPER, CQUPT_URL, ISCT_URL, LAB_URL } from './shared';

const CQUPT_LAB = 'CQUPT E-evidence Collection and Preservation Laboratory · Chongqing, China';

const en: Content = {
  lang: 'en',
  htmlLang: 'en',
  meta: {
    homeTitle: 'Linfeng Zheng',
    profileTitle: 'Profile · Linfeng Zheng',
    newsTitle: 'News · Linfeng Zheng',
    description:
      'Linfeng Zheng, PhD student at Institute of Science Tokyo (CARAS Lab), working on branch prediction and interpreters.',
  },
  nameChip: 'Linfeng Zheng',
  nameLocal: '郑林峰',
  role: 'PHD STUDENT · SCIENCE TOKYO',
  roleShort: 'PHD · SCIENCE TOKYO',
  windows: {
    news: {
      message: 'Paper accepted to IEEE Computer Architecture Letters (CAL)!',
      read: 'Read(R)',
      later: 'Later(L)',
    },
    paper: {
      status: 'PUBLISHED',
      venue: 'IEEE CAL 2026',
      open: 'Open(O)',
      alt: 'First page of the paper: Improving Indirect Branch Prediction in Interpreters via Hardware/Software Co-Design, by Linfeng Zheng and Hiroshi Sasaki',
    },
    contact: { message: 'Feel free to contact me!', mail: 'Mail me(M)', tooltip: 'Send me an email' },
  },
  ui: {
    close: 'Close',
    reopen: 'Reopen all windows',
    moonTitle: 'Click the moon',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    minimizeMenu: 'Minimize menu',
    restoreMenu: 'Restore menu',
    home: 'Back to the home page',
    languages: 'Language',
    copy: 'COPY',
    copied: 'COPIED',
  },
  about: [
    [
      'I am a PhD student in Information and Communications Engineering at ',
      { text: 'Institute of Science Tokyo', href: ISCT_URL.en },
      " (formerly Tokyo Institute of Technology), where I also received my master's degree. I work as a research assistant at ",
      { text: 'CARAS Lab', href: LAB_URL.en },
      ' under ',
      { text: 'Dr. Hiroshi Sasaki', href: ADVISOR_URL.en },
      '. My research is about making software, especially web applications, run faster on modern high-performance CPUs. Right now I focus on branch prediction and interpreters.',
    ],
    [
      "Before coming to Tokyo Tech, I earned my bachelor's degree in Software Engineering from ",
      { text: 'Chongqing University of Posts and Telecommunications', href: CQUPT_URL },
      '. I worked on big data and machine learning projects, including NLP and face recognition, at the CQUPT E-evidence Collection and Preservation Laboratory.',
    ],
  ],
  news: [
    { date: '2026.09.23', text: 'Paper accepted to IEEE Computer Architecture Letters (CAL).', isNew: true },
    { date: '2024.02.24', text: 'Updated the UI and information.' },
    { date: '2023.10.19', text: 'Updated information.' },
    { date: '2021.09.22', text: 'My home page is open!' },
  ],
  publications: [{ ...CAL_PAPER, status: 'PUBLISHED' }],
  education: {
    degrees: [
      {
        degree: 'PhD',
        year: '2027',
        expected: true,
        field: 'Information and Communications Engineering',
        school: 'Institute of Science Tokyo (formerly Tokyo Institute of Technology)',
      },
      {
        degree: 'M.S.',
        year: '2023',
        field: 'Information and Communications Engineering',
        school: 'Tokyo Institute of Technology (now Institute of Science Tokyo)',
      },
      {
        degree: 'B.S.',
        year: '2020',
        field: 'Software Engineering',
        school: 'Chongqing University of Posts and Telecommunications',
      },
    ],
    expectedNote: '* expected',
  },
  experience: [
    {
      period: '2024.01–2024.11',
      title: 'Web Front-end Development',
      org: 'MEDIA KOBO, INC. · Tokyo, Japan',
      description: 'Web front-end development for an online chat application.',
    },
    {
      period: '2019.06–2020.12',
      title: 'Research Assistant',
      org: CQUPT_LAB,
      description: 'Neural network information security protection model.',
    },
    {
      period: '2019.02–2019.10',
      title: 'System Design & Algorithms Implementation',
      org: CQUPT_LAB,
      description:
        'Built a face recognition platform that won first prize at the 8th iSoftstone Cup campus development competition.',
    },
    {
      period: '2018.07–2018.10',
      title: 'Algorithms Design & Implementation',
      org: CQUPT_LAB,
      description:
        'Designed NLP algorithms for the Chongqing Daily public sentiment system, shown at the Chongqing International Cultural Industries Fair in September 2018.',
    },
    {
      period: '2017.07–2017.12',
      title: 'Web Back-end Development',
      org: CQUPT_LAB,
      description: 'Developed a visual management system for the Gluster distributed file system.',
    },
  ],
  contact: { message: 'Feel free to contact me!', eat: 'What do we eat today?' },
};

export default en;
