import ShopInfo from '../components/store/ShopInfo.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MenuTab from '../components/store/MenuTab.jsx';
import StoreReviewTab from '../components/store/StoreReviewTab.jsx';
import axios from 'axios';
import LoadingSpinner from '../components/Loading.jsx';
import { useAuthStore } from '../store/store.js';

const Store = () => {
  const { id } = useParams();
  const [storeData, setStoreData] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [reviewInfoData, setReviewInfoData] = useState([]);
  const menuRef = useRef(null);
  const reviewRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const { accessToken, isLoggedIn, guest } = useAuthStore((state) => state);

  const [currentPage, setCurrentPage] = useState(1);
  //스크롤 위치에 따른 상태 추가
  const [isMenuTabActive, setIsMenuTabActive] = useState(false);
  const [isReviewTabActive, setIsReviewTabActive] = useState(false);

  // handleScroll 함수 정의
  const handleScroll = () => {
    const scrollY = window.scrollY;

    const stickyTabHeight = 106;
    if (menuRef.current && reviewRef.current) {
      const menuTabOffset = menuRef.current.offsetTop - stickyTabHeight;
      const reviewTabOffset = reviewRef.current.offsetTop - stickyTabHeight;

      if (scrollY >= menuTabOffset && scrollY < reviewTabOffset) {
        setIsMenuTabActive(true);
        setIsReviewTabActive(false);
      } else if (scrollY >= reviewTabOffset) {
        setIsMenuTabActive(false);
        setIsReviewTabActive(true);
      } else {
        setIsMenuTabActive(false);
        setIsReviewTabActive(false);
      }
    }
  };

  useEffect(() => {
    let headers = {};

    // 로그인 상태일 때만 헤더에 토큰 추가
    if (isLoggedIn && !guest) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // 상점 정보
    axios
      .get(`${apiUrl}/api/stores/${id}`, {
        headers,
      })
      .then((res) => {
        setStoreData(res.data.store);
      })
      .catch((err) => {
        console.error(err);
      });
    // 리뷰 정보
    axios
      .get(`${apiUrl}/api/stores/${id}/reviews?page=${currentPage}&size=10`)
      .then((res) => {
        setReviewData(res.data.reviews);
        setReviewInfoData(res.data.pageInfo);
      })
      .catch((err) => {
        console.error(err);
      });

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [accessToken, apiUrl, guest, id, currentPage, isLoggedIn]);

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
      <div className="flex justify-center sticky top-[65px] z-10 xl:ml-[0px]">
        <ul className="flex text-center xl:w-[1080px] sm:mb-1 bg-white z-10">
          <li
            className={`sm:w-[260px] xl:w-[540px]  hover:bg-[#ccc] py-3 border-r ${
              isMenuTabActive ? 'bg-[#ccc]' : 'border-b'
            }`}
          >
            <button
              className="block w-full cursor-pointer xl:text-2xl sm:text-1xl "
              onClick={() => scrollTo(menuRef)}
            >
              메뉴 ({storeData.menus.length})
            </button>
          </li>
          <li
            className={`xl:w-[540px] sm:w-[250px] hover:bg-[#ccc] py-3 ${
              isReviewTabActive ? 'bg-[#ccc]' : 'border-b'
            }`}
          >
            <button
              className="block w-full xl:text-2xl sm:text-1xl cursor-pointer"
              onClick={() => scrollTo(reviewRef)}
            >
              리뷰 ({reviewInfoData.total_elements})
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col sm:max-w-[430px] xl:max-w-[1070px] mx-auto ">
        <div ref={menuRef}></div>
        <span className="mt-[30px] mb-[10px] xl:text-4xl sm:text-2xl w-[450px] ml-[20px]">
          매장 메뉴
        </span>
        <MenuTab menuData={storeData.menus} />
        <div ref={reviewRef}></div>
        <span className="mt-[30px] mb-[10px] text-4xl">매장 리뷰</span>
        <StoreReviewTab
          reviewData={reviewData}
          scrollTo={scrollTo}
          reviewRef={reviewRef}
          pageInfo={reviewInfoData}
          page={currentPage}
          setPage={setCurrentPage}
          totalPage={reviewInfoData.total_pages}
        />
      </div>
    </div>
  );
};

export default Store;
