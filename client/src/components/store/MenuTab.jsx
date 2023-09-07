import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';

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

export const MenuItem = ({ data }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  console.log('메뉴 데이터', data);
  const [isCount, setIsCount] = useState(1);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = () => {
    // POST 요청에 필요한 데이터를 객체로 만듭니다.
    const cartItem = {
      quantity: isCount,
      new_order: 'true',
    };

    // 서버에 POST 요청을 보내기 위해 addToCartItem 함수 호출
    addToCartItem(cartItem);
  };

  const addToCartItem = async (cartItem) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/cart/${data.id}?quantity=${cartItem.quantity}&new_order=${cartItem.new_order}`,
        cartItem,
      );
      console.log('주문 완료', response.data);
    } catch (error) {
      console.error('주문 실패', error);
    }
  };

  return (
    <div className="flex p-[10px] border-b">
      <div className="w-[750px]">
        <h3 className="text-[25px]">{data.menu_name}</h3>
        <div className="text-[15px]">{data.menu_desc}</div>
      </div>
      <div>
        <div onClick={openModal} className="cursor-pointer mb-2">
          <img
            className="w-[300px] h-[200px] object-cover rounded-lg"
            src={data.img}
            alt="메뉴 이미지"
          ></img>
        </div>
        <div className="flex space-x-36">
          <div>{data.price.toLocaleString()}원</div>
          <div>남은 수량: {data.stock}</div>
        </div>
      </div>
      {isModalOpen && (
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
  z-index: 9999;
  background-color: rgba(76, 76, 76, 0.5);
`;
