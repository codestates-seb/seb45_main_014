import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay } from '../../assets/Modal.jsx';
import Button from '../../assets/buttons/Button.jsx';
import { CancelButton } from './EditProfile.jsx';
import { useAuthStore } from '../../store/store.js';

const ImageUploadModal = ({ onClose }) => {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  const accessToken = useAuthStore((state) => state.accessToken);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', inputRef.current.files[0]); // input 태그를 통해 사용자가 선택한 첫 번째 파일

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/member/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      alert('이미지가 성공적으로 업로드되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handlePreview = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal>
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handleUpload}
        >
          <div className="w-64 h-64 border-2 border-black-100">
            {preview && (
              <img className="w-full h-full" src={preview} alt="미리보기" />
            )}
          </div>
          <input
            className="w-2/3"
            type="file"
            ref={inputRef}
            onChange={handlePreview}
          />
          <div className="flex gap-4">
            <Button type="submit">업로드</Button>
            <CancelButton type="button" onClick={onClose}>
              닫기
            </CancelButton>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ImageUploadModal;
