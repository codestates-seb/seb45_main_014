import PostReview from '../review/PostReview.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../store/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from '../MyPageLoading.jsx';
import OrderDetail from './OrderDetail.jsx';

const Orders = () => {
  const [currentModalData, setCurrentModalData] = useState(null);

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
      .get(`${process.env.REACT_APP_API_URL}/api/members/orders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page,
          size: 12,
        },
      })
      .then((res) => {
        const filteredData = res.data.orders.filter(
          (item) => item.order_status !== '생성',
        );
        setData((prevData) => [...prevData, ...filteredData]);

        if (res.data.orders.length < 10) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log('리뷰 에러', err);
      });
  }, [accessToken, page]);

  const openModal = (data) => setCurrentModalData(data);
  const closeModal = () => {
    setCurrentModalData(null);
  };

  return (
    <div className="flex justify-center">
      {!hasMore && data.length === 0 ? (
        <h1 className="h-[50vh] flex items-center justify-center">
          주문하신 내역이 없습니다.
        </h1>
      ) : (
        <InfiniteScroll
          dataLength={data.length} // 데이터 배열의 길이
          next={fetchMoreData} // 다음 데이터를 불러오는 함수
          hasMore={hasMore} // 다음 데이터를 불러올 수 있는지
          loader={<LoadingComponent />}
        >
          <div className="grid grid-flow-row-dense md:grid-cols-4 gap-4 sm:grid-cols-2">
            {data.map((item) => (
              <OrderDetail
                key={item.id}
                data={item}
                openModal={openModal}
                accessToken={accessToken}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
      {currentModalData && (
        <PostReview data={currentModalData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Orders;
