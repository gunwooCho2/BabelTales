import React, {useContext} from 'react';
import "@/styles/Modal.scss"
import {ModalContext} from "@/context/ModalContext.jsx";

const Modal = ({children}) => {
    const {modal, updateModal} = useContext(ModalContext);

    const clickHandler = () => {
        updateModal(undefined)
    }
    return (
        <div className="modalContainer" onClick={() => clickHandler()}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;