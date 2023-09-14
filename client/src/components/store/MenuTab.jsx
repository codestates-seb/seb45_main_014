import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { useAuthStore } from '../../store/store';

import SuccessModal from './modal/SuccessModal.jsx';
import FalseModal from './modal/FalseModal.jsx';

const MenuTab = ({ menuData }) => {
  const [isFalseModalOpen, setIsFalseModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [currentCount, setCurrentCount] = useState(1);

  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const openFalseModal = (data, count) => {
    setCurrentData(data);
    setCurrentCount(count);
    setIsFalseModalOpen(true);
  };
  const closeFalseModal = () => setIsFalseModalOpen(false);

  return (
    <div className="flex flex-col">
      {menuData.map((menu) => (
        <MenuItem
          key={menu.id}
          data={menu}
          openSuccessModal={openSuccessModal}
          openFalseModal={openFalseModal}
        />
      ))}

      {isSuccessModalOpen && (
        <SuccessModal closeSuccessModal={closeSuccessModal} />
      )}
      {isFalseModalOpen && (
        <FalseModal
          closeFalseModal={closeFalseModal}
          dataId={currentData.id}
          quantity={currentCount}
        />
      )}
    </div>
  );
};

export default MenuTab;

const MenuItem = ({ data, openFalseModal, openSuccessModal }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isCount, setIsCount] = useState(1);
  const { isLoggedIn, accessToken } = useAuthStore((state) => state);

  const openMenuModal = () => setIsMenuModalOpen(true);
  const closeMenuModal = () => setIsMenuModalOpen(false);

  const addToCart = () => {
    const cartItem = { quantity: isCount };

    axios
      .post(
        `${apiUrl}/api/cart/${data.id}?quantity=${cartItem.quantity}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        const statusData = response.status;
        const exception = response.headers['Bbangbbang_exception'];
        console.log(exception);
        if (statusData === 200) {
          openSuccessModal();
        }
      })
      .catch((error) => {
        console.log('500에러', error);
        openFalseModal(data, isCount);
      });
  };

  if (!isLoggedIn || !accessToken) {
    alert('로그인이 필요합니다.');
    return;
  }

  return (
    <div className="flex p-[10px] border-b">
      <div className="xl:w-[750px]">
        <h3 className="xl:text-[25px]">{data.menu_name}</h3>
        <div className="xl:text-[15px]">{data.menu_desc}</div>
      </div>
      <div>
        <div
          onClick={() => {
            if (data.stock > 0) {
              openMenuModal();
            } else {
              alert('품절되었습니다.');
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
      {isMenuModalOpen && (
        <ModalBg
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMenuModal();
          }}
        >
          <div className="relative bg-white w-[500px] h-[350px] p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 p-4 text-gray-600 hover:text-gray-800"
              onClick={closeMenuModal}
            >
              닫기
            </button>
            <div className="p-3">
              <h2 className="mb-1">{data.menu_name}</h2>
              <p className="w-[450px] h-[100px] py-2 px-2 mb-2 border">
                {data.menu_desc}
              </p>
              <div>메뉴 가격 : {data.price.toLocaleString()}원</div>
              <div className="py-1">남은 수량 : {data.stock}</div>
              <div className="flex py-1 border-b pb-2">
                <span className="mr-1 pt-[5px]">주문 수량 </span>
                <button
                  className="w-[32px] border rounded-lg pt-1"
                  onClick={() => {
                    if (isCount > 1) setIsCount(isCount - 1);
                  }}
                >
                  -
                </button>
                <div className="w-[32px] pt-1 text-center">{isCount}</div>
                <button
                  className="w-[32px] border rounded-lg pt-1"
                  onClick={() => {
                    if (isCount < data.stock) setIsCount(isCount + 1);
                  }}
                >
                  +
                </button>
              </div>
              <div className="flex py-2 justify-end">
                <span>총 결제 금액 :</span>
                <div className="text-right w-[70px]">
                  {(isCount * data.price).toLocaleString()}원
                </div>
              </div>
            </div>
            <button
              className="absolute right-[200px] bottom-3 cursor-pointer"
              onClick={addToCart}
            >
              장바구니에 담기
            </button>
          </div>
        </ModalBg>
      )}
    </div>
  );
};

const ModalBg = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  background-color: rgba(76, 76, 76, 0.5);
`;

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
