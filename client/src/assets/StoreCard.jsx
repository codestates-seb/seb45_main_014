import { styled } from 'styled-components';

const StoreImage = styled.img`
  width: 300px;
  height: 200px;
`;

const StoreCard = () => {
  const storeName = '파리바게트 본점';
  const storeLocation = '서울시 강남구';
  const storeRating = 5.0;
  const storeViews = 10000;
  const formattedStoreRating = storeRating.toFixed(1);
  const formattedStoreViews = storeViews.toLocaleString();

  return (
    <div className="w-72 relative">
      <StoreImage
        src={`https://picsum.photos/300/200`}
        alt="매장 대표 이미지"
      />
      <button className="absolute top-0 right-0 p-2">
        {/* SVG나 북마크 아이콘 */}
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
