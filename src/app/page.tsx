'use client'

import React, { useState } from 'react';
import { Typography } from '@mui/joy';
import MemoryTwoToneIcon from '@mui/icons-material/MemoryTwoTone';
import CodeIcon from '@mui/icons-material/Code';
import WysiwygTwoToneIcon from '@mui/icons-material/WysiwygTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone';
import FaceRetouchingNaturalTwoToneIcon from '@mui/icons-material/FaceRetouchingNaturalTwoTone';
import AbcTwoToneIcon from '@mui/icons-material/AbcTwoTone';
import HomePageContent from '@/components/Home';

function HomePage() {
  const UILangList = {
    "english": {
      AboutMe: {
        title: "About Me"
      },
      BasicInfo: {
        update_time: "Updated on:",
        message: "Feel free to contact me!"
      },
      Education: {
        title: "Education"
      },
      Publication: {
        title: "Publications"
      },
      Experience: {
        title: "Experience"
      },
      Header: {
        Language: "English"
      },
      Footer: {
        content: (<Typography component='p'>This page is built by <a style={{ borderBottom: '1px solid #454746' }} href="https://mui.com/material-ui/">Material UI</a> with <a style={{ borderBottom: '1px solid #454746' }} href="https://reactjs.org/">React.js</a></Typography>),
        button: "source code"
      }
    },
    "chinese": {
      AboutMe: {
        title: "个人简介"
      },
      BasicInfo: {
        update_time: "页面更新于：",
        message: "点击邮件按钮与我联系！"
      },
      Education: {
        title: "教育背景"
      },
      Publication: {
        title: "论文发表",
      },
      Experience: {
        title: "项目经历"
      },
      Header: {
        Language: "简体中文",
      },
      Footer: {
        content: (<Typography>本网页基于<a style={{ borderBottom: '1px solid #454746' }} href="https://mui.com/material-ui/">Material UI</a>以及<a style={{ borderBottom: '1px solid #454746' }} href="https://reactjs.org/">React.js</a>开发</Typography>),
        button: "源代码"
      }
    }
  }

  const data = {
    "english": {
      Language: "english",
      UpdatedTime: "February 24, 2024",
      HeaderTitle: "Linfeng's Page",
      Name: "Linfeng Zheng",
      Avatar: "/static/images/avatar.jpg",
      Email: "zheng.l.ab@m.titech.ac.jp",
      Github: "https://github.com/ChoungJX",
      AboutMe: (
        <div>
          I received my Master's degree and am currently pursuing my PhD in Information and Communications Engineering at <a style={{ borderBottom: '1px solid #454746' }} href="https://www.titech.ac.jp/">Tokyo Institute of Technology</a>.
          I am interested in diverse research topics that optimize software performance (especially for web applications) for modern high-performance CPUs across diverse computing environments. Now, I am a research assistant supervised by <a style={{ borderBottom: '1px solid #454746' }} href="https://hiroshi-sasaki.github.io/index-en.html">Dr. Hiroshi Sasaki</a> at <a style={{ borderBottom: '1px solid #454746' }} href="https://titech-caras.github.io/index-en.html">CARAS Lab</a>.
          <br />
          Before studying at Tokyo Tech, I completed my bachelor’s in Software Engineering at <a style={{ borderBottom: '1px solid #454746' }} href="https://www.cqupt.edu.cn">Chongqing University of Posts and Telecommunications</a>, where I worked on some projects related to big data and machine learning (NLP and Face Recognition) at CQUPT E-evidence Collection and Preservation laboratory.
        </div>
      ),
      Notification: [
        { "date": "2024-02-24", "news": "Update UI and information" },
        { "date": "2021-09-22", "news": "My home page is open!" },
      ],
      Education: [
        {
          "degree": "PhD in Information and Communications Engineering, 2026 (expected)",
          "school": "Tokyo Institute of Technology",
          "icon": (<MemoryTwoToneIcon sx={{ fontSize: "40px" }} />)
        },
        {
          "degree": "M.S. in Information and Communications Engineering, 2023",
          "school": "Tokyo Institute of Technology",
          "icon": (<MemoryTwoToneIcon sx={{ fontSize: "40px" }} />)
        },
        {
          "degree": "B.S. in Software Engineering, 2020",
          "school": "Chongqing University of Posts and Telecommunications",
          "icon": (<WysiwygTwoToneIcon sx={{ fontSize: "40px" }} />)
        }
      ],
      Experience: [
        {
          "start_time": "Jan 2024",
          "end_time": "Present",
          "title": "Web Front-end Development",
          "location": "MEDIA KOBO, INC.",
          "city": "Tokyo Japan",
          "content": "Web front-end development for an online chat application.",
          "icon": (<CodeIcon style={{ color: '#444746' }} />),
          "color": "primary"
        },
        {
          "start_time": "Jun 2019",
          "end_time": "Dec 2020",
          "title": "Research Assistant",
          "location": "CQUPT E-evidence Collection and Preservation laboratory",
          "city": "Chongqing China",
          "content": "Neural network information security protection model.",
          "icon": (<SearchIcon style={{ color: '#444746' }} />),
          "color": "primary"
        },
        {
          "start_time": "Feb 2019",
          "end_time": "Oct 2019",
          "title": "System Design & Algorithms Implementation",
          "location": "CQUPT E-evidence Collection and Preservation laboratory",
          "city": "Chongqing China",
          "content": "Implemented a Face Recognition Platform that was won the first prize of the 8th iSoftstone cup campus development competition.",
          "icon": (<FaceRetouchingNaturalTwoToneIcon style={{ color: '#444746' }} />),
          "color": "secondary"
        },
        {
          "start_time": "Jul 2018",
          "end_time": "Oct 2018",
          "title": "Algorithms Design & Implementation",
          "location": "CQUPT E-evidence Collection and Preservation laboratory",
          "city": "Chongqing China",
          "content": "Designed and implemented NLP algorithms for <Chongqing Daily> Public Sentiment System that was shown at Chongqing International Cultural Industries Fair in September 2018.",
          "icon": (<AbcTwoToneIcon style={{ color: '#444746' }} />),
          "color": "secondary"
        },
        {
          "start_time": "Jul 2017",
          "end_time": "Dec 2017",
          "title": "Web Back-end Development",
          "location": "CQUPT E-evidence Collection and Preservation laboratory",
          "city": "Chongqing China",
          "content": "Developed visual management system for Gluster distributed file system.",
          "icon": (<DataObjectTwoToneIcon style={{ color: '#444746' }} />),
          "color": "secondary"
        },
      ]
    },
    "chinese": {
      Language: "chinese",
      UpdatedTime: "2024年2月24日",
      HeaderTitle: "郑林峰的主页",
      Name: "郑林峰",
      Avatar: "/static/images/avatar.jpg",
      Email: "zheng.l.ab@m.titech.ac.jp",
      Github: "https://github.com/ChoungJX",
      AboutMe: (
        <div>
          我在<a style={{ borderBottom: '1px solid #454746' }} href="https://www.titech.ac.jp/">东京工业大学</a>情報通信系获得了硕士学位并在继续攻读博士学位。
          <br />
          我对软件性能优化的各种主题感兴趣，并致力于优化跨不同计算环境的软件性能（特别是Web应用）。我的指导老师是<a style={{ borderBottom: '1px solid #454746' }} href="https://hiroshi-sasaki.github.io/index-en.html">佐々木　広教授</a>。
          <br />
          在东工大读硕士之前，我在<a style={{ borderBottom: '1px solid #454746' }} href="https://www.cqupt.edu.cn">重庆邮电大学</a>软件工程学院获得了学士学位。
        </div>
      ),
      Notification: [
        { "date": "2024-02-24", "news": "UI和信息更新" },
        { "date": "2021-09-22", "news": "个人主页已经开放！" },
      ],
      Education: [
        {
          "degree": "工学博士学位，信息与通信工程专业，预计2026年毕业",
          "school": "东京工业大学",
          "icon": (<MemoryTwoToneIcon sx={{ fontSize: "40px" }} />)
        },
        {
          "degree": "工学硕士学位，信息与通信工程专业，2023年毕业",
          "school": "东京工业大学",
          "icon": (<MemoryTwoToneIcon sx={{ fontSize: "40px" }} />)
        },
        {
          "degree": "工学学士学位，软件工程专业，2020年毕业",
          "school": "重庆邮电大学",
          "icon": (<WysiwygTwoToneIcon sx={{ fontSize: "40px" }} />)
        }
      ],
      Experience: [
        {
          "start_time": "2024年1月",
          "end_time": "至今",
          "title": "网页前端开发",
          "location": "MEDIA KOBO, INC.",
          "city": "日本，东京",
          "content": "线上占卜应用前端开发。",
          "icon": (<CodeIcon style={{ color: '#444746' }} />),
          "color": "primary"
        },
        {
          "start_time": "2019年6月",
          "end_time": "2020年12月",
          "title": "研究助理",
          "location": "重庆邮电大学电子证据与数据保全实验室",
          "city": "中国，重庆",
          "content": "神经网络信息安全防护模型",
          "icon": (<SearchIcon style={{ color: '#444746' }} />),
          "color": "primary"
        },
        {
          "start_time": "2019年2月",
          "end_time": "2019年10月",
          "title": "系统设计&算法实现",
          "location": "重庆邮电大学电子证据与数据保全实验室",
          "city": "中国，重庆",
          "content": "开发了一个基于人脸识别的签到平台，该平台获得第八届“软件盛典”软通动力杯校园开发大赛一等奖。",
          "icon": (<FaceRetouchingNaturalTwoToneIcon style={{ color: '#444746' }} />),
          "color": "secondary"
        },
        {
          "start_time": "2018年7月",
          "end_time": "2018年10月",
          "title": "算法设计和实现",
          "location": "重庆邮电大学电子证据与数据保全实验室",
          "city": "中国，重庆",
          "content": "为《重庆日报》理论舆情系统开发了一套自然语言处理算法，该平台在2018年9月在重庆文博会展览。",
          "icon": (<AbcTwoToneIcon style={{ color: '#444746' }} />),
          "color": "secondary"
        },
        {
          "start_time": "2017年7月",
          "end_time": "2017年12月",
          "title": "网页后端开发",
          "location": "重庆邮电大学电子证据与数据保全实验室",
          "city": "中国，重庆",
          "content": "为Gluster分布式文件系统开发可视化管理系统。",
          "icon": (<DataObjectTwoToneIcon style={{ color: '#444746' }} />),
          "color": "secondary"
        },
      ]
    }
  }

  const [UILang, setUILang] = useState<object>(UILangList.english);
  const [showData, setShowData] = useState<object>(data.english);

  const handleLanguageButtonClick = (language: 'english' | 'chinese') => {
    setUILang(UILangList[language]);
    setShowData(data[language]);
  }

  return (
    <HomePageContent data={showData} Language={UILang} switchLanguage={(language: 'english' | 'chinese') => handleLanguageButtonClick(language)} />
  )

};

export default HomePage;