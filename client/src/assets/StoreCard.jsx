import { useBookmarkStore } from '../store/store';
import images from './images/Images';
import { StoreImage } from './Styles.jsx';
import { Link } from 'react-router-dom';

const BookmarkButton = ({ is_favorite, toggleBookmark }) => {
  return (
    <button className="absolute bottom-16 right-1 p-2" onClick={toggleBookmark}>
      <img
        src={is_favorite ? images.bookmarkOn : images.bookmarkOff}
        alt="북마크 아이콘"
        width={24}
        height={24}
      />
    </button>
  );
};

const StoreCard = ({ store }) => {
  const { store_name, region_name, rating, img, is_favorite } = store;

  const formattedStoreRating = rating.toFixed(1);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  return (
    <div className="w-72 relative mx-4">
      <Link to={`/stores/${store.id}`}>
        <StoreImage className="object-cover" src={img} alt="매장 대표 이미지" />
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
            <div>{region_name}</div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              id="eye"
              className="flex-shrink-0 rounded-full"
              width="24"
              height="24"
            >
              <path d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoreCard;
