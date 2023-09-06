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

const Cart = () => {
  const [item, setItem] = useState(orderData);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState(item);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, items) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, items]);
      console.log(checkItems);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el.id !== items.id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      setCheckItems(orderData);
      console.log(checkItems);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  // 체크박스에 포함된 아이템 삭제
  const handleDelete = () => {
    // 체크박스에 포함된 아이템을 제외한 배열 (필터)
    setItem(item.filter((el) => !checkItems.includes(el)));
    // 체크박스에 포함된 아이템을 제외한 배열 (필터)
    setCheckItems(checkItems.filter((el) => !checkItems.includes(el)));
  };

  // 총액 계산 함수
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const checkedItem of checkItems) {
      totalPrice += checkedItem.order_menus[0].price;
    }
    return totalPrice;
  };

  return (
    <section className="max-w-screen-lg mx-auto">
      <h1 className="pt-[50px] pb-[30px] text-center">장바구니</h1>
      <ShoppingCart>
        <CartItems>
          <CartMenu>
            <CheckBox
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={
                checkItems.length !== item.length || item.length === 0
                  ? false
                  : true
              }
            />
            <span className="pr-[40px]">
              전체선택 ({checkItems.length}/{item.length})
            </span>
            <button onClick={handleDelete}>선택삭제</button>
          </CartMenu>
          아이템 들어가는 곳
          {item.map((item, idx) => (
            <CartItem
              onChange={(e) => handleSingleCheck(e.target.checked, item)}
              checked={checkItems.includes(item)}
              key={idx}
              menuName={item.order_menus[0].menu_name}
              storeName={item.store_name}
              price={item.order_menus[0].price}
              quantity={item.order_menus[0].quantity}
            />
          ))}
        </CartItems>
        <Total>
          <TotalBox>
            <TotalItem>
              <span>상품 총 금액</span>
              <span>{calculateTotalPrice()}원</span>
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
