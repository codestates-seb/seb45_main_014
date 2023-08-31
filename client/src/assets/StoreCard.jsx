import { styled } from 'styled-components';
import { useBookmarkStore } from '../store/store';
import images from './images/Images';
import { StoreImage } from './Styles.jsx';

const StoreCard = () => {
  // 데이터 불러오기 전 하드 코딩
  // API 생기면 이미지 클릭 시 상세 페이지로 이동하게 변경
  const storeName = '파리바게트 본점';
  const storeLocation = '서울시 강남구';
  const storeRating = 5.0;
  const storeViews = 10000;
  const formattedStoreRating = storeRating.toFixed(1);
  const formattedStoreViews = storeViews.toLocaleString();

  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  return (
    <div className="w-72 relative m-5">
      <StoreImage
        src={`https://picsum.photos/300/200`}
        alt="매장 대표 이미지"
      />
      <button
        className="absolute bottom-16 right-1 p-2"
        onClick={toggleBookmark}
      >
        <img
          src={isBookmarked ? images.bookmarkOn : images.bookmarkOff}
          alt="북마크 아이콘"
          width={24}
          height={24}
        />
      </button>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <h2>{storeName}</h2>
            <h2 className="ml-2 text-yellow-500">{formattedStoreRating}</h2>
          </div>
          <div>{storeLocation}</div>
        </div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            id="eye"
            className="flex-shrink-0"
            width="24"
            height="24"
          >
            <path d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
          </svg>
          <div className="ml-2">{formattedStoreViews}</div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;