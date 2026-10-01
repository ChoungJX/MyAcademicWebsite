import type { Content } from './types';
import { ADVISOR_URL, CAL_PAPER, CQUPT_URL, ISCT_URL, LAB_URL } from './shared';

// Based on the English version (tech-facing), written in です・ます体.
const CQUPT_LAB = 'CQUPT E-evidence Collection and Preservation Laboratory · 中国・重慶';

const ja: Content = {
  lang: 'ja',
  htmlLang: 'ja',
  meta: {
    homeTitle: '鄭林峰',
    profileTitle: 'プロフィール · 鄭林峰',
    newsTitle: 'ニュース · 鄭林峰',
    notFoundTitle: 'ページが見つかりません · 鄭林峰',
    description: '東京科学大学 博士課程の鄭林峰です。分岐予測とインタプリタの研究をしています。',
  },
  nameChip: '鄭林峰',
  nameLocal: '鄭林峰',
  role: '博士課程 · 東京科学大学',
  roleShort: '博士課程 · 東京科学大学',
  windows: {
    news: {
      message: 'IEEE Computer Architecture Letters (CAL) に論文が採録されました！',
      read: '読む(R)',
      later: 'あとで(L)',
    },
    paper: {
      status: '掲載済み',
      venue: 'IEEE CAL 2026',
      open: '開く(O)',
      alt: '論文の1ページ目：Improving Indirect Branch Prediction in Interpreters via Hardware/Software Co-Design（Linfeng Zheng, Hiroshi Sasaki）',
    },
    contact: { message: 'お気軽にご連絡ください！', mail: 'メールする(M)', tooltip: 'メールを送る' },
  },
  ui: {
    close: '閉じる',
    reopen: 'すべてのウィンドウを開き直す',
    moonTitle: '月をクリック',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    minimizeMenu: 'メニューをたたむ',
    restoreMenu: 'メニューを広げる',
    home: 'トップページへ',
    languages: '言語',
    copy: 'コピー',
    copied: 'コピーしました',
  },
  about: [
    [
      { text: '東京科学大学', href: ISCT_URL.ja },
      '（旧 東京工業大学）情報通信系の博士課程に在籍しており、修士号も同大学で取得しました。',
      { text: 'CARAS Lab', href: LAB_URL.ja },
      'の',
      { text: '佐々木 広', href: ADVISOR_URL.ja },
      '先生のもとでリサーチアシスタントを務めています。研究テーマは、ソフトウェア、特にWebアプリケーションを最新の高性能CPU上でより速く動かすことです。いまは分岐予測とインタプリタに取り組んでいます。',
    ],
    [
      '東工大に進学する前は、',
      { text: '重慶郵電大学', href: CQUPT_URL },
      'でソフトウェア工学の学士号を取得しました。在学中は CQUPT E-evidence Collection and Preservation Laboratory で、自然言語処理や顔認識など、ビッグデータと機械学習に関するプロジェクトに携わりました。',
    ],
  ],
  news: [
    { date: '2026.09.23', text: 'IEEE Computer Architecture Letters (CAL) に論文が採録されました。', isNew: true },
    { date: '2024.02.24', text: 'UIと情報を更新しました。' },
    { date: '2023.10.19', text: '情報を更新しました。' },
    { date: '2021.09.22', text: 'ホームページを公開しました！' },
  ],
  publications: [{ ...CAL_PAPER, status: '掲載済み' }],
  education: {
    degrees: [
      { degree: '博士課程', year: '2027', expected: true, field: '情報通信系', school: '東京科学大学（旧 東京工業大学）' },
      { degree: '修士', year: '2023', field: '情報通信系', school: '東京工業大学（現 東京科学大学）' },
      { degree: '学士', year: '2020', field: 'ソフトウェア工学', school: '重慶郵電大学' },
    ],
    expectedNote: '* 修了見込み',
  },
  experience: [
    {
      period: '2024.01–2024.11',
      title: 'Webフロントエンド開発',
      org: 'MEDIA KOBO, INC. · 東京',
      description: 'オンラインチャットアプリケーションのWebフロントエンド開発。',
    },
    {
      period: '2019.06–2020.12',
      title: 'リサーチアシスタント',
      org: CQUPT_LAB,
      description: 'ニューラルネットワークの情報セキュリティ保護モデル。',
    },
    {
      period: '2019.02–2019.10',
      title: 'システム設計・アルゴリズム実装',
      org: CQUPT_LAB,
      description: '顔認識プラットフォームを開発し、第8回 iSoftstone Cup キャンパス開発コンテストで一等賞を受賞しました。',
    },
    {
      period: '2018.07–2018.10',
      title: 'アルゴリズム設計・実装',
      org: CQUPT_LAB,
      description:
        '重慶日報の世論分析システム向けに自然言語処理アルゴリズムを設計しました。2018年9月の重慶国際文化産業博覧会で展示されました。',
    },
    {
      period: '2017.07–2017.12',
      title: 'Webバックエンド開発',
      org: CQUPT_LAB,
      description: '分散ファイルシステム Gluster の可視化管理システムを開発しました。',
    },
  ],
  contact: { message: 'お気軽にご連絡ください！', eat: '今日なに食べる？' },
  notFound: { heading: 'ページが見つかりません', body: 'このアドレスには何もありません。' },
};

export default ja;
