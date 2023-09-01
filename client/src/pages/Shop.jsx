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
      <div>
        <h2 className="border-t mt-8 pt-6 max-w-4xl mx-auto">
          메뉴 ({menu.length})
        </h2>
        {menu.map((menu, index) => {
          return (
            <Menu key={index} menu={menu} isLast={index === menu.length - 1} />
          );
        })}
      </div>
      <div>
        <h2 className=" mt-8 pt-6 max-w-4xl mx-auto border-t">
          리뷰 ({reviewData.length})
        </h2>
        {reviewData.map((review, index) => {
          return <MenuReview key={index} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
