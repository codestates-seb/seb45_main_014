import images from '../../assets/images/Images.js';
import { calculateDate } from '../../utils/calculateDate';
import { useState, useEffect, useRef } from 'react';

const StoreReviewTab = ({ reviewData }) => {
  return (
    <div className="flex flex-col w-[1050px]">
      {reviewData.map((review) => {
        return <ReviewItem key={review.id} data={review} />;
      })}
    </div>
  );
};

export default StoreReviewTab;

export const Stars = ({ rating, readOnly }) => {
  return (
    <div className="flex mr-3">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <div
          key={star}
          className={`star ${star <= rating ? 'active' : ''}`}
          role={readOnly ? null : 'button'}
        >
          <img
            src={star <= rating ? images.bookmarkOn : images.bookmarkOff}
            alt={`별점 ${star}`}
            width="20px"
            height="20px"
          />
        </div>
      ))}
    </div>
  );
};

export const ReviewItem = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트되거나 내용이 변경될 때마다 텍스트 높이를 계산
    if (contentRef.current) {
      const contentHeight = contentRef.current.clientHeight;
      setShowButton(contentHeight > 3 * 16); // 3줄 * 16px 폰트 크기
    }
  }, [data.content]);

  const reviewContentHandle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex p-[10px] border-b">
      <div className="grow">
        <div className="flex mb-1">
          <span className="mr-3">{data.nickname}</span>
          <div>{calculateDate(data.created_at)}일 전</div>
        </div>
        <div className="flex mb-3">
          <div>
            <Stars rating={data.rating} readOnly={true} />
          </div>
        </div>
        <div
          className={`break-word ${isExpanded ? 'line-clamp-3' : ''}`}
          ref={contentRef}
        >
          {data.content}
        </div>
        {showButton && (
          <button className="mt-2" onClick={reviewContentHandle}>
            {isExpanded ? '내용 더보기' : '내용 숨기기'}
          </button>
        )}
      </div>
      <img
        className="w-[300px] h-[200px] object-cover rounded-lg ml-3 "
        src={data.img}
        alt="후기 이미지"
      />
    </div>
  );
};
