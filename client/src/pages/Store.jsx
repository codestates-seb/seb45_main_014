import ShopInfo from '../components/store/ShopInfo.jsx';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MenuTab from '../components/store/MenuTab.jsx';
import StoreReviewTab from '../components/store/StoreReviewTab.jsx';
import axios from 'axios';
import LoadingSpinner from '../components/Loading.jsx';
import menuData from '../assets/data/menuData';
import reviewDmData from '../assets/data/reviewData';

const Store = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('메뉴');
  const [storeData, setStoreData] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const menuRef = useRef(null);
  const reviewRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // 상점 정보
    axios
      .get(`${apiUrl}/api/stores/${id}`)
      .then((res) => {
        setStoreData(res.data.store);
        console.log(res.data.store);
      })
      .catch((err) => {
        console.error(err);
      });
    // 리뷰 정보
    axios
      .get(`${apiUrl}/api/stores/${id}/reviews?page=1&size=10`)
      .then((res) => {
        setReviewData(res.data.reviews);
        console.log(res.data.reviews);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [apiUrl, id]);

  if (!storeData) {
    return <LoadingSpinner />;
  }

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    if (tab === '메뉴') {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === '리뷰') {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col relative">
      <ShopInfo store={storeData} />
      <ul className="flex justify-center text-center w-[1070px] mx-auto border-b mb-1 sticky top-[65px] bg-white z-10">
        <li className="w-full hover:bg-[#ccc] border-r py-3">
          <a
            href="#메뉴"
            className="block w-full cursor-pointer"
            onClick={() => setCurrentTab('메뉴')}
          >
            메뉴 ({storeData.menus.length})
          </a>
        </li>
        <li className="w-full hover:bg-[#ccc] py-3">
          <a
            href="#리뷰"
            className="block w-full cursor-pointer"
            onClick={() => setCurrentTab('리뷰')}
          >
            리뷰 ({reviewData.length})
          </a>
        </li>
      </ul>
      <div className="flex flex-col mx-auto">
        <div id="메뉴" ref={menuRef}>
          메뉴
          <MenuTab menuData={menuData} />
        </div>
        <div id="리뷰" ref={reviewRef}>
          리뷰
          <StoreReviewTab reviewData={reviewDmData} />
        </div>
      </div>
    </div>
  );
};

export default Store;
