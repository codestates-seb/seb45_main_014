import React from 'react';
import { styled } from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200; /* 수정된 z-index 값 (더 큰 값) */
  cursor: pointer; /* 배경을 클릭 가능하도록 설정 */
`;

const ModalContent = styled.div`
  background-color: white;
  height: 150px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1001; /* 수정된 z-index 값 (더 큰 값) */
  h2 {
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 15px;
    font-size: 18px;
  }
`;

const CloseButton = styled.span`
  cursor: pointer;
  padding: 5px;
  border: 1px solid black;
  border-radius: 8px;

  &:hover {
    background-color: #debe8f;
  }
`;

const SuccessModal = ({ closeSuccessModal }) => {
  const handleBackgroundClick = () => {
    closeSuccessModal(); // 배경 클릭 시 closeSuccessModal 실행
  };

  const currentURL = window.location.href; // 현재 페이지의 URL 가져오기

  return (
    <ModalContainer onClick={handleBackgroundClick}>
      <ModalContent>
        <h2>장바구니 등록 완료</h2>
        <p>장바구니에 상품이 정상적으로 추가되었습니다.</p>
        <a href={currentURL}>
          <CloseButton>더 담으러 가기</CloseButton>
        </a>
      </ModalContent>
    </ModalContainer>
  );
};

export default SuccessModal;
