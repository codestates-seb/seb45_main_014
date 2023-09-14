import { React } from 'react';
import { styled } from 'styled-components';
import { useAuthStore } from '../../../store/store';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';

const FalseModal = ({ menuModalhandle, closeFalseModal, dataId, quantity }) => {
  const { accessToken } = useAuthStore();
  const apiUrl = process.env.REACT_APP_API_URL;
  const notify = () => toast.success('장바구니에 추가 되었습니다.'); // 토스트 메시지 추가 함수 작성
  const handleAddToCart = () => {
    axios
      .post(
        `${apiUrl}/api/cart/${dataId}?quantity=${quantity}&new_order=true`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        console.log('정상 요청 완료', response.status);
        // Add any additional logic you want to perform after adding to cart here.
        notify();
        closeFalseModal();
        menuModalhandle();
      })
      .catch((error) => {
        console.log('오류', error);
      });

    window.location.reload();
  };

  const handleBackgroundClick = () => {
    closeFalseModal(); // 배경 클릭 시 closeSuccessModal 실행
  };

  return (
    <ModalContainer onClick={handleBackgroundClick}>
      <ModalContent>
        <h2>장바구니 등록 실패</h2>
        <p>
          다른 매장의 상품과 같이 담을 수 없습니다. 장바구니를 비우고 새로 추가
          하시겠습니까?
        </p>
        <CloseButton onClick={handleAddToCart}>메뉴 담기</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default FalseModal;

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
