import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreCard, { FavoriteStoreCard } from '../../assets/StoreCard.jsx';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/store.js';
import { StoreImage } from '../../assets/Styles.jsx';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from '../../components/myPage/MyPageLoading.jsx';
import { handleImgError } from '../../utils/handleImgError.js';

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
        to={`/search?search_keyword=${id}&search_target=menu&page=1&size=10`}
      >
        <StoreImage className="hover:scale-1" src={src} />
        <div className="flex w-full absolute justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
          {id}
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
    slidesToShow: 3,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 2000,
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
          {/* 즐겨찾기가 1개면 슬라이더 미사용 */}
          {favoriteStores.length === 2 ? (
            <div className="flex justify-center">
              {favoriteStores.map((store) => (
                <FavoriteStoreCard store={store} key={store.id} />
              ))}
            </div>
          ) : (
            <Slider {...settings}>
              {favoriteStores.map((store) => (
                <FavoriteStoreCard store={store} key={store.id} />
              ))}
            </Slider>
          )}
        </Content>
      )}

      {/* 핫플레이스 */}
      <Content>
        <Title>오늘 뭐 먹지?</Title>
        <div className="flex gap-4">
          <HotPlace
            id="케이크"
            src="https://images.unsplash.com/photo-1626803775151-61d756612f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FrZXx8fHx8fDE2OTQ5NTU3NzU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          />
          <HotPlace
            id="도넛"
            src="https://images.unsplash.com/photo-1598184274620-6e576a2e2656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG91Z2hudXR8fHx8fHwxNjk0OTU2MDQw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          />
          <HotPlace
            id="바게트"
            src="https://images.unsplash.com/photo-1619685347769-c7e6d5a83b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZG91Z2hudXR8fHx8fHwxNjk0OTU2MTgy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          />
          <HotPlace
            id="쿠키"
            src="https://images.unsplash.com/photo-1613703154938-d02828822dd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y29va2llfHx8fHx8MTY5NDk1NjE1NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          />
        </div>
      </Content>

      {/* 빵집 추천 */}
      <Content className="flex flex-col">
        <div>
          <Title className="flex">이 달의 빵집 추천</Title>
        </div>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
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
