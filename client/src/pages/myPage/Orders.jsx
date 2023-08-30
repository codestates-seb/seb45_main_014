import { styled } from 'styled-components';
import Button from '../../components/Button.jsx';
import { Link } from 'react-router-dom';

const OrdersImage = styled.img`
  width: 150px;
  height: 150px;
`;

const OrdersItem = () => {
  return (
    <div className="flex flex-col items-center">
      <OrdersImage
        src="https://user-images.githubusercontent.com/121498405/264039565-fc5b6c09-792b-46e6-8622-7d45822c497f.png"
        alt="loading"
      />
      <div className="flex flex-col w-full py-2">
        <div>매장명 어쩌구</div>
        <div>{'2023-08-20'}</div>
      </div>
      <Button className="w-full">
        <Link to="/reviews/post">리뷰 작성</Link>
      </Button>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-around w-5/6 gap-4">
        <OrdersItem className="w-1/3" />
        <OrdersItem className="w-1/3" />
        <OrdersItem className="w-1/3" />
        <OrdersItem className="w-1/3" />
        <OrdersItem className="w-1/3" />
        <OrdersItem className="w-1/3" />
      </div>
    </div>
  );
};

export default Orders;
