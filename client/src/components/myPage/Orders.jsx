import { styled } from 'styled-components';
import formatDate from '../../utils/formatDate';
import Button from '../../assets/buttons/Button.jsx';
import PostReview from './PostReview.jsx';
import { useEffect, useState } from 'react';
import { StoreImage } from '../../assets/Styles.jsx';
import { RedButton } from '../../assets/buttons/RedButton.jsx';
import axios from 'axios';
import { useAuthStore } from '../../store/store';
import SubmitModal from '../../pages/cart/SubmitModal.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from './MyPageLoading.jsx';

const OrdersImage = styled(StoreImage)`
  width: 200px;
  height: 200px;
  margin: 10px 0;
`;

const OrdersItem = ({ data, openModal, accessToken }) => {
  const menuName = data.order_menus?.[0]?.menu_name;
  const menuLength = data.order_menus?.length;
  const menuImage = data.order_menus?.[0]?.img;

  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);

  // 모달 열기
  const openSubmitModal = () => {
    setSubmitModalOpen(true);
  };

  // 모달 닫기
  const closeSubmitModal = () => {
    setSubmitModalOpen(false);
  };

  // 주문 내역 삭제
  const deleteOrder = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/members/orders/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <OrdersImage className="object-cover" src={menuImage} alt="loading" />
      <div className="flex flex-col w-full">
        <div>{data.store_name}</div>
        <div className="text-sm text-stone-500">
          {menuName}
          {menuLength > 1 ? ` 외 ${menuLength - 1}개` : ''}
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-stone-500">
            {formatDate(data.created_at)}
          </div>
          <div className="text-sm text-stone-500">{data.order_status}</div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/3">
          {data.order_status === '픽업' && (
            <Button onClick={() => openModal(data)} className="w-full">
              리뷰 작성
            </Button>
          )}
        </div>
        <RedButton onClick={openSubmitModal} className="w-1/3 text-xs">
          삭제
        </RedButton>
      </div>
      {isSubmitModalOpen && (
        <SubmitModal
          onClose={closeSubmitModal}
          onSubmit={deleteOrder}
          message="정말 주문 내역을 삭제하시겠어요?"
          cancelLabel="취소"
          submitLabel="확인"
        />
      )}
    </div>
  );
};

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
        setData((prevData) => [...prevData, ...res.data.orders]);

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

  if (!data || data.length === 0)
    return (
      <h1 className="h-[50vh] flex items-center justify-center">
        주문하신 내역이 없습니다.
      </h1>
    );

  return (
    <div className="flex justify-center">
      <InfiniteScroll
        dataLength={data.length} // 데이터 배열의 길이
        next={fetchMoreData} // 다음 데이터를 불러오는 함수
        hasMore={hasMore} // 다음 데이터를 불러올 수 있는지
        loader={<LoadingComponent />}
      >
        <div className="grid grid-flow-row-dense md:grid-cols-4 gap-4 sm:grid-cols-2">
          {data.map((item) => (
            <OrdersItem key={item.id} data={item} openModal={openModal} />
          ))}
        </div>
      </InfiniteScroll>
      {currentModalData && (
        <PostReview data={currentModalData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Orders;
