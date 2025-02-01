
import "@/styles/nav/nav.scss"
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {useCallback, useEffect, useState} from "react";


const NavMenu = ({conversationNo, menuRef, scrollRef}) => {
    const [top, setTop] = useState(menuRef.current.getBoundingClientRect().y);
    const changeTitleHandler = () => {
        //변경 로직 넣어야함.
        console.log(conversationNo)
    }

    const deleteTitleHandler = () => {
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
            <div className="nav-menu-item" style={{marginBottom: "0"}} onClick={changeTitleHandler}>
                <FaPencilAlt className="nav-menu-item-icon"></FaPencilAlt>
                <div className="nav-menu-item-text">타이틀 변경</div>
            </div>
            <div className="nav-menu-item" style={{marginTop: "0"}} onClick={deleteTitleHandler}>
                <FaTrash className="nav-menu-item-icon" style={{color:"red"}}></FaTrash>
                <div className="nav-menu-item-text" style={{color:"red"}}>삭제</div>
            </div>
        </div>
    );
};

export default NavMenu;