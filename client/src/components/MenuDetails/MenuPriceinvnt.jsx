import { useCountStore } from '../../store/store.js';

const MenuPriceinvnt = ({ menuData }) => {
  const price = menuData.price; // 문자열을 숫자로 변경
  const { count, up, down } = useCountStore();

  return (
    <div>
      <div className="flex justify-center">
        <span className="mr-6">가격 :</span>
        <div className="ml-6 w-28 text-right">
          {(price * count).toLocaleString()}
        </div>
      </div>
      <div className="flex justify-center">
        <span className="mr-30 space-x-6">수량</span>
        <div className="flex justify-center ml-20 mb-8">
          <button
            className="mr-2 bg-orange-600 w-6 h-6 flex justify-center items-center"
            onClick={up}
          >
            +
          </button>
          <div className="w-8 text-center">{count.toLocaleString()}</div>
          <button
            className="ml-1 bg-orange-600 w-6 h-6 flex justify-center items-center"
            onClick={down}
          >
            -
          </button>
        </div>
      </div>
      <div>장바구니에 담기</div>
    </div>
  );
};

export default MenuPriceinvnt;
