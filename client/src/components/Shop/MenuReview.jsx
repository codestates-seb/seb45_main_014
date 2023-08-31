import { styled } from 'styled-components';

const MenuReview = ({ reviews }) => {
  return (
    <div className="flex">
      <div className="flex flex-col text-center mr-3">
        <div>
          <img
            className="w-16 h-16 rounded-full"
            src={reviews.img}
            alt="프로필 이미지"
          />
        </div>
        <span>{reviews.member_id}</span>
        <div>별점 : {reviews.star}</div>
      </div>
      <div>
        <p>{reviews.created_at}</p>
        <span>{reviews.content}</span>
        <div className="flex">이미지</div>
      </div>
    </div>
  );
};

export default MenuReview;
