import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import orderData from '../../assets/data/orderData.js';
import formatDate from '../../utils/formatDate';
import Button from '../../assets/buttons/Button.jsx';

const OrdersImage = styled.img`
  width: 150px;
  height: 150px;
`;

const OrdersItem = ({ data }) => {
  const menuName = data.order_menus[0].menu_name;
  const menuLength = data.order_menus.length;
  const menuImage = data.order_menus[0].img;

  return (
    <div className="flex flex-col items-center">
      <OrdersImage className="object-cover" src={menuImage} alt="loading" />
      <div className="flex flex-col w-full">
        <div>{data.store_name}</div>
        <div>
          {menuName}
          {menuLength > 1 ? ` 외 ${menuLength - 1}개` : ''}
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
      <div className="flex flex-wrap w-5/6 gap-4">
        {orderData.map((item, index) => (
          <OrdersItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
