import ShopInfo from '../components/store/ShopInfo.jsx';
import storeData from '../assets/data/storeData.js';
import menuData from '../assets/data/menuData.js';
import reviewData from '../assets/data/reviewData.js';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuTab from '../components/store/MenuTab.jsx';
import StoreReviewTab from '../components/store/StoreReviewTab.jsx';
import axios from 'axios';
import LoadingSpinner from '../components/Loading.jsx';

const Store = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('메뉴');

  // const [storeData, setStoreData] = useState(null);
  // // const [menuData, setMenuData] = useState([]);
  // // const [reviewData, setReviewData] = useState([]);

  // const apiUrl = process.env.REACT_APP_API_URL;

  // useEffect(() => {
  //   // 상점 정보
  //   axios
  //     .get(`${apiUrl}/api/stores/${id}`)
  //     .then((res) => {
  //       setStoreData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // 메뉴 정보
  //   // axios
  //   //   .get(`${apiUrl}/api/stores/${id}/menus`)
  //   //   .then((res) => {
  //   //     setMenuData(res.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   // 리뷰 정보
  //   // axios
  //   //   .get(`${apiUrl}/api/stores/${id}/reviews`)
  //   //   .then((res) => {
  //   //     setReviewData(res.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // }, [apiUrl, id]);

  // if (!storeData) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="flex flex-col relative">
      <ShopInfo store={storeData} menu={menuData} />

      <ul className="flex justify-center text-center w-[1070px] mx-auto border-b mb-1 sticky top-[65px] bg-white z-10">
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
