import { useState } from 'react';
import { useCountStore } from '../../store/store';
import { useParams, Link } from 'react-router-dom';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { count, up, down } = useCountStore();
  const { id } = useParams();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = () => {
    // POST 요청에 필요한 데이터를 객체로 만듭니다.
    const cartItem = {
      quantity: count,
      new_order: '주문',
    };

    // 서버에 POST 요청을 보내기 위해 addToCartItem 함수 호출
    addToCartItem(cartItem);
  };

  const addToCartItem = async (cartItem) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.post(`/api/cart/${id}`, cartItem);
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
        <div onClick={openModal}>
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
        <div
          className="fixed inset-0 flex items-center justify-center z-[9999] bg-[#4c4c4c] opacity-90"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal(); // 배경 클릭 시에만 모달 닫기 함수 호출
            }
          }}
        >
          <div className="relative bg-white w-[500px] h-[350px] p-4 rounded-lg shadow-lg ">
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
                  onClick={down}
                >
                  -
                </button>
                <div className="w-[32px] pt-1 text-center">{count}</div>
                <button
                  className="w-[32px] border rounded-lg pt-1"
                  onClick={count < data.stock ? up : undefined}
                >
                  +
                </button>
              </div>
              <div className="flex py-2">
                <span>총 결제 금액 :</span>
                <div className="text-right w-[70px]">
                  {(count * data.price).toLocaleString()}
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
        </div>
      )}
    </div>
  );
};
