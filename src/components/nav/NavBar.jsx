import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import "@/styles/nav/nav.scss"
import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";
import { GiWhiteBook } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
import NavItems from "./NavItems.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import { GiStarfighter } from "react-icons/gi";
import {useLocation, useNavigate} from "react-router-dom";
import {ModalContext} from "@/context/ModalContext.jsx";
import ConfirmModal from "@/components/modal/Confirm.jsx";
import Modal from "@/components/Modal.jsx";

const NavBar = ({createMenu, createTooltip, setNavSideActive}) => {
    const [side, setSide] = useState(false);
    const [navItemsData, setNavItemsData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get("http://localhost:8080/conversation")
    //         setNavItemsData(response.data);
    //     }
    //     fetchData().catch((error) => {console.log(error)});
    // },[])

    useEffect(() => {
        setNavItemsData([
            {
                date: "오늘",
                titles: [
                    {
                        title:"오늘의 날씨와 기분에 대한 긴 이야기",
                        conversationNo:1
                    },
                    {
                        title:"오늘 할 일 목록 - 예상보다 길어진 일정들",
                        conversationNo:2
                    },
                ],
            },
            {
                date: "어제",
                titles: [
                    {
                        title:"어제의 추억과 그 속에서 배운 교훈들",
                        conversationNo:3
                    },
                    {
                        title:"어제 본 영화 리뷰: 감동적이었던 순간들",
                        conversationNo:4
                    },
                ],
            },
            {
                date: "지난 7일",
                titles: [
                    {
                        title:"지난 7일간의 하이라이트: 시간이 빠르게 흐른 이유",
                        conversationNo:5
                    },
                    {
                        title:"주간 계획 요약: 성과와 문제점들에 대해",
                        conversationNo:6
                    },
                ],
            },
            {
                date: "지난 한 달",
                titles: [
                    {
                        title:"지난 한 달 동안 나의 성장과 변화",
                        conversationNo:7
                    },
                    {
                        title:"월간 독서 리스트: 기억에 남는 책들",
                        conversationNo:8
                    },
                ],
            },
            {
                date: "2024년",
                titles: [
                    {
                        title:"2024년 계획: 달성하고 싶은 목표들",
                        conversationNo:9
                    },
                    {
                        title:"올해 기억하고 싶은 특별한 이벤트들",
                        conversationNo:10
                    },
                ],
            },
            {
                date: "2023년",
                titles: [
                    {
                        title:"2023년 회고: 의미 있는 순간들과 성취들",
                        conversationNo:11
                    },
                    {
                        title:"작년 한 해 동안의 가장 큰 배움",
                        conversationNo:12
                    },
                ],
            },
            {
                date: "2022년",
                titles: [
                    {
                        title:"2023년 회고: 의미 있는 순간들과 성취들",
                        conversationNo:11
                    },
                    {
                        title:"작년 한 해 동안의 가장 큰 배움",
                        conversationNo:12
                    },
                ],
            },
        ]);
    },[])

    const createToolTipHandler = (e, message) => {
        if (side) createTooltip(<div className="toolTip" style={{top:`${e.target.getBoundingClientRect().y - 25}px`}}>{message}</div> )
    }

    const createToolTipSideLessHandler = (e, message) => {
        createTooltip(<div className="toolTip" style={{top:`${e.target.getBoundingClientRect().y - 25}px`}}>{message}</div> )
    }

    const deleteToolTipHandler = () => {
        createTooltip(<></>)
    }

    const scrollRef = useRef(null);
    const otherTaleRef = useRef(null);
    const [top, setTop] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const root = location.pathname;
    const otherMessages = [
        {
            key: "/r",
            component: <div className="nav-menu-item" style={{marginBottom: "0"}} onClick={() => {
                navigate("/r")
                window.location.reload()
            }}>
                <FaPencilAlt className="nav-menu-item-icon"></FaPencilAlt>
                <div className="nav-menu-item-text">릴레이 소설</div>
            </div>
        },
        {
            key: "/t",
            component: <div className="nav-menu-item" style={{marginTop: "0"}} onClick={() => {
                navigate("/t")
                window.location.reload()
            }}>
                <GiStarfighter className="nav-menu-item-icon" style={{color: "red"}}></GiStarfighter>
                <div className="nav-menu-item-text">TRPG</div>
            </div>
        },
        {
            key: "/",
            component: <div className="nav-menu-item" style={{marginBottom: "0"}} onClick={() => {
                navigate("/")
                window.location.reload()
            }}>
                <BiBook className="nav-menu-item-icon"></BiBook>
                <div className="nav-menu-item-text">대화</div>
            </div>
        }
    ]

    const createMenuHandler = (e) => {
        createMenu(e, <div className="nav-menu" style={{top: `${top + 10}px`}}>
            {otherMessages
                .filter(item => item.key !== root)
                .map(item => (
                        item.component
                ))
            }
        </div>);
    }

    const handleChildScroll = useCallback(() => {
        setTop(otherTaleRef.current.getBoundingClientRect().y);
    }, [otherTaleRef])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", handleChildScroll);
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", handleChildScroll);
            }
        };
    }, [handleChildScroll, scrollRef])

    const {modal, updateModal} = useContext(ModalContext);

    const newTaleClickHandler = () => {
        navigate(root)
        if (root !== "/") {
            updateModal(
                <Modal>
                    <ConfirmModal/>
                </Modal>
            )
        }
    }
    return (
        <nav className={side ? "nav-side-active" : ""} ref={scrollRef}>
            <div className="nav-header">
                <h1 className="header-text">Babel tales</h1>
                <div className="header-icon-box">
                    <CgPushChevronLeft className="header-inActive-icon" onClick={() => {
                        setSide(true)
                        setNavSideActive(true)
                    }} onMouseEnter={(e) => createToolTipSideLessHandler(e, "close menu")} onMouseLeave={deleteToolTipHandler}/>
                    <CgPushChevronRight className="header-active-icon" onClick={() => {
                        setSide(false)
                        setNavSideActive(false)
                    }} onMouseEnter={(e) => createToolTipHandler(e, "open menu")} onMouseLeave={deleteToolTipHandler}/>
                </div>
            </div>
            <div className="newTale-box-container ">
                <div className="newTale-box" onClick={newTaleClickHandler}>
                    <BiBook className="newTale-icon" onMouseEnter={(e) => createToolTipHandler(e, "New Tale")} onMouseLeave={deleteToolTipHandler}></BiBook>
                    <div className="newTale-text">New tale</div>
                </div>
                <div className="otherTale-box" onClick={createMenuHandler} ref={otherTaleRef}>
                    <GiWhiteBook className="otherTale-icon" onMouseEnter={(e) => createToolTipHandler(e, "Other Tale")} onMouseLeave={deleteToolTipHandler}></GiWhiteBook>
                    <div className="otherTale-text">Other tale</div>
                </div>
            </div>
            {navItemsData.map((item) => (
                <NavItems key={item.date} date={item.date} titles={item.titles} createMenu={createMenu} scrollRef={scrollRef}/>
            ))}
        </nav>
    );
};

NavBar.propTypes = {
    navItemsData: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            titles: PropTypes.arrayOf(
                PropTypes.shape({
                    conversationNo: PropTypes.number.isRequired,
                    title: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ),
};


export default NavBar;