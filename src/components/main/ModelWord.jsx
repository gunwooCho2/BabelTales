import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import "@/styles/main/model.scss"

const ModelWord = ({item}) => {
    const [meanView, setMeanView] = useState(false)
    const mouseActive = useCallback(() => {
        setMeanView(true)
    }, [])

    const mouseInActive = useCallback(() => {
        setMeanView(false)
    }, [])

    return (
        <>
            <div className="model_word" onMouseDown={mouseActive} onMouseUp={mouseInActive}
                 onMouseLeave={mouseInActive}>{item.word}
                <div className={`model_mean ${meanView ? "model_mean_active" : ""}`}>{item.mean}</div>
            </div>
        </>
    );
};

ModelWord.propTypes = {
    item: PropTypes.shape({
        word: PropTypes.string,
        mean: PropTypes.string,
    })
}

export default ModelWord;