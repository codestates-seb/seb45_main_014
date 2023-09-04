import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import orderData from '../../assets/data/orderData.js';
import formatDate from '../../utils/formatDate';
import Button from '../../components/Button.jsx';

const OrdersImage = styled.img`
  width: 150px;
  height: 150px;
`;

const OrdersItem = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      {/* 이미지 변경 필요 */}
      <OrdersImage
        src="https://user-images.githubusercontent.com/121498405/264039565-fc5b6c09-792b-46e6-8622-7d45822c497f.png"
        alt="loading"
      />
      <div className="flex flex-col w-full">
        <div>{data.storeId}</div>
        <div>
          {data.order_menus[0].menu_name}외 {data.order_menus.length - 1}개
        </div>
        <div>{formatDate(data.created_at)}</div>
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
        {orderData.map((item, index) => (
          <OrdersItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
