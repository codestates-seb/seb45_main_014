import { styled } from 'styled-components';
import { Stars } from '../../components/Stars.jsx';
import { StoreImage } from '../../assets/Styles.jsx';
import formatDate from '../../utils/formatDate';
import { RedButton } from '../../assets/buttons/RedButton.jsx';
import axios from 'axios';
import { useState } from 'react';
import SubmitModal from '../../pages/cart/SubmitModal.jsx';
import { useAuthStore } from '../../store/store.js';

const ReviewDetailStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ReviewDetail = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { accessToken } = useAuthStore((state) => state);

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

const Reviews = ({ data }) => {
  if (data.length === 0)
    return (
      <h1 className="h-[50vh] flex items-center justify-center">
        작성하신 리뷰가 없습니다.
      </h1>
    );

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <ReviewDetail key={index} data={item} />
      ))}
    </div>
  );
};

export default Reviews;
