import { React, useEffect } from 'react';
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
`;

const ModalContent = styled.div`
  background-color: white;
  height: 150px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1001; /* 수정된 z-index 값 (더 큰 값) */
`;

const CloseButton = styled.span`
  cursor: pointer;
`;

const FalseModal = ({ closeFalseModal }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <h2>장바구니 등록 실패</h2>
        <p>
          다른 매장의 상품과 같이 담을 수 없습니다. 장바구니를 비우고 새로 추가
          하시겠습니까?
        </p>
        <CloseButton onClick={closeFalseModal}>메뉴 담기</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default FalseModal;
