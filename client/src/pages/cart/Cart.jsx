import { styled } from 'styled-components';
import Button from '../../assets/buttons/Button.jsx';
import CheckBox from '../../components/cart/Checkbox.jsx';
import CartItem from './CartItem.jsx';
import { useState } from 'react';
import { useCartItemStore, useAuthStore } from '../../store/store.js';
import axios from 'axios';
import SubmitModal from './SubmitModal.jsx';
import Dropdown from '../../assets/Dropdown.jsx';

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
  button {
    &:disabled {
      color: rgb(156, 163, 175);
    }
  }
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
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  &:first-child {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Cart = () => {
  const { cartItem, setCartItem } = useCartItemStore();
  const [checkItem, setCheckItem] = useState(cartItem.map((item) => item.id)); // CartItem의 id를 저장하는 상태 변수
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 상태 추가
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false); // 주문 모달 상태 추가
  const [pickupTime, setPickupTime] = useState(30); // 픽업 시간을 저장하는 상태 변수
  const API = `${process.env.REACT_APP_API_URL}/api`;
  const { accessToken } = useAuthStore();
  // Dropdown 옵션
  const options = [
    { value: 30, name: '30분' },
    { value: 60, name: '1시간' },
    { value: 90, name: '1시간 30분' },
    { value: 120, name: '2시간' },
  ];

  //dropdown에서 선택한 시간을 setPickupTime 하는 함수
  const handlePickupTimeChange = (selectedOption) => {
    setPickupTime(selectedOption.value);
  };

  const openModal = (modalType) => {
    if (modalType === 'delete') {
      setIsDeleteModalOpen(true);
    } else if (modalType === 'submit') {
      checkItem.length === 0
        ? alert('선택된 상품이 없습니다.')
        : setIsSubmitModalOpen(true);
    }
  };

  const closeModal = (modalType) => {
    if (modalType === 'delete') {
      setIsDeleteModalOpen(false);
    } else if (modalType === 'submit') {
      setIsSubmitModalOpen(false);
    }
  };

  // 체크박스가 체크되면 checkItem에 아이템 추가
  const handleSingleCheck = (checked, item) => {
    if (checked) {
      setCheckItem([...checkItem, item.id]); // 여기에서 id만 추가
      console.log(checkItem);
    } else {
      setCheckItem(checkItem.filter((id) => id !== item.id)); // 여기에서도 id로 비교
      console.log(checkItem);
    }
  };
  // 전체선택 체크박스
  const handleAllCheck = (checked) => {
    if (checked) {
      const allItemIds = cartItem.map((item) => item.id); // 모든 아이템의 id 배열 생성
      setCheckItem(allItemIds); // 모든 아이템을 선택
      console.log(checkItem);
    } else {
      setCheckItem([]); // 모든 아이템 선택 해제
      console.log(checkItem);
    }
  };
  // 체크박스에 포함된 아이템을 axios DELETE 요청
  const handleDelete = async () => {
    try {
      const checkedId = checkItem;

      // 삭제 요청
      await axios.delete(`${API}/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: checkedId,
      });

      // 삭제된 내역 업데이트
      const response = await axios.get(`${API}/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newData = response.data.order.order_menus;
      setCartItem(newData);
      setCheckItem(newData.map((item) => item.id));
      console.log(newData);
    } catch (error) {
      console.error('에러임', error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleSubmit = () => {
    axios
      .post(`${API}/cart?pickup_time=${pickupTime}`)
      .then((res) => {
        console.log(res);
        alert('주문이 완료되었습니다.');
        setCartItem([]);
        setCheckItem([]);
      })
      .catch((err) => console.log('에러임', err));
  };

  // checked = true인 아이템의 총 가격을 계산
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItem.forEach((item) => {
      if (checkItem.includes(item.id)) {
        totalPrice += item.price * item.quantity;
      }
    });
    return totalPrice;
  };

  return (
    <section className="max-w-screen-lg mx-auto pb-16">
      <h1 className="pt-[50px] pb-[30px] text-center">장바구니</h1>
      <ShoppingCart>
        <CartItems>
          <CartMenu>
            <CheckBox
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={
                checkItem.length !== cartItem.length || cartItem.length === 0
                  ? false
                  : true
              }
            />
            <span className="w-[150px] pr-[40px]">
              전체선택 ({checkItem.length}/{cartItem.length})
            </span>
            <button
              onClick={() => openModal('delete')}
              disabled={checkItem.length === 0}
            >
              선택삭제
            </button>
            {isDeleteModalOpen && (
              <SubmitModal
                onClose={() => closeModal('delete')}
                onSubmit={handleDelete}
                message={`선택한 ${checkItem.length}개의 상품을 삭제하시겠습니까?`}
                cancelLabel={'취소'}
                submitLabel={'삭제'}
              />
            )}
          </CartMenu>
          {cartItem.map((item, idx) => (
            <CartItem
              onChange={(e) => handleSingleCheck(e.target.checked, item)}
              checked={checkItem.includes(item.id)}
              key={idx}
              id={item.id}
              menuName={item.menu_name === null ? '엄청난 빵' : item.menu_name}
              price={!item.price ? 3500 : item.price}
              quantity={item.quantity}
            />
          ))}
        </CartItems>
        <Total>
          <TotalBox>
            <TotalItem>
              <span>상품 총 금액</span>
              <div>
                <span className="font-semibold">
                  {calculateTotalPrice().toLocaleString()}
                </span>
                <span className="pl-1">원</span>
              </div>
            </TotalItem>
            <TotalItem>
              <span>픽업 시간</span>
              <div className="flex h-[30px]">
                {/* <select
                  className="h-full rounded-lg border-2 text-right border-gray-300"
                  value={pickupTime}
                  onChange={handlePickupTimeChange}
                >
                  <option value={30}>30분</option>
                  <option value={60}>1시간</option>
                  <option value={90}>1시간 30분</option>
                  <option value={120}>2시간</option>
                </select> */}
                <Dropdown
                  options={options}
                  defaultOption={options[0]}
                  onSelect={handlePickupTimeChange}
                />
                <span className="pl-1 my-auto">후</span>
              </div>
            </TotalItem>
            <Button fontsize="16px" onClick={() => openModal('submit')}>
              주문하기
            </Button>
            {isSubmitModalOpen && (
              <SubmitModal
                onClose={() => closeModal('submit')}
                onSubmit={handleSubmit}
                message={'정말 주문하시겠습니까?'}
                cancelLabel={'취소'}
                submitLabel={'주문'}
              />
            )}
          </TotalBox>
        </Total>
      </ShoppingCart>
    </section>
  );
};

export default Cart;
