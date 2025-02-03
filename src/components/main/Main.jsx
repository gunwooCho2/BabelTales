import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import "@/styles/main/main.scss"
import "@/styles/Modal.scss"
import ModelSentence from "./ModelSentence.jsx";
import UserSentence from "./UserSentence.jsx";
import { FaUserFriends } from "react-icons/fa";
import {IoMdChatboxes, IoMdSettings} from "react-icons/io";
import Friend from "./Friend.jsx";
import Dictionary from "@/components/main/Dictionary.jsx";
import {ModalContext} from "@/context/ModalContext.jsx";
import Modal from "@/components/Modal.jsx";
import SettingModal from "@/components/modal/SettingModal.jsx";

const Main = () => {
    const [inputContainerHeight, setInputContainerHeight] = useState("100px");
    const [component, setComponent] = useState(<></>);
    const inputTextAreaRef = useRef(null);
    const {modal, updateModal} = useContext(ModalContext);
    const dummyData = {
        model:true,
        sentence: "This is a dummy statement for React development. This is a dummy statement for React development.",
        means: [
            {
                mean: "이것"
            },
            {
                mean: "~은(는)"
            },
            {
                mean: "하나의"
            },
            {
                mean: "더미"
            },
            {
                mean: "문장"
            },
            {
                mean: "~을 위한"
            },
            {
                mean: "리액트"
            },
            {
                mean: "개발"
            },
            {
                mean: "이것"
            },
            {
                mean: "~은(는)"
            },
            {
                mean: "하나의"
            },
            {
                mean: "더미"
            },
            {
                mean: "문장"
            },
            {
                mean: "~을 위한"
            },
            {
                mean: "리액트"
            },
            {
                mean: "개발"
            }
        ],
        translate_sentence:"이것은 리액트 개발용 더미 문장입니다."
    }
    const [sentences, setSentences] = useState([dummyData]);

    const inputValue = useCallback((e) => {
        inputTextAreaRef.current.style.height = "auto";
        const height = Math.min(inputTextAreaRef.current.scrollHeight, 200);
        console.log(height);
        setInputContainerHeight(`${height + 52}px`);
        inputTextAreaRef.current.style.height = height + "px";
        setTextValue(e.target.value)
    }, [])

    const inputKeyDown = useCallback((e) => {
        if (e.keyCode === 13 && textValue.trim() !== "") {
            e.preventDefault();
            console.log(textValue)
            const inputValue = e.target.value;
            setSentences((prevSentences) => [...prevSentences, {model:false,sentence: inputValue, means: null, translate_sentence: null}]);
        //  이후 서버에 데이터를 받아오는 로직으로 변경하여야함.
            setSentences((prevSentences) => [...prevSentences, dummyData]);
            setTextValue("");
        }
    }, [dummyData])

    const conversationContainer = useRef(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        if (!conversationContainer.current) return;

        const observer = new MutationObserver(() => {
            const isScrollbarVisible =
                conversationContainer.current.scrollHeight > conversationContainer.current.clientHeight;
            setHasScrollbar(isScrollbarVisible);
        });

        observer.observe(conversationContainer.current, {
            attributes: true,
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    const [textValue, setTextValue] = useState("");
    const clear = (e) => {
        if (!e.target.closest(".friend_container")) {
            setComponent(<></>)
        }
    }

    return (
        <div className="mainContainer" onClick={(e) => clear(e)}>
            <div className="inputContainer" style={{height: inputContainerHeight}}>
                <textarea className="input-textArea" placeholder="let me know your tale" ref={inputTextAreaRef} value={textValue}
                          onChange={inputValue} onKeyDown={inputKeyDown}></textarea>
            </div>
            <div ref={conversationContainer} className="conversationContainer">
                <div className="outputContainer" style={{marginLeft: hasScrollbar ? "17px" : ""}}>
                    {sentences.map((item, i) => {
                        if (item.model) return <ModelSentence item={item} key={i} />;
                        else return <UserSentence item={item} key={i} />;
                    })}
                </div>
                <div className="menuContainer">
                    <FaUserFriends  className="bookIcon" onClick={() => {
                        setTimeout(() => {
                            setComponent(<Friend></Friend>)
                        }, 0)}}/>
                    <IoMdChatboxes className="bookIcon" />
                    <IoMdSettings className="bookIcon" onClick={() => {
                        setTimeout(() => {
                            setComponent(undefined)
                            updateModal(<Modal>
                                <SettingModal />
                            </Modal>)
                        }, 0)}}/>
                </div>
                {component}
            </div>
            <Dictionary/>
        </div>
    );
};

export default Main;