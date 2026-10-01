import type { Content } from './types';
import { ADVISOR_URL, CAL_PAPER, CQUPT_URL, ISCT_URL } from './shared';

// The Chinese side is written for a business audience and is not a translation of en.ts.
const CQUPT_LAB = '重庆邮电大学电子证据与数据保全实验室 · 中国，重庆';

const zh: Content = {
  lang: 'zh',
  htmlLang: 'zh-Hans',
  meta: {
    homeTitle: '郑林峰的主页',
    profileTitle: '个人资料 · 郑林峰',
    newsTitle: '新闻 · 郑林峰',
    description: '郑林峰，东京科学大学（原东京工业大学）博士生。',
  },
  nameChip: '郑林峰',
  nameLocal: '郑林峰',
  role: '博士生 · 东京科学大学',
  roleShort: '博士生 · 东京科学大学',
  windows: {
    news: { message: '论文被IEEE CAL录用！', read: '阅读(R)', later: '稍后(L)' },
    paper: {
      status: '已发表',
      venue: 'IEEE CAL 2026',
      open: '打开(O)',
      alt: '论文首页：Improving Indirect Branch Prediction in Interpreters via Hardware/Software Co-Design（Linfeng Zheng, Hiroshi Sasaki）',
    },
    contact: { message: '点击邮件按钮与我联系！', mail: '发邮件(M)', tooltip: '给我发邮件' },
  },
  ui: {
    close: '关闭',
    reopen: '重新打开所有窗口',
    moonTitle: '点一下月亮',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    minimizeMenu: '收起菜单',
    restoreMenu: '展开菜单',
    home: '回到首页',
    languages: '语言',
    copy: '复制',
    copied: '已复制',
  },
  about: [
    ['我目前在', { text: '东京科学大学', href: ISCT_URL.en }, '（原东京工业大学）攻读信息与通信工程博士学位，硕士也毕业于该校。'],
    [
      '我的研究方向是提升软件（尤其是Web应用）在现代高性能CPU上的运行速度，目前主要研究分支预测和解释器。导师是',
      { text: '佐々木　広教授', href: ADVISOR_URL.en },
      '。',
    ],
    ['来东工大读硕士之前，我在', { text: '重庆邮电大学', href: CQUPT_URL }, '软件工程学院取得了学士学位。'],
  ],
  news: [
    { date: '2026.09.23', text: '论文被IEEE CAL录用，信息更新', isNew: true },
    { date: '2024.02.24', text: 'UI和信息更新' },
    { date: '2023.10.19', text: '信息更新' },
    { date: '2021.09.22', text: '个人主页已经开放！' },
  ],
  publications: [{ ...CAL_PAPER, status: '已发表' }],
  education: {
    degrees: [
      { degree: '博士', year: '2027', expected: true, field: '信息与通信工程', school: '东京科学大学（原东京工业大学）' },
      { degree: '硕士', year: '2023', field: '信息与通信工程', school: '东京工业大学（现东京科学大学）' },
      { degree: '学士', year: '2020', field: '软件工程', school: '重庆邮电大学' },
    ],
    expectedNote: '* 预计毕业',
  },
  experience: [
    {
      period: '2024.01–2024.11',
      title: '网页前端开发',
      org: 'MEDIA KOBO, INC. · 日本，东京',
      description: '线上占卜应用前端开发。',
    },
    {
      period: '2019.06–2020.12',
      title: '研究助理',
      org: CQUPT_LAB,
      description: '神经网络信息安全防护模型',
    },
    {
      period: '2019.02–2019.10',
      title: '系统设计&算法实现',
      org: CQUPT_LAB,
      description: '开发了一个基于人脸识别的签到平台，该平台获得第八届“软件盛典”软通动力杯校园开发大赛一等奖。',
    },
    {
      period: '2018.07–2018.10',
      title: '算法设计和实现',
      org: CQUPT_LAB,
      description: '为《重庆日报》理论舆情系统开发了一套自然语言处理算法，该平台在2018年9月在重庆文博会展览。',
    },
    {
      period: '2017.07–2017.12',
      title: '网页后端开发',
      org: CQUPT_LAB,
      description: '为Gluster分布式文件系统开发可视化管理系统。',
    },
  ],
  contact: { message: '点击邮件按钮与我联系！', eat: '今天吃什么？' },
};

export default zh;
