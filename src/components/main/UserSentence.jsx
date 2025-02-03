import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import "@/styles/main/user.scss"

const UserSentence = ({item}) => {
    return (
        <div className="user_container">
            <div className="user_sentence">
                {item.sentence}
            </div>
        </div>
    );
};

UserSentence.propTypes = {
    item : PropTypes.shape({
        model: PropTypes.bool.isRequired,
        sentence: PropTypes.string.isRequired,
        means: PropTypes.arrayOf(
            PropTypes.shape({
                mean: PropTypes.string
            })
        ),
        translate_sentence: PropTypes.string
    })
}

export default UserSentence;