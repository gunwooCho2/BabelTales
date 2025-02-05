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
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {useLocation, useNavigate} from "react-router-dom";

const Main = ({R}) => {
    const [inputContainerHeight, setInputContainerHeight] = useState("100px");
    const [component, setComponent] = useState(<></>);
    const inputTextAreaRef = useRef(null);
    const {modal, updateModal} = useContext(ModalContext);
    const [sentences, setSentences] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [textValue, setTextValue] = useState("");
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const conversationNo = queryParams.get("t");
    const navigate = useNavigate();

    const inputValue = useCallback((e) => {
        inputTextAreaRef.current.style.height = "auto";
        const height = Math.min(inputTextAreaRef.current.scrollHeight, 200);
        setInputContainerHeight(`${height + 52}px`);
        inputTextAreaRef.current.style.height = height + "px";
        setTextValue(e.target.value)
    }, [])

    const inputKeyDown = useCallback((e) => {
        const inputValue = textValue.trim();
        if (e.keyCode === 13 && inputValue !== "") {
            e.preventDefault();
            const sendData = {
                sentence: inputValue,
                first: conversationNo === null,
            }
            stompClient.send(`/app/conversation/${conversationNo === null ? "-1" : conversationNo}`, {}, JSON.stringify(sendData));
            setTextValue('');
        }
    }, [stompClient, textValue])

    const conversationContainer = useRef(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            stomp.subscribe('/user/topic/sentence', (msg) => {
                const receivedMessage = JSON.parse(msg.body);
                console.log(receivedMessage);
                setSentences(prev => [...prev, receivedMessage]);
            });
            setStompClient(stomp);
        }, (error) => {
            console.error('웹소켓 연결 실패:', error);
            navigate("/login")
        });

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

        return () => {
            observer.disconnect();
            if (stomp) stomp.disconnect();
        }
    }, []);

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
                        if (item.role === "model") return <ModelSentence item={item} key={i} />;
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