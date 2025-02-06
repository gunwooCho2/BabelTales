
import "@/styles/nav/nav.scss"
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";


const NavMenu = ({conversationNo, menuRef, scrollRef, createMenu}) => {
    const [top, setTop] = useState(menuRef.current.getBoundingClientRect().y - 350);
    const changeTitleHandler = async (title) => {
        try {
            await axios.put(`http://localhost:8080/conversation/title/${conversationNo}`, title, {
                headers: {
                    'Content-Type': 'text/plain'
                },
                withCredentials: true
            })
            alert("타이틀 변경 완료.")
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTitleHandler = async (e) => {
        try {
            await axios.delete(`http://localhost:8080/conversation/${conversationNo}`, {withCredentials: true});
            alert("타이틀 삭제 완료.")
            createMenu(e, <></>)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChildScroll = useCallback(() => {
        setTop(menuRef.current.getBoundingClientRect().y);
    }, [menuRef])

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

    return (
        <div className="nav-menu" style={{top: `${top + 10}px`}}>
            <div className="nav-menu-item" style={{marginBottom: "0"}} onClick={(e) => changeTitleHandler(e)}>
                <FaPencilAlt className="nav-menu-item-icon"></FaPencilAlt>
                <div className="nav-menu-item-text">타이틀 변경</div>
            </div>
            <div className="nav-menu-item" style={{marginTop: "0"}} onClick={(e) => deleteTitleHandler(e)}>
                <FaTrash className="nav-menu-item-icon" style={{color:"red"}}></FaTrash>
                <div className="nav-menu-item-text" style={{color:"red"}}>삭제</div>
            </div>
        </div>
    );
};

export default NavMenu;