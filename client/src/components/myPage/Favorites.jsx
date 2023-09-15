import { useEffect, useState } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useAuthStore } from '../../store/store.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from './MyPageLoading.jsx';

const Favorites = () => {
  const { accessToken } = useAuthStore((state) => state);

  const [data, setData] = useState([]); // 즐겨찾기 데이터
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 1000);
  };

  useEffect(() => {
    setHasMore(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/members/favorites`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page,
          size: 10,
        },
      })
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data.stores]);

        if (res.data.stores.length < 10) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log('즐겨찾기 에러', err);
      });
  }, [accessToken, page]);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length} // 데이터 배열의 길이
        next={fetchMoreData} // 다음 데이터를 불러오는 함수
        hasMore={hasMore} // 다음 데이터를 불러올 수 있는지
        loader={<LoadingComponent />}
      >
        <div className="flex flex-wrap justify-center mx-4">
          {data.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Favorites;
