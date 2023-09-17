import { styled } from 'styled-components';
import formatDate from '../../../utils/formatDate';
import Button from '../../../assets/buttons/Button.jsx';
import { StoreImage } from '../../../assets/Styles.jsx';
import { RedButton } from '../../../assets/buttons/RedButton.jsx';
import SubmitModal from '../../../pages/cart/SubmitModal.jsx';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrdersImage = styled(StoreImage)`
  width: 200px;
  height: 200px;
  margin: 10px 0;
`;

const OrderDetail = ({ data, openModal, accessToken }) => {
  const menuName = data.order_menus?.[0]?.menu_name;
  const menuLength = data.order_menus?.length;
  const menuImage = data.order_menus?.[0]?.img;

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
  const deleteOrder = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/members/orders/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Link to={`/stores/${data.store_id}`}>
        <OrdersImage className="object-cover" src={menuImage} alt="loading" />
        <div className="flex flex-col w-full">
          <div>{data.store_name}</div>
          <div className="text-sm text-stone-500">
            {menuName}
            {menuLength > 1 ? ` 외 ${menuLength - 1}개` : ''}
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-stone-500">
              {formatDate(data.created_at)}
            </div>
            <div className="text-sm text-stone-500">{data.order_status}</div>
          </div>
        </div>
      </Link>
      <div className="flex w-full">
        <div className="w-2/3">
          {data.order_status === '픽업' && (
            <Button onClick={() => openModal(data)} className="w-full">
              리뷰 작성
            </Button>
          )}
        </div>
        <RedButton onClick={openSubmitModal} className="w-1/3 text-xs">
          삭제
        </RedButton>
      </div>
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

export default OrderDetail;
