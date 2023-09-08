import { styled } from 'styled-components';
import { Stars } from '../../components/Stars.jsx';
import data from '../../assets/data/myPageReviewData.js';
import { StoreImage } from '../../assets/Styles.jsx';
import formatDate from '../../utils/formatDate';
import { RedButton } from '../../assets/buttons/RedButton.jsx';

const ReviewDetailStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ReviewDetail = ({ singleData }) => {
  return (
    <ReviewDetailStyle>
      <div className="w-2/3">
        <h2>{singleData.store_name}</h2>
        <div className="flex gap-2">
          <Stars rating={singleData.rating} readOnly={true} />
          {formatDate(singleData.created_at)}
        </div>
        <div className="h-1/2 mt-2 flex flex-col justify-between">
          <p>{singleData.content}</p>
        </div>
        <RedButton>삭제</RedButton>
      </div>
      <StoreImage src={singleData.img} alt="매장 이미지"></StoreImage>
    </ReviewDetailStyle>
  );
};

const Reviews = () => {
  return (
    <div className="w-full">
      {data.reviews.length === 0 ? (
        <h1 className="h-[50vh] flex items-center justify-center">
          작성하신 리뷰가 없습니다.
        </h1>
      ) : (
        <h1>내가 쓴 리뷰 : {data.reviews.length} 개</h1>
      )}
      {data.reviews.map((item, index) => (
        <ReviewDetail key={index} singleData={item} />
      ))}
    </div>
  );
};

export default Reviews;