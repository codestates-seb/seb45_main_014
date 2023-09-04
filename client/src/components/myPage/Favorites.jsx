import StoreCard from '../../assets/StoreCard.jsx';
import { getFavoriteStores } from '../../pages/main/MainPage.jsx';

const Favorites = () => {
  const favoriteStores = getFavoriteStores();

  return (
    <>
      <div className="flex flex-wrap justify-center m-4">
        {favoriteStores.map((store, index) => (
          <StoreCard key={index} store={store} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
