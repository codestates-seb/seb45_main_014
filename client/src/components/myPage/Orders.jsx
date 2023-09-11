import { styled } from 'styled-components';
import formatDate from '../../utils/formatDate';
import Button from '../../assets/buttons/Button.jsx';
import PostReview from './PostReview.jsx';
import { useEffect, useState } from 'react';
import { StoreImage } from '../../assets/Styles.jsx';
import { RedButton } from '../../assets/buttons/RedButton.jsx';
import axios from 'axios';

const OrdersImage = styled(StoreImage)`
  width: 200px;
  height: 200px;
  margin: 10px 0;
`;

const OrdersItem = ({ data, openModal }) => {
  const menuName = data.order_menus[0].menu_name;
  const menuLength = data.order_menus.length;
  const menuImage = data.order_menus[0].img;

  // 주문 내역 삭제
  const deleteOrder = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/members/orders/${data.id}}`,
      );
      console.log(res);
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
      <RedButton className="w-full text-xs">주문 내역 삭제</RedButton>
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
