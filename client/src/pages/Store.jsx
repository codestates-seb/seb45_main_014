import ShopInfo from '../components/store/ShopInfo.jsx';
import Menu from '../components/store/Menu.jsx';
import MenuReview from '../components/store/MenuReview.jsx';
import menuData from '../assets/data/menuData.js';
import storeData from '../assets/data/storeData.js';
import reviewData from '../assets/data/reviewData.js';
import { useParams } from 'react-router-dom';

const Store = () => {
  const { id } = useParams();
  const selectedStore = storeData.find((store) => store.id === Number(id));

  return (
    <div className="flex flex-col">
      <ShopInfo store={selectedStore} menu={menuData} />
      <div>
        <h2 className="border-t mt-8 pt-6 pl-20 max-w-4xl mx-auto">
          메뉴 ({menuData.length})
        </h2>
        {menuData.map((menu, index) => {
          return (
            <Menu
              key={index}
              menu={menu}
              isLast={index === menu.length - 1}
              store={selectedStore}
            />
          );
        })}
      </div>
      <div>
        <h2 className=" mt-8 pb-6 pt-6 max-w-4xl mx-auto border-t border-b">
          리뷰 ({reviewData.length})
        </h2>
        {reviewData.map((review, index) => {
          return <MenuReview key={index} review={review} />;
        })}
      </div>
    </div>
  );
};

export default Store;
