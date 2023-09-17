import { useAuthStore, useBookmarkStore } from '../store/store';
import { handleImgError } from '../utils/handleImgError';
import images from './images/Images';
import { StoreImage } from './Styles.jsx';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const BookmarkButton = ({ is_favorite, id, accessToken }) => {
  const { toggleBookmark } = useBookmarkStore();

  const handleBookmark = () => {
    toggleBookmark(id, accessToken);
  };

  return (
    <div className="absolute bottom-16 right-1 p-2 w-[40px] h-[40px] bg-black bg-opacity-50 rounded-full hover:bg-opacity-100 transition duration-300 ease-in-out">
      <button onClick={handleBookmark}>
        <img
          src={is_favorite ? images.bookmarkOn : images.bookmarkOff}
          alt="북마크 아이콘"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const FavoriteStoreImage = styled(StoreImage)`
  width: 500px;
  height: 300px;
`;

export const FavoriteStoreCard = ({ store }) => {
  return (
    <div className="relative p-2">
      <div className="flex items-center">
        <a href={`/stores/${store.id}`}>
          <FavoriteStoreImage src={store.img} alt="즐겨찾기된 매장" />
        </a>
      </div>
      <div className="absolute bottom-6 left-6 font-black text-yellow-400 text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {store.store_name}
      </div>
    </div>
  );
};

const StoreCard = ({ store }) => {
  const {
    store_name,
    region_name,
    rating,
    img,
    is_favorite,
    id,
    menu_name,
    price,
  } = store;

  const formattedStoreRating = rating ? rating.toFixed(1) : null;

  const { accessToken } = useAuthStore((state) => state);

  // 검색 타겟에 따른 조건부 렌더링
  return (
    <div className="w-72 relative m-2">
      <Link to={`/stores/${id}`}>
        <div className=" overflow-hidden rounded-lg">
          <StoreImage
            className="object-cover"
            src={img}
            alt="대표 이미지"
            onError={handleImgError}
          />
        </div>
      </Link>
      {is_favorite && (
        <BookmarkButton
          is_favorite={is_favorite}
          id={id}
          accessToken={accessToken}
        />
      )}
      <Link to={`/stores/${id}`}>
        {menu_name ? (
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex">
                <h2>{menu_name}</h2>
              </div>
              <div className="text-gray-400 pb-2">
                <span>{store_name}</span>
              </div>
              <Price>
                <span>{price.toLocaleString()}원</span>
              </Price>
            </div>
          </div>
        ) : (
          <div className="flex justify-between pr-3">
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <h2>{store_name}</h2>
              </div>
              <div className="text-gray-400">{region_name}</div>
            </div>
            <div className="flex gap-2 h-full justify-center items-center">
              <img src={images.bookmarkOn} alt="별점" width={20} height={20} />
              <h2 className="text-yellow-500 font-extrabold flex items-center justify-center">
                {formattedStoreRating}
              </h2>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default StoreCard;
