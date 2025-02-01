import NavTitle from "./NavTitle.jsx";
import PropTypes from "prop-types";

const NavItems = ({date, titles, createMenu, scrollRef}) => {
    return (
        <div className="nav-items">
            <div className="item-date">{date}</div>
            {titles.map(title => (
               <NavTitle key={title.conversationNo} title={title} createMenu={createMenu} scrollRef={scrollRef}/>
            ))}
        </div>
    );
};

NavItems.propTypes = {
    date: PropTypes.string.isRequired,
    titles: PropTypes.arrayOf(
        PropTypes.shape({
            conversationNo: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NavItems;