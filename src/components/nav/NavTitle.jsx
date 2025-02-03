import {useEffect, useRef, useState} from 'react';
import {AiOutlineMore} from "react-icons/ai";
import PropTypes from "prop-types";
import NavMenu from "./NavMenu.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const NavTitle = ({title, createMenu, scrollRef}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const t = queryParams.get('t');
    const [selectTitle, setSelectTitle] = useState(0);
    const menuRef = useRef(null);
    const root = location.pathname;
    const createMenuHandler = (e) => {
        createMenu(e, <NavMenu conversationNo={title.conversationNo} menuRef={menuRef} scrollRef={scrollRef} />);
    }

    useEffect(() => {
        setSelectTitle(parseInt(t))
    }, [t])

    return (
        <>
            <div className={`item-title ${selectTitle === title.conversationNo ? "item-title-select" : ""}`}
            onClick={() => {
                console.log(`${root}?t=${title.conversationNo}`)
                navigate(`${root}?t=${title.conversationNo}`)
            }}>
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