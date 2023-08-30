import { useCountStore } from '../../store/store.js';

const MenuPriceinvnt = () => {
  const price = 1000; // 문자열을 숫자로 변경
  const { count, up, down } = useCountStore();

  return (
    <div>
      <div className="flex justify-center">
        <span className="mr-36 mb-3">가격 :</span>
        <div className="ml-24">{price * count}</div>
      </div>
      <div className="flex justify-center">
        <span className="mr-36">수량</span>
        <div className="flex justify-center ml-20 mb-8">
          <button className="mr-2 bg-orange-600 w-6" onClick={up}>
            +
          </button>
          <div>{count}</div>
          <button className="ml-1 bg-orange-600 w-6" onClick={down}>
            -
          </button>
        </div>
      </div>
      <div>장바구니에 담기</div>
    </div>
  );
};

export default MenuPriceinvnt;
