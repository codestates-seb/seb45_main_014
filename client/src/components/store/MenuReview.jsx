import { calculateDate } from '../../utils/calculateDate';
import { useState, useEffect, useRef } from 'react';

const MenuReview = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트되거나 내용이 변경될 때마다 텍스트 높이를 계산
    if (contentRef.current) {
      const contentHeight = contentRef.current.clientHeight;
      setShowButton(contentHeight > 3 * 16); // 3줄 * 16px 폰트 크기
    }
  }, [review.content]);

  const reviewContentHandle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex max-w-4xl w-full mx-auto border-b space-x-8 pt-10 pb-16">
      <div className="text-center flex-shrink-0">
        <img
          className="w-16 h-16 rounded-full"
          src={review.img}
          alt="프로필 이미지"
        />
        <p className="mt-2">{review.member_id}</p>
      </div>
      <div className="grow-1">
        <div className="flex items-center mb-2">
          <p className="text-gray-500 text-sm">
            {calculateDate(review.created_at)} 일전
          </p>
          <p className="ml-4 text-gray-500 text-sm">별점: {review.star}</p>
        </div>
        <div
          className={`break-word ${isExpanded ? 'line-clamp-3' : ''}`}
          ref={contentRef}
        >
          {review.content}
        </div>
        {showButton && (
          <button className="mt-2" onClick={reviewContentHandle}>
            {isExpanded ? '내용 더보기' : '내용 숨기기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuReview;
