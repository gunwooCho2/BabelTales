import React from 'react';
import "@/styles/modal/Alert.scss"

const Alert = ({ message, onCLick }) => {
    return (
        <div className="alert-window">
            <div className="alert-content">
                <p>{message}</p>
                <button className="alert-close" onClick={onCLick}>확인</button>
            </div>
        </div>
    );
};

export default Alert;