import { styled } from 'styled-components';
import ShopInfo from '../components/Shop/ShopInfo.jsx';
import Menu from '../components/Shop/Menu.jsx';
const Shop = () => {
  return (
    <div className="flex flex-col justify-center max-w-screen-lg mx-auto">
      <ShopInfo />
      <Menu />
    </div>
  );
};

export default Shop;
