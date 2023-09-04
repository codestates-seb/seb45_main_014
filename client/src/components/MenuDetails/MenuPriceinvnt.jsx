import { useCountStore } from '../../store/store.js';

const MenuPriceinvnt = ({ menuData }) => {
  const price = menuData.price; // 문자열을 숫자로 변경
  const { count, up, down } = useCountStore();

  return (
    <div className="w-2/5 mx-auto text-left pl-6">
      <ul className="text-lg">
        <li className="h-8">가격 : {price.toLocaleString()}</li>
        <li>
          수량 :
          <button className="w-12 h-12 border" onClick={down}>
            -
          </button>
          {count.toLocaleString()}
          <button className="w-12 h-12 border" onClick={up}>
            +
          </button>
        </li>
        <li className="h-8">
          테이크아웃 시간 <button>1</button>
        </li>
        <li className="h-8">총 주문 금액 {(price * count).toLocaleString()}</li>
        <li className="h-8">장바구니에 담기</li>
      </ul>
    </div>
    // <div>
    //   <div className="flex">
    //     <span className="flex">가격 :</span>
    //     <div className="">{menuData.price.toLocaleString()}</div>
    //   </div>
    //   <div className="flex">
    //     <span className="">수량 :</span>
    //     <div className="flex">
    //       <button className="" onClick={down}>
    //         -
    //       </button>
    //       <div className="">{count.toLocaleString()}</div>
    //       <button className="" onClick={up}>
    //         +
    //       </button>
    //     </div>
    //   </div>
    //   <div className="flex">
    //     <span>픽업 시간</span>
    //     <div></div>
    //   </div>
    //   <div className="flex">
    //     <span className="">총 주문 금액 :</span>
    //     <div className="">{(price * count).toLocaleString()}</div>
    //   </div>
    //   <div>장바구니에 담기</div>
    // </div>
  );
};

export default MenuPriceinvnt;
