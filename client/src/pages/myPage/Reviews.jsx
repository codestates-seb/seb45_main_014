import { styled } from 'styled-components';
import { Stars } from '../../components/Stars.jsx';
import data from '../../assets/data/myPageReviewData.js';
import { StoreImage } from '../../assets/Styles.jsx';

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
      <div>
        <h2>{singleData.store_name}</h2>
        <div className="flex">
          <Stars rating={singleData.rating} />
          {singleData.created_at}
        </div>
        <div className="mt-2">{singleData.content}</div>
      </div>
      <StoreImage src={singleData.img} alt="매장 이미지"></StoreImage>
    </ReviewDetailStyle>
  );
};

const Reviews = () => {
  return (
    <div className="w-full">
      <h1>내가 쓴 리뷰 : {data.reviews.length} 개</h1>
      {data.reviews.map((item, index) => (
        <ReviewDetail key={index} singleData={item} />
      ))}
    </div>
  );
};

export default Reviews;
