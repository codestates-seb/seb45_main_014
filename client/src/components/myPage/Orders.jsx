import { styled } from 'styled-components';
import formatDate from '../../utils/formatDate';
import Button from '../../assets/buttons/Button.jsx';
import PostReview from './PostReview.jsx';
import { useState } from 'react';
import { StoreImage } from '../../assets/Styles.jsx';

const OrdersImage = styled(StoreImage)`
  width: 200px;
  height: 200px;
  margin: 10px 0;
`;

const OrdersItem = ({ data, openModal }) => {
  const menuName = data.order_menus[0].menu_name;
  const menuLength = data.order_menus.length;
  const menuImage = data.order_menus[0].img;

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
