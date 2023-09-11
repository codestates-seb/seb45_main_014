import { styled } from 'styled-components';
import { Stars } from '../../components/Stars.jsx';
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

const ReviewDetail = ({ data }) => {
  return (
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
        <RedButton>삭제</RedButton>
      </div>
      <StoreImage src={data.img} alt="매장 이미지"></StoreImage>
    </ReviewDetailStyle>
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
