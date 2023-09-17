import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { useAuthStore, useCartItemStore } from '../../store/store';
import toast from 'react-hot-toast';
import FalseModal from './modal/FalseModal.jsx';
import { useCartApi } from '../../api/cart';
import MenuModal from './modal/MenuModal.jsx';

const MenuItem = ({ data }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isFalseModalOpen, setIsFalseModalOpen] = useState(false);
  const [isCount, setIsCount] = useState(1);
  const { isLoggedIn, accessToken } = useAuthStore((state) => state);
  const { fetchCart } = useCartApi();
  const { setCartItem, setCheckItem } = useCartItemStore((state) => state);
  const [currentData, setCurrentData] = useState(null);
  const [currentCount, setCurrentCount] = useState(1);

  const notify = () => toast.error('제품이 품절 되었습니다.');
  const notifysuccess = () => toast.success('장바구니에 추가 되었습니다.');
  const notifynotlogin = () => toast.error('로그인 후 이용 가능합니다.');
  const menuModalClose = () => {
    setIsMenuModalOpen(false); // 메뉴모달 닫기
  };
  const menuModalOpen = () => {
    setIsMenuModalOpen(true); // 메뉴모달 열기
  };

  const openFalseModal = (data, count) => {
    setCurrentData(data);
    setCurrentCount(count);
    setIsFalseModalOpen(true);
  };
  const closeFalseModal = () => {
    setIsFalseModalOpen(false);
  };

  // 전부 닫기
  const allClose = () => {
    setIsFalseModalOpen(false);
    setIsMenuModalOpen(false);
  };

  const quantityUp = () => {
    const updatedCount = isCount + 1;
    if (updatedCount > data.stock) {
      toast.error('재고가 부족합니다.', {
        id: 'stock',
        duration: 3000,
      });
      return;
    }
    setIsCount(isCount + 1);
  };
  const quantityDown = () => {
    if (isCount > 1) {
      setIsCount(isCount - 1);
    }
  };

  const addToCart = async () => {
    const cartItem = { quantity: isCount };
    try {
      const response = await axios.post(
        `${apiUrl}/api/cart/${data.id}?quantity=${cartItem.quantity}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const statusData = response.status;
      const exception = response.headers['Bbangbbang_exception'];
      console.log(exception);
      if (statusData === 200 && exception === 904)
        openFalseModal(data, isCount);

      if (statusData === 200) {
        notifysuccess();
        setIsMenuModalOpen(false); // 모달을 닫도록 수정
      }

      const newData = await fetchCart().then((res) => res.order_menus);
      setCartItem(newData);
      // 기존에 있던 checkItem에 새로운 데이터의 id를 추가
      setCheckItem([...new Set([...newData.map((item) => item.id)])]);
    } catch (error) {
      console.log(error);
      notifynotlogin();
    }
  };

  return (
    <div className="flex px-[10px] py-[10px] border-b">
      <div>
        <div
          onClick={() => {
            if (data.stock > 0) {
              menuModalOpen();
            } else {
              notify();
            }
          }}
          className="cursor-pointer mb-2 overflow-hidden rounded-lg"
        >
          <StyledImage src={data.img} alt="메뉴 이미지" />
        </div>
        <div className="flex xl:space-x-36">
          <div>{data.price.toLocaleString()}원</div>
          <div>남은 수량: {data.stock}</div>
        </div>
      </div>
      <div className="w-[750px] px-6">
        <h3 className="text-[25px]">{data.menu_name}</h3>
        <div className="text-[18px] px-6 pt-3">{data.menu_desc}</div>
      </div>
      {isMenuModalOpen && (
        <MenuModal
          onClose={menuModalClose}
          onSubmit={addToCart}
          amount={isCount}
          quantityUp={quantityUp}
          quantityDown={quantityDown}
          data={data}
        />
      )}
      {isFalseModalOpen && (
        <FalseModal
          closeFalseModal={closeFalseModal}
          dataId={currentData.id}
          quantity={currentCount}
          allClose={allClose}
        />
      )}
    </div>
  );
};

const MenuTab = ({ menuData }) => {
  return (
    <div className="flex flex-col">
      {menuData.map((menu) => (
        <MenuItem key={menu.id} data={menu} />
      ))}
    </div>
  );
};

export default MenuTab;

const StyledImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
