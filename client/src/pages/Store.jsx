import ShopInfo from '../components/store/ShopInfo.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MenuTab from '../components/store/MenuTab.jsx';
import StoreReviewTab from '../components/store/StoreReviewTab.jsx';
import axios from 'axios';
import LoadingSpinner from '../components/Loading.jsx';
import menuData from '../assets/data/menuData';
import reviewDmData from '../assets/data/reviewData';
import { styled } from 'styled-components';

const Store = () => {
  const { id } = useParams();
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

  const scrollTo = (ref) => {
    if (ref.current) {
      const stickyTabHeight = 43; // 스티키 탭의 높이
      const targetOffset = ref.current.offsetTop - stickyTabHeight;
      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col relative">
      <ShopInfo store={storeData} />
      <ul className="flex justify-center text-center w-[1070px] mx-auto border-b mb-1 sticky top-[65px] bg-white z-10">
        <li className="w-full hover:bg-[#ccc] border-r py-3">
          <button
            className="block w-full cursor-pointer"
            onClick={() => scrollTo(menuRef)}
          >
            메뉴 ({storeData.menus.length})
          </button>
        </li>
        <li className="w-full hover:bg-[#ccc] py-3">
          <button
            className="block w-full cursor-pointer"
            onClick={() => scrollTo(reviewRef)}
          >
            리뷰 ({reviewData.length})
          </button>
        </li>
      </ul>
      <div className="flex flex-col mx-auto">
        <div ref={menuRef}></div>
        <MenuTab menuData={menuData} />
        <div ref={reviewRef}></div>
        <StoreReviewTab reviewData={reviewDmData} />
      </div>
      <ScrollButton onClick={() => scrollTo(menuRef)}>메뉴</ScrollButton>
      <ScrollButton onClick={() => scrollTo(reviewRef)}>리뷰</ScrollButton>
    </div>
  );
};

export default Store;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
`;
