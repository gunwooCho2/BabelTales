import {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import ModelWord from "./ModelWord.jsx";
import "@/styles/main/model.scss"
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const ModelSentence = ({item}) => {
    const [meanView, setMeanView] = useState(false)
    const mouseActive = useCallback(() => {
        setMeanView(true)
    }, [])

    const mouseInActive = useCallback(() => {
        setMeanView(false)
    }, [])
    const sentenceSplit = item.sentence.split(" ");
    const sentenceHandler = () => {
        if (item.model_trans) {
            return <>
                {item.means.map((mean, i) => {
                    return <ModelWord item={{word: sentenceSplit[i], mean: mean.mean}} key={i}/>
                })}
                <div className="model_trans_btn" onMouseDown={mouseActive} onMouseUp={mouseInActive}
                     onMouseLeave={mouseInActive}>
                    번역
                    <div
                        className={`model_trans_stc ${meanView ? "model_trans_stc_active" : ""}`}>{item.translate_sentence}</div>
                </div>
            </>
        } else {
            const shapeWord = item.sentence.split(" ");
            return <>
                {shapeWord.map((word, i) => {
                    return <div className="model_word_inActive" key={i}>{word}</div>
                })}
                <div className="loading">
                    <AiOutlineLoading3Quarters />
                </div>
            </>
        }
    }
    return (
        <div className="model_sentence">
            {sentenceHandler()}
        </div>
    );
};

ModelSentence.propTypes = {
    item: PropTypes.shape({
        role: PropTypes.string.isRequired,
        sentenceNo: PropTypes.number.isRequired,
        model_trans: PropTypes.bool,
        profile: PropTypes.string,
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