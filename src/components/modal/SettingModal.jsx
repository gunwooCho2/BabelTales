import React, {useCallback, useContext, useEffect, useState} from 'react';
import '@/styles/modal/SettingModal.scss';
import {IoMdSettings} from "react-icons/io";
import {FaCamera, FaExchangeAlt, FaRegCreditCard, FaUserShield} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {ModalContext} from "@/context/ModalContext.jsx";
import Alert from "@/components/modal/Alert.jsx";
import Modal from "@/components/Modal.jsx";
import {MdChangeCircle, MdOutlineChangeCircle} from "react-icons/md";
import ProfileChangeModal from "@/components/modal/ProfileChangeModal.jsx"; // 스타일은 따로 작성

const SettingModal = () => {
    const [activeTab, setActiveTab] = useState('일반');
    const {modal, updateModal} = useContext(ModalContext);
    const navItems = [
        { key: '일반', text: '일반', icon: <IoMdSettings /> },
        { key: '보안', text: '보안', icon: <FaUserShield /> },
        { key: '프로필', text: '프로필', icon: <CgProfile /> },
        { key: '결제', text: '결제', icon: <FaRegCreditCard /> },
    ];

    const allDelete = useCallback(() => {
        // 모든 메시지가 삭제되는 로직
        console.log("모든 메시지 삭제")
        updateModal(undefined)
        window.location.reload()
    }, [updateModal])

    const cancelMemberHandler = useCallback(() => {
        // 회원 탈퇴가 삭제되는 로직
        console.log("회원 탈퇴")
        updateModal(undefined)
        window.location.reload()
    }, [updateModal])
    
    const logoutHandler = () => {
        // 로그 아웃하는 로직
        console.log("로그아웃")
        window.location.reload()
    }

    const [idIcon, setIdIcon] = useState(<MdOutlineChangeCircle />)
    const [pwIcon, setPwIcon] = useState(<MdOutlineChangeCircle />)
    const [userIcon, setUserIcon] = useState("")

    useEffect(() => {
        setUserIcon("")
    }, [])

    const renderContent = () => {
        switch (activeTab) {
            case '일반':
                return (
                    <div className="tab-content">
                        <button className="btn logout" onClick={logoutHandler}>로그아웃</button>
                        <button className="btn allDelete" onClick={() => {
                            updateModal(
                                <Modal>
                                    <Alert message={"모든 메시지가 삭제됩니다 정말 삭제하시겠습니까?"} onCLick={allDelete}></Alert>
                                </Modal>
                            )
                        }}>모든 채팅 삭제</button>
                    </div>
                );
            case '보안':
                return (
                    <>
                        <div className="tab-content" style={{gap: "5px", top: "-15px"}}>
                            <div className="changeContainer">
                                <input type="text" className="changeInput" placeholder="아이디 변경"/>
                                <div className="changeIcon">
                                    {idIcon}
                                </div>
                            </div>
                            <div className="changeContainer">
                                <input type="text" className="changeInput" placeholder="비밀번호 변경"/>
                            </div>
                            <div className="changeContainer">
                                <input type="text" className="changeInput" placeholder="비밀번호 확인"/>
                                <div className="changeIcon">
                                    {pwIcon}
                                </div>
                            </div>
                        </div>
                        <button className="btn cancelMember" onClick={() => {
                            updateModal(
                                <Modal>
                                    <Alert message={"모든 회원 정보가 삭제됩니다. 정말 삭제하시겠습니까?"}
                                           onCLick={cancelMemberHandler}></Alert>
                                </Modal>
                            )
                        }}>회원 탈퇴
                        </button>
                    </>
                );
            case '프로필':
                return (
                    <div className="tab-content" style={{top: "-15px"}}>
                        <div className="userIcon" style={{backgroundImage: `url(${userIcon !== "" ? userIcon: "https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg"})`}}>
                            <div className="changeUserIcon" onClick={() => {
                                updateModal(
                                    <Modal>
                                        <ProfileChangeModal/>
                                    </Modal>
                                )
                            }}>
                                <FaCamera />
                            </div>
                        </div>
                        <div className="changeContainer">
                            <input type="text" className="changeInput" placeholder="유저 이름 변경"/>
                            <div className="changeIcon">
                                {pwIcon}
                            </div>
                        </div>
                    </div>
                );
            case '결제':
                return (
                    <div className="tab-content">
                        <p>결제 관련 내용 (자유롭게 작성)</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="setting-modal">
            <div className="modal-header">
                설정
            </div>
            <div className="modal-body">
                <nav className="modal-nav">
                    {navItems.map(item => (
                        <div
                            key={item.key}
                            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.key)}
                        >
                            <div className="nav-icon">{item.icon}</div>
                            <div className="nav-text">{item.text}</div>
                        </div>
                    ))}
                </nav>
                <div className="modal-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingModal;
