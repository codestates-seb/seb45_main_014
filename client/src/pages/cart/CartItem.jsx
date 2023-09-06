import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/cart/Checkbox.jsx';

const ItemCard = styled.li`
  display: flex;
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
  background: url('https://img-cf.kurly.com/shop/data/goods/1653036991865l0.jpeg');
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

const CartItem = ({ storeName, menuName, quantity, price }) => {
  //-, +버튼으로 quantity를 조절하는 함수
  // const [quantity, setQuantity] = useState(1);
  // const up = () => {
  //   setQuantity(quantity + 1);
  // };
  // const down = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  return (
    <ItemCard>
      <CheckBox />
      <ItemImg to={'/'} />
      <div>
        <Link to={'/'}>
          <p className="text-sm text-gray-400 w-[300px]">{storeName}</p>
          <p>{menuName}</p>
        </Link>
      </div>
      <ButtonBox>
        <button type="button" aria-label="수량내리기">
          -
        </button>
        <div className="">{quantity}</div>
        <button type="button" aria-label="수량올리기">
          +
        </button>
      </ButtonBox>
      <PriceBox>
        <span
          aria-label="판매 가격"
          data-testid="product-price"
          className="font-bold"
        >
          {price}원
        </span>
      </PriceBox>
    </ItemCard>
  );
};

export default CartItem;
