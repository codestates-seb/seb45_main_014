import { calculateDate } from '../../utils/calculateDate';

const MenuReview = ({ review }) => {
  return (
    <div className="flex mt-6 mb-6 justify-center items-center">
      <div className="text-center mr-3">
        <div>
          <img
            className="w-16 h-16 rounded-full"
            src={review.img}
            alt="프로필 이미지"
          />
        </div>
        <div>
          <span>{review.member_id}</span>
        </div>
      </div>
      <div className="w-80">
        {/* 요소 크기를 고정 */}
        <div className="flex items-center">
          <div className="mr-4">별점 : {review.star}</div>
          <p>{calculateDate(review.created_at)} 일전</p>
        </div>
        <span className="whitespace-pre-line break-all">{review.content}</span>
        <div className="">이미지 출력</div>
      </div>
    </div>
  );
};

export default MenuReview;
