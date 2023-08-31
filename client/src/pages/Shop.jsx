import { styled } from 'styled-components';
import ShopInfo from '../components/Shop/ShopInfo.jsx';
import Menu from '../components/Shop/Menu.jsx';
import MenuReview from '../components/Shop/MenuReview.jsx';
import menu from '../assets/data/menuData.js';
import store from '../assets/data/storeData.js';

const Shop = () => {
  return (
    <div className="flex flex-col justify-center ">
      <ShopInfo store={store[0]} />
      {menu.map((menu, index) => {
        return <Menu key={index} menu={menu} />;
      })}
      <MenuReview />
    </div>
  );
};

export default Shop;
