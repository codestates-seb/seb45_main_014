import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/cart/Checkbox.jsx';
import { useEffect, useState } from 'react';
import DeleteModal from './SubmitModal.jsx';
import { ReactComponent as Delete } from '../../assets/images/closebutton.svg';
import { useCartItemStore } from '../../store/store.js';
import { useCartApi } from '../../api/cart.js';
import { toast } from 'react-hot-toast';

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
  // props.image가 WebP 이미지 URL을 가지고 있다면 해당 URL을 사용하고, 그렇지 않다면 기본 URL을 사용
  background: ${(props) =>
    props.image
      ? `url(${props.image})`
      : `url('https://img-cf.kurly.com/shop/data/goods/1653036991865l0.jpeg')`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
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

const CartItem = ({
  menuName,
  quantity,
  price,
  onChange,
  checked,
  id,
  image,
}) => {
  //-, +버튼으로 quantity를 조절하는 함수
  const [amount, setAmount] = useState(quantity);
  const { setCartItem, storeId, setCheckItem } = useCartItemStore();
  const { deleteCart, updateCart, fetchCart, getStock } = useCartApi();
  const [storeNum, setStoreNum] = useState(0);
  const [stock, setStock] = useState(0);
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    setStoreNum(storeId);
  }, [storeId]);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const stock = await getStock(storeId, id);
        setStock(stock);
      } catch {
        console.error('에러임');
      }
    };
    getStockData();
  }, [storeId, id, getStock]);

  useEffect(() => {
    const getStoredata = async () => {
      try {
        const storeName = await fetchCart().then((res) => res.store_name);
        setStoreName(storeName);
      } catch {
        console.error('에러임');
      }
    };
    getStoredata();
  }, [fetchCart]);

  // 개수가 바뀔때마다 컴포넌트 리렌더링
  useEffect(() => {
    setAmount(quantity);
  }, [quantity]);

  const quantityUp = async () => {
    const stock = await getStock(storeId, id);
    const updatedAmount = amount + 1;
    console.dir(`현재 재고 : ${stock}`);

    // updatedAmount가 stock보다 크면 경고 메시지를 표시하고 함수를 종료
    if (updatedAmount > stock) {
      toast.error('재고가 부족합니다.', {
        id: 'stock',
        duration: 3000,
      });
      return;
    }
    setAmount(updatedAmount);
    updateQuantity(id, updatedAmount);
  };
  const quantityDown = () => {
    if (amount > 1) {
      const updatedAmount = amount - 1;
      setAmount(updatedAmount);
      updateQuantity(id, updatedAmount);
    }
  };

  const updateQuantity = async (itemId, updatedQuantity) => {
    await updateCart(itemId, updatedQuantity);
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

  const handleDelete = async () => {
    try {
      await deleteCart([id]);
      // 삭제된 내역 업데이트
      // const newData = await fetchCart().then((res) => res.order_menus);
      // setCartItem(newData);
      // setCheckItem(newData.map((item) => item.id));
      // console.log(newData);
    } catch (error) {
      console.error('에러임', error);
    } finally {
      closeModal();
    }
  };

  return (
    <ItemCard>
      <CheckBox onChange={onChange} checked={checked} />
      <div className="overflow-hidden rounded-md">
        <ItemImg to={`/stores/${storeNum}`} image={image} />
      </div>
      <div className="flex-1 ml-5">
        <Link to={`/stores/${storeNum}`}>
          <p className="text-sm text-gray-400">{storeName}</p>
          <p className="text-base font-semibold">{menuName}</p>
          <p className="text-xs text-gray-400">남은 재고 : {stock} 개</p>
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
          onClose={() => closeModal()}
          onSubmit={handleDelete}
          message={'정말 삭제하시겠습니까?'}
          cancelLabel={'취소'}
          submitLabel={'삭제'}
        />
      )}
    </ItemCard>
  );
};

export default CartItem;
