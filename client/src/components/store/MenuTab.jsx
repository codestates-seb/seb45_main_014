import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import SuccessModal from './modal/SuccessModal.jsx';
import FalseModal from './modal/FalseModal.jsx';
import axios from 'axios';

const MenuTab = ({ menuData }) => {
  const [isFalseModalOpen, setIsFalseModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  {
    /*장바구니 추가 완료 모달*/
  }
  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  {
    /* 장바구니 추가  실패 모달*/
  }
  const openFalseModal = () => {
    setIsFalseModalOpen(true);
  };

  const closeFalseModal = () => {
    setIsFalseModalOpen(false);
  };

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

      {/* SuccessModal 열기 */}
      {isSuccessModalOpen && (
        <SuccessModal closeSuccessModal={closeSuccessModal} />
      )}

      {/* FalseModal 열기 */}
      {isFalseModalOpen && <FalseModal closeFalseModal={closeFalseModal} />}
    </div>
  );
};

export default MenuTab;

export const MenuItem = ({ data, openFalseModal, openSuccessModal }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isCount, setIsCount] = useState(1);

  {
    /*메뉴 상세 모달*/
  }

  const openModal = () => {
    setIsMenuModalOpen(true);
  };

  const closeModal = () => {
    setIsMenuModalOpen(false);
  };

  const addToCart = () => {
    // POST 요청에 필요한 데이터를 객체로 만듭니다.
    const cartItem = {
      quantity: isCount,
    };

    // 서버에 POST 요청을 보내기 위해 addToCartItem 함수 호출
    addToCartItem(cartItem);
  };

  const addToCartItem = async (cartItem) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/cart/${data.id}?quantity=${cartItem.quantity}`,
        cartItem,
      );
      const headerData = response.headers;
      const statusCode = headerData.status;

      if (statusCode === 200) {
        openSuccessModal();
      } else {
        openFalseModal();
      }
    } catch (error) {
      console.error('주문 실패', error);
    }
  };

  return (
    <div className="flex p-[10px] border-b">
      <div className="xl:w-[750px]">
        <h3 className="xl:text-[25px]">{data.menu_name}</h3>
        <div className="xl:text-[15px]">{data.menu_desc}</div>
      </div>
      <div>
        <div
          onClick={openModal}
          className="cursor-pointer mb-2 overflow-hidden rounded-lg"
        >
          <StyledImage src={data.img} alt="메뉴 이미지"></StyledImage>
        </div>
        <div className="flex xl:space-x-36">
          <div>{data.price.toLocaleString()}원</div>
          <div>남은 수량: {data.stock}</div>
        </div>
      </div>
      {isMenuModalOpen && (
        <ModalBg
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal(); // 배경 클릭 시에만 모달 닫기 함수 호출
            }
          }}
        >
          <div className="relative bg-white w-[500px] h-[350px] p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 p-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              닫기
            </button>
            <div className="p-3">
              <h2 className="mb-1">{data.menu_name}</h2>
              <p className="w-[450px] h-[100px] py-2 px-2 mb-2 border">
                {data.menu_desc}
              </p>
              <div>가격 : {data.price.toLocaleString()}원</div>
              <div className="py-1">남은 수량 : {data.stock}</div>
              <div className="flex py-1">
                <span className="mr-1 pt-[5px]">주문수량</span>
                <button
                  className="w-[32px] border rounded-lg pt-1"
                  onClick={() => {
                    if (isCount > 1) {
                      setIsCount(isCount - 1);
                    }
                  }}
                >
                  -
                </button>
                <div className="w-[32px] pt-1 text-center">{isCount}</div>
                <button
                  className="w-[32px] border rounded-lg pt-1"
                  onClick={() => {
                    if (isCount < data.stock) {
                      setIsCount(isCount + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>
              <div className="flex py-2">
                <span>총 결제 금액 :</span>
                <div className="text-right w-[70px]">
                  {(isCount * data.price).toLocaleString()}
                </div>
              </div>
            </div>
            <button
              className="absolute right-[200px] bottom-3"
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
  transition: transform 0.3s ease; /* 확대 트랜지션 효과 추가 */

  &:hover {
    transform: scale(1.1); /* 이미지를 1.1배 확대 */
  }
`;
