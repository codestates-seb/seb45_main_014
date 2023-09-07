import { useBookmarkStore } from '../store/store';
import images from './images/Images';
import { StoreImage } from './Styles.jsx';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const BookmarkButton = ({ is_favorite, toggleBookmark }) => {
  return (
    <div className="absolute bottom-16 right-1 p-2 w-[40px] h-[40px] bg-black bg-opacity-50 rounded-full">
      <button onClick={toggleBookmark}>
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

const FavoriteStoreImage = styled(StoreImage)`
  width: 500px;
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
  const { store_name, region_name, rating, img, is_favorite } = store;

  const formattedStoreRating = rating.toFixed(1);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  return (
    <div className="w-72 relative m-2">
      <Link to={`/stores/${store.id}`}>
        <StoreImage
          className="object-cover mb-1"
          src={img}
          alt="매장 대표 이미지"
        />
      </Link>
      <BookmarkButton
        is_favorite={is_favorite}
        toggleBookmark={() => toggleBookmark(store.id)}
      />
      <Link to={`/stores/${store.id}`}>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex">
              <h2>{store_name}</h2>
              <h2 className="ml-2 text-yellow-500">{formattedStoreRating}</h2>
            </div>
            <div className="">{region_name}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoreCard;
