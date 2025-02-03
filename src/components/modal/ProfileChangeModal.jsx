import React, { useState } from 'react';
import "@/styles/modal/ProfileChangeModal.scss";

const ProfileChangeModal = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleConfirm = () => {
        if (selectedImage) {
            console.log("이미지 변경");
        } else {
            alert('이미지를 선택해주세요.');
        }
    };

    return (
            <div className="profile-modal">
                <div className="modal-header">
                    <h2>프로필 변경</h2>
                </div>
                <div className="modal-content">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="프로필 미리보기"
                            className="profile-preview"
                        />
                    ) : (
                        <div className="upload-placeholder">
                            <p>이미지를 선택해주세요.</p>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />

                    <button className="confirm-button" onClick={handleConfirm}>
                        확인
                    </button>
                </div>
            </div>
    );
};

export default ProfileChangeModal;
