import {useEffect, useRef, useState} from 'react';
import {AiOutlineMore} from "react-icons/ai";
import PropTypes from "prop-types";
import NavMenu from "./NavMenu.jsx";

const NavTitle = ({title, createMenu, scrollRef}) => {
    const [selectTitle, setSelectTitle] = useState(1);
    const menuRef = useRef(null);
    const createMenuHandler = (e) => {
        createMenu(e, <NavMenu conversationNo={title.conversationNo} menuRef={menuRef} scrollRef={scrollRef} />);
    }

    return (
        <>
            <div className={`item-title ${selectTitle === title.conversationNo ? "item-title-select" : ""}`}>
                <div className="title-text">{title.title}</div>
                <div ref={menuRef} className="title-menu">
                    <AiOutlineMore onClick={(e) => createMenuHandler(e)}/>
                </div>
            </div>
        </>
    );
};

NavTitle.propTypes = {
    title: PropTypes.shape({
        conversationNo: PropTypes.number,
        title: PropTypes.string,
    }).isRequired,
    createMenu: PropTypes.func,
    scrollRef: PropTypes.object,
};

export default NavTitle;