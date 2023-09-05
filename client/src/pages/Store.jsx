import ShopInfo from '../components/store/ShopInfo.jsx';
import menuData from '../assets/data/menuData.js';
import storeData from '../assets/data/storeData.js';
import reviewData from '../assets/data/reviewData.js';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import MenuTab from '../components/store/MenuTab.jsx';
import StoreReviewTab from '../components/store/StoreReviewTab.jsx';

const Store = () => {
  const { id } = useParams();
  const selectedStore = storeData.find((store) => store.id === Number(id));
  const [currentTab, setCurrentTab] = useState('메뉴');

  return (
    <div className="flex flex-col">
      <ShopInfo store={selectedStore} menu={menuData} />

      <ul className="flex justify-center text-center w-3/6 mx-auto border-b mb-1">
        <li className="w-full hover:bg-[#ccc] border-r p-3">
          <Link
            to="#매장"
            className="block w-full"
            onClick={() => setCurrentTab('메뉴')}
          >
            메뉴 ({menuData.length})
          </Link>
        </li>
        <li className="w-full hover:bg-[#ccc] p-3">
          <Link
            to="#매장"
            className="block w-full"
            onClick={() => setCurrentTab('후기')}
          >
            후기 ({reviewData.length})
          </Link>
        </li>
      </ul>
      <div className="flex mx-auto">
        {currentTab === '메뉴' && <MenuTab menuData={menuData} />}
        {currentTab === '후기' && <StoreReviewTab reviewData={reviewData} />}
      </div>
    </div>
  );
};

export default Store;
