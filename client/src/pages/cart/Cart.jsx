import { styled } from 'styled-components';
import Button from '../../assets/buttons/Button.jsx';
import CheckBox from '../../components/cart/Checkbox.jsx';
import CartItem from './CartItem.jsx';
import orderData from '../../assets/data/orderData.js';
import { useState } from 'react';

const ShoppingCart = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CartItems = styled.div`
  width: 65%;
  display: block;
`;

const CartMenu = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 18px 10px 16px 2px;
  font-size: 14px;
  line-height: 26px;
  align-items: center;
`;

const Total = styled.div`
  width: 30%;
  position: relative;
  padding-top: 60px;
  span {
    font-size: 18px;
    line-height: 24px;
    white-space: nowrap;
  }
`;

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #f9d4b1;
  background-color: #fcf6e6;
`;

const TotalItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  &:first-child {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

//장바구니 안에 있는 아이템을 제거하는 함수
// const removeItem = (id) => {
//   const newItems = items.filter((item) => item.id !== id);
//   setItems(newItems);
// };

const Cart = () => {
  const [item, setItem] = useState(orderData);
  const menuName = item[0].order_menus[0].menu_name;
  const storeName = item[0].store_name;

  return (
    <section className="max-w-screen-lg mx-auto">
      <h1 className="pt-[50px] pb-[30px] text-center">장바구니</h1>
      <ShoppingCart>
        <CartItems>
          <CartMenu>
            <CheckBox />
            <span className="pr-[40px]">전체선택</span>
            <button>선택삭제</button>
          </CartMenu>
          아이템 들어가는 곳
          <CartItem menuName={menuName} storeName={storeName} />
        </CartItems>
        <Total>
          <TotalBox>
            <TotalItem>
              <span>상품 총 금액</span>
              <span>원</span>
            </TotalItem>
            <TotalItem>
              <span>픽업 시간</span>
            </TotalItem>
            <Button fontsize="16px">주문하기</Button>
          </TotalBox>
        </Total>
      </ShoppingCart>
    </section>
  );
};

export default Cart;
