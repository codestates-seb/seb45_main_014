import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/cart/Checkbox.jsx';
import { useState } from 'react';
import DeleteModal from './SubmitModal.jsx';
import { ReactComponent as Delete } from '../../assets/images/closebutton.svg';
import { useCartItemStore } from '../../store/store.js';

const ItemCard = styled.li`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  padding: 20px 0;
`;

const ItemImg = styled(Link)`
  display: block;
  width: 80px;
  height: 78px;
  margin-right: 20px;
  // 여기에 Menu 이미지가 오면 될듯?
  background: ${(props) =>
    props.img ||
    `url('https://img-cf.kurly.com/shop/data/goods/1653036991865l0.jpeg')`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const ButtonBox = styled.div`
  display: inline-flex;
  align-items: center;
  width: 88px;
  border: 1px solid rgb(221, 223, 225);
  border-radius: 3px;
  button {
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    font-size: 20px;
    &:disabled {
      color: rgb(156, 163, 175);
    }
  }
  div {
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    width: 31px;
    height: 28px;
    line-height: 28px;
    justify-content: center;
  }
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 127px;
  text-align: right;
`;

const CartItem = ({ menuName, quantity, price, onChange, checked, id }) => {
  //-, +버튼으로 quantity를 조절하는 함수
  const [amount, setAmount] = useState(quantity);
  const { cartItem, setCartItem } = useCartItemStore();

  const quantityUp = () => {
    const updatedAmount = amount + 1;
    setAmount(updatedAmount);
    // 로컬 스토리지 업데이트
    updateQuantity(id, updatedAmount);
  };
  const quantityDown = () => {
    if (amount > 1) {
      const updatedAmount = amount - 1;
      setAmount(updatedAmount);
      // 로컬 스토리지 업데이트
      updateQuantity(id, updatedAmount);
    }
  };
  // id와 localstorage에 저장된 id가 같은 경우 quantity를 업데이트 (API 구현되면 삭제할 것)
  const updateQuantity = (itemId, updatedQuantity) => {
    const localItems = JSON.parse(localStorage.getItem('cartItems'));
    for (const localItem of localItems) {
      if (localItem.id === itemId) {
        localItem.quantity = updatedQuantity;
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(localItems));
    //localstorage에 있는 id와 cartitem.id가 같은 경우 cartitem.quantity를 localstorage에 있는 quantity로 업데이트
    const updatedCartItems = cartItem.map((cartItem) => {
      if (cartItem.id === itemId) {
        return { ...cartItem, quantity: updatedQuantity };
      }
      return cartItem;
    });
    setCartItem(updatedCartItems);
    console.log(cartItem);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveClick = () => {
    openModal();
  };

  return (
    <ItemCard>
      <CheckBox onChange={onChange} checked={checked} />
      <ItemImg to={'/'} />
      <div className="flex-1">
        <Link to={'/'}>
          <p>{menuName}</p>
        </Link>
      </div>
      <ButtonBox>
        <button
          type="button"
          aria-label="수량내리기"
          onClick={quantityDown}
          disabled={amount === 1}
        >
          -
        </button>
        <div>{amount}</div>
        <button type="button" aria-label="수량올리기" onClick={quantityUp}>
          +
        </button>
      </ButtonBox>
      <PriceBox>
        <span
          aria-label="판매 가격"
          data-testid="product-price"
          className="font-bold"
        >
          {(price * amount).toLocaleString()}원
        </span>
      </PriceBox>
      <button
        type="button"
        aria-label="삭제하기"
        className="pl-4"
        onClick={handleRemoveClick}
      >
        <Delete />
      </button>
      {isModalOpen && (
        <DeleteModal
          onClose={openModal}
          onSubmit={handleRemoveClick}
          message={'정말 삭제하시겠습니까?'}
          cancelLabel={'취소'}
          submitLabel={'삭제'}
        />
      )}
    </ItemCard>
  );
};

export default CartItem;
