import { React } from 'react';
import { useAuthStore, useCartItemStore } from '../../../store/store';
import toast from 'react-hot-toast';
import axios from 'axios';
import SubmitModal from '../../../pages/cart/SubmitModal.jsx';

const FalseModal = ({ closeFalseModal, dataId, quantity }) => {
  const { accessToken } = useAuthStore();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { setCartItem, setCheckItem, setStoreId } = useCartItemStore(
    (state) => state,
  );
  const notify = () => toast.success('장바구니에 추가 되었습니다.'); // 토스트 메시지 추가 함수 작성
  const handleAddToCart = async () => {
    try {
      const response = await axios
        .post(
          `${apiUrl}/api/cart/${dataId}?quantity=${quantity}&new_order=true`,
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => res.data.order);
      setCartItem(response.order_menus);
      setCheckItem(response.order_menus.map((item) => item.id));
      setStoreId(response.store_id);

      notify();
    } catch (error) {
      console.log('오류', error);
    } finally {
      closeFalseModal();
    }
  };

  const handleBackgroundClick = () => {
    closeFalseModal(); // 배경 클릭 시 closeSuccessModal 실행
  };

  return (
    <SubmitModal
      headline={`장바구니 등록 실패`}
      message={`다른 매장의 상품과 같이 담을 수 없습니다.`}
      secondMessage={`장바구니를 비우고 새로 추가 하시겠습니까?`}
      cancelLabel={`취소`}
      submitLabel={`담기`}
      onClose={handleBackgroundClick}
      onSubmit={handleAddToCart}
    />
  );

  // return (
  //   <ModalContainer onClick={handleBackgroundClick}>
  //     <ModalContent>
  //       <h2>장바구니 등록 실패</h2>
  //       <p>
  //         다른 매장의 상품과 같이 담을 수 없습니다.
  //         <p>장바구니를 비우고 새로 추가 하시겠습니까?</p>
  //       </p>
  //       <CloseButton onClick={handleAddToCart}>메뉴 담기</CloseButton>
  //     </ModalContent>
  //   </ModalContainer>
  // );
};

export default FalseModal;
