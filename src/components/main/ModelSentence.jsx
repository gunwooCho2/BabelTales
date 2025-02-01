import {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import ModelWord from "./ModelWord.jsx";
import "@/styles/main/model.scss"

const ModelSentence = ({item}) => {
    const [meanView, setMeanView] = useState(false)
    const mouseActive = useCallback(() => {
        setMeanView(true)
    }, [])

    const mouseInActive = useCallback(() => {
        setMeanView(false)
    }, [])
    const sentenceSplit = item.sentence.split(" ");
    return (
        <div className="model_sentence">
            {item.means.map((mean, i) => {
                return <ModelWord item={{word: sentenceSplit[i], mean: mean.mean}} key={i} />
            })}
            <div className="model_trans_btn" onMouseDown={mouseActive} onMouseUp={mouseInActive}
                 onMouseLeave={mouseInActive}>
                번역
                <div className={`model_trans_stc ${meanView ? "model_trans_stc_active" : ""}`}>{item.translate_sentence}</div>
            </div>
        </div>
    );
};

ModelSentence.propTypes = {
    item: PropTypes.shape({
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

export default ModelSentence;