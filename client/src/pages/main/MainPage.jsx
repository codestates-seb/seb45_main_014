import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreCard, { FavoriteStoreCard } from '../../assets/StoreCard.jsx';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/store.js';
import { StoreImage } from '../../assets/Styles.jsx';
import images from '../../assets/images/Images.js';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from '../../components/myPage/MyPageLoading.jsx';

const Title = styled.h1`
  padding: 1rem;
`;

const Content = styled.div`
  max-width: 1024px;
  margin: 0 auto 12px auto;
`;

const HotPlace = ({ id, src }) => {
  return (
    <div className="relative w-72 cursor-pointer">
      <Link
        to={`/search?search_keyword=${id}&search_target=region&page=1&size=10`}
      >
        <StoreImage src={src} />
        <div className="flex w-full absolute justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          {id} TOP 10
        </div>
      </Link>
    </div>
  );
};

const MainPage = () => {
  const { isLoggedIn } = useAuthStore((state) => state);
  const [stores, setStores] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { accessToken } = useAuthStore((state) => state);

  const [favoriteStores, setFavoriteStores] = useState([]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 1000);
  };

  useEffect(() => {
    setHasMore(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/stores`, {
        params: {
          page: page,
          size: 12,
        },
      })
      .then((res) => {
        setStores((prevData) => [...prevData, ...res.data.stores]);

        if (res.data.stores.length < 12) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log('빵집 추천 에러', err);
      });
  }, [page]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 1500,
  };

  // 즐겨찾기 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/members/favorites`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: 1,
          size: 8,
        },
      })
      .then((res) => {
        setFavoriteStores(res.data.stores);
      })
      .catch((err) => {
        console.log('메인 페이지 즐겨찾기 에러', err);
      });
  }, [accessToken]);

  return (
    <div className="h-full">
      {/* 즐겨찾기 */}
      {isLoggedIn && favoriteStores.length !== 0 && (
        <Content>
          <div className="flex justify-between">
            <Title>즐겨찾기</Title>
            <Title className="text-blue-500 underline underline-offset-8 hover:text-blue-600 cursor-pointer">
              <Link to="/mypage#favorite">더보기</Link>
            </Title>
          </div>
          <Slider {...settings}>
            {favoriteStores.map((store) => (
              <FavoriteStoreCard store={store} key={store.id} />
            ))}
          </Slider>
        </Content>
      )}

      {/* 핫플레이스 */}
      <Content>
        <Title>현재 핫플레이스</Title>
        <div className="flex gap-4">
          <HotPlace id="강남" src={images.bbang1} />
          <HotPlace id="강북" src={images.bbang2} />
          <HotPlace id="강서" src={images.bbang3} />
          <HotPlace id="강동" src={images.bbang4} />
        </div>
      </Content>

      {/* 빵집 추천 */}
      <Content className="flex flex-col">
        <div>
          <Title className="flex">이 달의 빵집 추천</Title>
        </div>
        <InfiniteScroll
          dataLength={stores.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center pt-14">
              <LoadingComponent />
            </div>
          }
        >
          <div className="flex flex-wrap justify-center">
            {stores.map((store, index) => (
              <StoreCard key={index} store={store} />
            ))}
          </div>
        </InfiniteScroll>
      </Content>
    </div>
  );
};

export default MainPage;
