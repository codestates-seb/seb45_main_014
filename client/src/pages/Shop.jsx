import { styled } from 'styled-components';
import ShopInfo from '../components/Shop/ShopInfo.jsx';
import Menu from '../components/Shop/Menu.jsx';
import MenuReview from '../components/Shop/MenuReview.jsx';
import menu from '../assets/data/menuData.js';
import store from '../assets/data/storeData.js';
import reviewData from '../assets/data/reviewData.js';

const Shop = () => {
  return (
    <div className="flex flex-col">
      <ShopInfo store={store[0]} menu={menu} />
      {menu.map((menu, index) => {
        return <Menu key={index} menu={menu} />;
      })}
      {reviewData.map((review, index) => {
        return <MenuReview key={index} review={review} />;
      })}
    </div>
  );
};

export default Shop;
