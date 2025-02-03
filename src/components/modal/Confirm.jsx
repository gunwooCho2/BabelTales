import React, { useState } from 'react';
import "@/styles/modal/ConfirmModal.scss";

const ConfirmModal = ({ conform }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleConfirm = () => {
    conform(inputText);
  };

  return (
      <div className="confirm-modal">
        <h2>제목 입력</h2>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
          className="modal-input"
        />
        <button className="modal-confirm-button" onClick={handleConfirm}>
          확인
        </button>
      </div>
  );
};

export default ConfirmModal;
