import { useState } from 'react';
import { useCountStore } from '../../store/store';
import { Link } from 'react-router-dom';

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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          onClick={closeModal}
        >
          <div className="relative bg-white w-[500px] h-[250px] p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              닫기
            </button>
            <div>
              <h2>{data.menu_name}</h2>
              <p>{data.menu_desc}</p>
              <div>가격: {data.price.toLocaleString()}원</div>
              <div>남은 수량: {data.stock}</div>
              <div>
                <span>주문수량</span>
                <button onClick={down}> - </button>
                <span>{count}</span>
                <button onClick={count < data.stock ? up : undefined}>+</button>
              </div>
              <div>
                총 결제 금액 : {(count * data.price).toLocaleString()} 원
              </div>
            </div>
            <button className="absolute right-[200px] bottom-3">
              장바구니에 담기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
