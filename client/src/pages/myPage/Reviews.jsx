import { styled } from 'styled-components';
import { Stars } from '../../components/Stars.jsx';

const ReviewDetailStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ReviewDetail = () => {
  return (
    <ReviewDetailStyle>
      <div>
        <h2>{'맛있는 빵집 1004호점'}</h2>
        <div className="flex">
          <Stars rating={3} />
          {'2023-08-20'}
        </div>
        <div className="mt-2">너무 맛있어용!</div>
      </div>
      <div>이미지가 들어갈 곳입니다....</div>
    </ReviewDetailStyle>
  );
};

const Reviews = () => {
  return (
    <div className="w-full">
      <h1>내가 쓴 리뷰 : {0} 개</h1>
      <ReviewDetail />
      <ReviewDetail />
      <ReviewDetail />
    </div>
  );
};

export default Reviews;
