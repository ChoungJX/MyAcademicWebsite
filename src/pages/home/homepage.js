import { Typography } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import CodeIcon from '@material-ui/icons/Code';
import MemoryIcon from '@material-ui/icons/Memory';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import HomePageContent from './content';


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.UILang = {
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
                Experience: {
                    title: "Experience"
                },
                Header: {
                    Language: "English"
                },
                Footer: {
                    content: (<Typography variant="body1">This page is built by <a href="https://v4.mui.com/">Material UI</a> based on <a href="https://reactjs.org/">React.js</a></Typography>),
                    button: "source code"
                }
            },
            "chinese": {
                AboutMe: {
                    title: "个人简介"
                },
                BasicInfo: {
                    update_time: "页面更新于：",
                    message: "请通过邮件与我联系！"
                },
                Education: {
                    title: "教育背景"
                },
                Experience: {
                    title: "项目经历"
                },
                Header: {
                    Language: "简体中文"
                },
                Footer: {
                    content: (<Typography variant="body1">本网页基于<a href="https://v4.mui.com/">Material UI</a>以及<a href="https://reactjs.org/">React.js</a>开发</Typography>),
                    button: "源代码"
                }
            }
        }

        this.data = {
            "english": {
                Language: "english",
                UpdatedTime: "September 26, 2021",
                Name: "Linfeng Zheng",
                Avatar: "/static/images/avatar.jpg",
                Email: "zhenglinfeng43@gmail.com",
                Github: "https://github.com/ChoungJX",
                AboutMe: (
                    <div>
                        I am studying for a master's degree in Information and Communications Engineering at <a href="https://www.titech.ac.jp/">Tokyo Institute of Technology</a>.
                        I am interested in computer architecture, operating systems, and web development.
                        <br />
                        Before studying at Tokyo Tech, I completed my bachelor’s in Software Engineering at <a href="https://www.cqupt.edu.cn">Chongqing University of Posts and Telecommunications</a>, where I worked on some projects related to big data and machine learning (NLP and Face Recognition) at CQUPT E-evidence Collection and Preservation laboratory.
                        <br />
                        Compared with studying the algorithm principle, I am more willing to know how the algorithm works on the low level of the computer system, and what could I do to make them run faster. This is why I turned to study computer architecture.
                    </div>
                ),
                Notification: [
                    { "date": "2021-09-22", "news": (<div>I joined the <a href="https://titech-caras.github.io/index-en.html">CARAS Lab@Tokyo Tech</a>!</div>) },
                    { "date": "2021-09-22", "news": "My home page is open!" },
                ],
                Education: [
                    {
                        "degree": "M.S. in Information and Communications Engineering, 2023 (expected)",
                        "school": "Tokyo Institute of Technology",
                        "icon": (<MemoryIcon />)
                    },
                    {
                        "degree": "B.S. in Software Engineering, 2020",
                        "school": "Chongqing University of Posts and Telecommunications",
                        "icon": (<BuildIcon />)
                    }
                ],
                Experience: [
                    {
                        "start_time": "Jun 2019",
                        "end_time": "Dec 2020",
                        "title": "Research Assistant",
                        "location": "CQUPT E-evidence Collection and Preservation laboratory",
                        "city": "Chongqing China",
                        "content": "Neural network information security protection model.",
                        "icon": (<SearchIcon />),
                        "color": "primary"
                    },
                    {
                        "start_time": "Feb 2019",
                        "end_time": "Oct 2019",
                        "title": "System Design & Algorithms Implementation",
                        "location": "CQUPT E-evidence Collection and Preservation laboratory",
                        "city": "Chongqing China",
                        "content": "Implemented a Face Recognition Platform that was won the first prize of the 8th iSoftstone cup campus development competition.",
                        "icon": (<CodeIcon />),
                        "color": "secondary"
                    },
                    {
                        "start_time": "Jul 2018",
                        "end_time": "Oct 2018",
                        "title": "Algorithms Design & Implementation",
                        "location": "CQUPT E-evidence Collection and Preservation laboratory",
                        "city": "Chongqing China",
                        "content": "Designed and implemented NLP algorithms for <Chongqing Daily> Public Sentiment System that was shown at Chongqing International Cultural Industries Fair in September 2018.",
                        "icon": (<CodeIcon />),
                        "color": "secondary"
                    },
                    {
                        "start_time": "Jul 2017",
                        "end_time": "Dec 2017",
                        "title": "Back-end Develop",
                        "location": "CQUPT E-evidence Collection and Preservation laboratory",
                        "city": "Chongqing China",
                        "content": "Developed visual management system for Gluster distributed file system.",
                        "icon": (<CodeIcon />),
                        "color": "secondary"
                    },
                ]
            },
            "chinese": {
                Language: "chinese",
                UpdatedTime: "2021年9月26日",
                Name: "郑林峰的主页",
                Avatar: "/static/images/avatar.jpg",
                Email: "zhenglinfeng43@gmail.com",
                Github: "https://github.com/ChoungJX",
                AboutMe: (
                    <div>
                        我正在<a href="https://www.titech.ac.jp/">东京工业大学</a>情報通信系攻读硕士学位。
                        <br />
                        我对计算机体系结构，操作系统以及web开发抱有浓厚的兴趣。
                        <br />
                        在东工大读硕士之前，我在<a href="https://www.cqupt.edu.cn">重庆邮电大学</a>软件工程学院获得了学士学位。
                        <br />
                        比起研究算法本身，我更想弄清算法在底层到底是如何运行的，以及该如何优化它们使得它们能运行得更快。为此，我转向学习计算机体系架构。
                    </div>
                ),
                Notification: [
                    { "date": "2021-09-22", "news": (<div>我加入了 <a href="https://titech-caras.github.io/index-en.html">CARAS实验室@东工大</a>!</div>) },
                    { "date": "2021-09-22", "news": "个人主页已经开放！" },
                ],
                Education: [
                    {
                        "degree": "工学硕士学位，信息与通信工程专业，预计2023年毕业",
                        "school": "东京工业大学",
                        "icon": (<MemoryIcon />)
                    },
                    {
                        "degree": "工学学士学位，软件工程专业，2020年毕业",
                        "school": "重庆邮电大学",
                        "icon": (<BuildIcon />)
                    }
                ],
                Experience: [
                    {
                        "start_time": "2019年6月",
                        "end_time": "2020年12月",
                        "title": "研究助理",
                        "location": "重庆邮电大学电子证据与数据保全实验室",
                        "city": "中国，重庆",
                        "content": "神经网络信息安全防护模型",
                        "icon": (<SearchIcon />),
                        "color": "primary"
                    },
                    {
                        "start_time": "2019年2月",
                        "end_time": "2019年10月",
                        "title": "系统设计&算法实现",
                        "location": "重庆邮电大学电子证据与数据保全实验室",
                        "city": "中国，重庆",
                        "content": "开发了一个基于人脸识别的签到平台，该平台获得第八届“软件盛典”软通动力杯校园开发大赛一等奖。",
                        "icon": (<CodeIcon />),
                        "color": "secondary"
                    },
                    {
                        "start_time": "2018年7月",
                        "end_time": "2018年10月",
                        "title": "算法设计和实现",
                        "location": "重庆邮电大学电子证据与数据保全实验室",
                        "city": "中国，重庆",
                        "content": "为《重庆日报》理论舆情系统开发了一套自然语言处理算法，该平台在2018年9月在重庆文博会展览。",
                        "icon": (<CodeIcon />),
                        "color": "secondary"
                    },
                    {
                        "start_time": "2017年7月",
                        "end_time": "2017年12月",
                        "title": "后端开发",
                        "location": "重庆邮电大学电子证据与数据保全实验室",
                        "city": "中国，重庆",
                        "content": "为Gluster分布式文件系统开发可视化管理系统。",
                        "icon": (<CodeIcon />),
                        "color": "secondary"
                    },
                ]
            }
        }

        this.state = {
            content: this.data["english"],
            ui_lang: this.UILang["english"]
        }
    }

    handleLanguageButtonClick(language) {
        this.setState({
            content: this.data[language],
            ui_lang: this.UILang[language]
        });
    }

    render() {
        const { content, ui_lang } = this.state;

        return (
            <HomePageContent data={content} Language={ui_lang} switchLanguage={(language) => this.handleLanguageButtonClick(language)} />
        )
    }
}