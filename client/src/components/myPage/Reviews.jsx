import { styled } from 'styled-components';
import { Stars } from '../../components/Stars.jsx';
import { StoreImage } from '../../assets/Styles.jsx';
import formatDate from '../../utils/formatDate';
import { RedButton } from '../../assets/buttons/RedButton.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SubmitModal from '../../pages/cart/SubmitModal.jsx';
import { useAuthStore } from '../../store/store.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from './MyPageLoading.jsx';

const ReviewDetailStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ReviewDetail = ({ data, accessToken }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/reviews/${data.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ReviewDetailStyle>
        <div className="w-2/3">
          <h2>{data.store_name}</h2>
          <div className="flex gap-2">
            <Stars rating={data.rating} readOnly={true} />
            {formatDate(data.created_at)}
          </div>
          <div className="h-1/2 mt-2 flex flex-col justify-between">
            <p>{data.content}</p>
          </div>
          <RedButton onClick={openModal}>삭제</RedButton>
        </div>
        <StoreImage src={data.img} alt="매장 이미지"></StoreImage>
      </ReviewDetailStyle>

      {isModalOpen && (
        <SubmitModal
          onClose={closeModal}
          onSubmit={handleDelete}
          message="정말 리뷰 내역을 삭제하시겠어요?"
          cancelLabel="취소"
          submitLabel="확인"
        />
      )}
    </>
  );
};

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
        console.log(res.data.reviews);

        if (res.data.reviews.length < 10) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log('리뷰 에러', err);
      });
  }, [accessToken, page]);

  if (data.length === 0)
    return (
      <h1 className="h-[50vh] flex items-center justify-center">
        작성하신 리뷰가 없습니다.
      </h1>
    );

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={data.length} // 데이터 배열의 길이
        next={fetchMoreData} // 다음 데이터를 불러오는 함수
        hasMore={hasMore} // 다음 데이터를 불러올 수 있는지
        loader={<LoadingComponent />}
      >
        <div className="w-full">
          {data.map((item) => (
            <ReviewDetail key={item.id} data={item} accessToken={accessToken} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Reviews;
