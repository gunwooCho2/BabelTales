import React, {useCallback, useRef, useState} from 'react';
import "@/styles/main/dictionary.scss"
import { MdScreenSearchDesktop } from "react-icons/md";
import axios from "axios";

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
    const [result, setResult] = useState([])

    const fetchData = async () => {
        const inputData = textValue.trim();
        if (inputData === "") {
            alert("텍스트가 비어있습니다.");
            return;
        }
        console.log(inputData);
        try {
            const response = await axios.get("http://localhost:8080/util/dictionary", {
                params: { word: inputData },
                headers: {
                    'Content-Type': 'text/plain'
                },
            });
            console.log(response.data);
            setResult(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    const iconClickHandler = () => {
        if (isIcon) {
            fetchData();
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

    const inputTextAreaRef = useRef(null);
    const [textValue, setTextValue] = useState("");
    const inputValue = useCallback((e) => {
        setTextValue(e.target.value)
    }, [])

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
                <input type="text" className="dictionary_input" placeholder="한글 단어 입력"
                       ref={inputTextAreaRef} value={textValue}
                       onChange={inputValue}
                       onMouseDown={(e) => e.stopPropagation()}
                ></input>
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
                    {result.map((item, index) => {
                        const part = item.p;
                        return item.w.map((word, i) => (
                            <tr key={`${index}-${i}`}>
                                <th scope="row" className="result_part">{part}</th>
                                <td className="result_word">{word}</td>
                            </tr>
                        ));
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dictionary;