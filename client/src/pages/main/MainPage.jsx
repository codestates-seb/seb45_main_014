import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreCard, { FavoriteStoreCard } from '../../assets/StoreCard.jsx';
import storeData from '../../assets/data/storeData';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/store.js';
import { StoreImage } from '../../assets/Styles.jsx';
import images from '../../assets/images/Images.js';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../../components/Loading.jsx';

const Title = styled.h1`
  padding: 1rem;
`;

const Content = styled.div`
  max-width: 1024px;
  margin: 0 auto 12px auto;
`;

export const getFavoriteStores = () => {
  return storeData.filter((store) => store.is_favorite === true);
};

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
  const favoriteStores = getFavoriteStores();
  const { isLoggedIn } = useAuthStore((state) => state);
  const [stores, setStores] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 1500,
  };

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/stores`, {
        params: {
          page: page,
          size: 10,
        },
      })
      .then((res) => {
        const newData = res.data.stores;
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setStores((prevData) => [...prevData, ...newData]);
          if (newData.length < 10) {
            setHasMore(false);
          }
          setPage(page + 1);
        }
      })
      .catch((err) => {
        console.log(err);
        setHasMore(false);
      });
  }, [page]);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  return (
    <div className="h-full">
      {/* 즐겨찾기 */}
      {isLoggedIn && (
        <Content>
          <div className="flex justify-between">
            <Title>즐겨찾기</Title>
            <Title className="text-blue-500 underline underline-offset-8 hover:text-blue-600 cursor-pointer">
              <Link to="/mypage#favorite">더보기</Link>
            </Title>
          </div>
          <Slider {...settings}>
            {favoriteStores.map((store, index) => (
              <FavoriteStoreCard store={store} key={index} />
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
          next={() => fetchData(page)}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center pt-14">
              <LoadingSpinner position="static" />
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
