import React, {useState} from 'react';
import "@/styles/main/dictionary.scss"
import { MdScreenSearchDesktop } from "react-icons/md";

const Dictionary = () => {
    const [position, setPosition] = useState({
        bottom: 60,
        right: 60,
    });

    const [isIcon, setIsIcon] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [mousePoint, setMousePoint] = useState({
        x: 0,
        y: 0,
    })

    const containerMouseDownHandler = (e) => {
        if (isIcon) {
            setIsClick(true)
            setMousePoint({
                x: e.clientX,
                y: e.clientY,
            })
        }
        else setIsIcon(true)
    }

    const containerMouseMoveHandler = (e) => {
        if (isClick) {
            const x = e.clientX - mousePoint.x;
            const y = e.clientY - mousePoint.y;
            setMousePoint({ x: e.clientX, y: e.clientY });
            setPosition((prev) => ({
                bottom: prev.bottom - y,
                right: prev.right - x,
            }));
        }
    }

    const containerMouseUpHandler = () => {
        setIsClick(false)
    }

    window.addEventListener("mouseup", containerMouseUpHandler);
    const [result, setResult] = useState({
        test: []
    })

    const dummyData = {
        test: [
            { part: "동사", word: "test" },
            { part: "명사", word: "test" },
            { part: "형용사", word: "test" },
            { part: "감탄사", word: "test" },
            { part: "동사", word: "test" },
            { part: "명사", word: "test" },
            { part: "형용사", word: "test" },
            { part: "감탄사", word: "test" },
        ],
    };

    const iconClickHandler = () => {
        if (isIcon) {
            setResult(dummyData);
        }
        else setIsIcon(true);
    }

    const minimizeClickHandler = () => {
        setIsIcon(false)
        setPosition({
            bottom: 60,
            right: 60,
        })
    }

    return (
        <div className={isIcon ? "dictionary_container_active" : "dictionary_container"} style={{
            bottom: `${position.bottom}px`,
            right: `${position.right}px`,
        }}
             onMouseDown={containerMouseDownHandler}
             onMouseMove={containerMouseMoveHandler}
        >
            <div className="dictionary_bar">
                <div className="bar_minimize" onClick={minimizeClickHandler}>
                </div>
            </div>
            <div className="dictionary_input_container">
                <input type="text" className="dictionary_input" placeholder="한글 단어 입력"></input>
                <div className="icon_container" onClick={iconClickHandler}>
                    <MdScreenSearchDesktop style={{cursor: 'pointer'}} />
                </div>
            </div>
            <div className="result_container">
                <table style={{width:'100%'}}>
                    <thead>
                    <tr>
                        <th scope="col">Part</th>
                        <th scope="col">Word</th>
                    </tr>
                    </thead>
                    <tbody>
                    {result.test.map((item, index) => (
                        <tr key={index}>
                            <th scope="row" className="result_part">{item.part}</th>
                            <td className="result_word">{item.word}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dictionary;