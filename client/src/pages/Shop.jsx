import { styled } from 'styled-components';
import ShopInfo from '../components/Shop/ShopInfo.jsx';
import Menu from '../components/Shop/Menu.jsx';
import MenuReview from '../components/Shop/MenuReview.jsx';

const Shop = () => {
  return (
    <div className="flex flex-col justify-center">
      <ShopInfo />
      <Menu />
      <MenuReview />
    </div>
  );
};

export default Shop;
