import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../store/store.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from '../MyPageLoading.jsx';
import ReviewDetail from './ReviewDetail.jsx';

const Reviews = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { accessToken } = useAuthStore((state) => state);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 1000);
  };

  useEffect(() => {
    setHasMore(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page,
          size: 10,
        },
      })
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data.reviews]);

        if (res.data.reviews.length < 10) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log('리뷰 에러', err);
      });
  }, [accessToken, page]);

  return (
    <div className="w-full">
      {!hasMore && data.length === 0 ? (
        <h1 className="h-[50vh] flex items-center justify-center">
          작성하신 리뷰가 없습니다.
        </h1>
      ) : (
        <InfiniteScroll
          dataLength={data.length} // 데이터 배열의 길이
          next={fetchMoreData} // 다음 데이터를 불러오는 함수
          hasMore={hasMore} // 다음 데이터를 불러올 수 있는지
          loader={<LoadingComponent />}
        >
          <div className="w-full">
            {data.map((item) => (
              <ReviewDetail
                key={item.id}
                data={item}
                accessToken={accessToken}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Reviews;
