import { styled } from 'styled-components';
import formatDate from '../../utils/formatDate';
import Button from '../../assets/buttons/Button.jsx';
import PostReview from './PostReview.jsx';
import { useEffect, useState } from 'react';
import { StoreImage } from '../../assets/Styles.jsx';
import { RedButton } from '../../assets/buttons/RedButton.jsx';
import axios from 'axios';
import { useAuthStore } from '../../store/store';
import SubmitModal from '../../pages/cart/SubmitModal.jsx';

const OrdersImage = styled(StoreImage)`
  width: 200px;
  height: 200px;
  margin: 10px 0;
`;

const OrdersItem = ({ data, openModal }) => {
  const menuName = data.order_menus[0].menu_name;
  const menuLength = data.order_menus.length;
  const menuImage = data.order_menus[0].img;

  const { accessToken } = useAuthStore((state) => state);

  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);

  // 모달 열기
  const openSubmitModal = () => {
    setSubmitModalOpen(true);
  };

  // 모달 닫기
  const closeSubmitModal = () => {
    setSubmitModalOpen(false);
  };

  // 주문 내역 삭제
  const deleteOrder = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/members/orders/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      closeSubmitModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <OrdersImage className="object-cover" src={menuImage} alt="loading" />
      <div className="flex flex-col w-full">
        <div>{data.store_name}</div>
        <div className="text-sm text-stone-500">
          {menuName}
          {menuLength > 1 ? ` 외 ${menuLength - 1}개` : ''}
        </div>
        <div className="text-sm text-stone-500">
          {formatDate(data.created_at)}
        </div>
      </div>
      <Button onClick={() => openModal(data)} className="w-full">
        리뷰 작성
      </Button>
      <RedButton onClick={openSubmitModal} className="w-full text-xs">
        주문 내역 삭제
      </RedButton>
      {isSubmitModalOpen && (
        <SubmitModal
          onClose={closeSubmitModal}
          onSubmit={deleteOrder}
          message="정말 주문 내역을 삭제하시겠어요?"
          cancelLabel="취소"
          submitLabel="확인"
        />
      )}
    </div>
  );
};

const Orders = ({ data }) => {
  const [currentModalData, setCurrentModalData] = useState(null);

  const openModal = (data) => setCurrentModalData(data);
  const closeModal = () => {
    const isConfirmed = window.confirm(
      '리뷰 작성을 취소하시겠습니까?\n작성하신 내용은 사라집니다.',
    );

    if (isConfirmed) setCurrentModalData(null);
  };

  if (data.length === 0)
    return (
      <h1 className="h-[50vh] flex items-center justify-center">
        주문하신 내역이 없습니다.
      </h1>
    );

  return (
    <div className="flex justify-center">
      <div className="grid grid-flow-row-dense grid-cols-4 gap-4">
        {data.map((item, index) => (
          <OrdersItem key={index} data={item} openModal={openModal} />
        ))}
      </div>
      {currentModalData && (
        <PostReview data={currentModalData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Orders;
