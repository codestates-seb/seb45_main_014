import images from './images/Images';
import { StoreImage } from './Styles.jsx';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const MenuCard = ({ menu }) => {
  const { id, store_id, menu_name, price, store_name, img } = menu;

  return (
    <div className="w-72 relative m-2">
      <Link to={`/stores/${store_id}`}>
        <div className=" overflow-hidden rounded-lg">
          <StoreImage className="object-cover" src={img} alt="메뉴 이미지" />
        </div>
      </Link>
      <Link to={`/stores/${store_id}`}>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex">
              <h2>{menu_name}</h2>
            </div>
            <div className="">{store_name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuCard;
