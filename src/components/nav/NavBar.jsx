import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import "@/styles/nav/nav.scss"
import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";
import { GiWhiteBook } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
import NavItems from "./NavItems.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import {FaPencilAlt} from "react-icons/fa";
import { GiStarfighter } from "react-icons/gi";
import {useLocation, useNavigate} from "react-router-dom";
import {ModalContext} from "@/context/ModalContext.jsx";
import ConfirmModal from "@/components/modal/Confirm.jsx";
import Modal from "@/components/Modal.jsx";
import {UpdateContext} from "@/context/UpdateContext.jsx";

const NavBar = ({createMenu, createTooltip, setNavSideActive}) => {
    const [side, setSide] = useState(false);
    const [navItemsData, setNavItemsData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const {modal, updateModal} = useContext(ModalContext);
    const {reRender, updateComponent} = useContext(UpdateContext);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const tno = queryParams.get("t");
    const dno = queryParams.get("d");
    const change = queryParams.get("change");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (location.pathname === "/") response = await axios.get('http://10.100.201.77:8080/conversation/', { withCredentials: true });
                setNavItemsData(response.data);
            } catch (e) {
                console.error(e);
                navigate("/login");
            }
        };

        fetchData();
    }, [tno, dno]);

    const createToolTipHandler = (e, message) => {
        if (side) createTooltip(<div className="toolTip" style={{top:`${e.target.getBoundingClientRect().y - 370}px`}}>{message}</div> )
    }

    const createToolTipSideLessHandler = (e, message) => {
        createTooltip(<div className="toolTip" style={{top:`${e.target.getBoundingClientRect().y - 370}px`}}>{message}</div> )
    }

    const deleteToolTipHandler = () => {
        createTooltip(<></>)
    }

    const scrollRef = useRef(null);
    const otherTaleRef = useRef(null);
    const [top, setTop] = useState(0);
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
        createMenu(e, <div className="nav-menu" style={{top: `${top - 250}px`}}>
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
            {navItemsData && navItemsData.length > 0 && navItemsData.map((item) => (
                <NavItems
                    key={item.date}
                    date={item.date}
                    titles={item.titles}
                    createMenu={createMenu}
                    scrollRef={scrollRef}
                />
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