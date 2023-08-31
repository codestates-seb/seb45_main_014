import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreCard from '../../assets/StoreCard.jsx';
import storeData from '../../assets/data/storeData';

const FavoriteStoreCard = ({ store }) => {
  return (
    <div className="relative p-4">
      <div className="flex items-center h-[200px]">
        <a href={`/store/${store.id}`}>
          <img src={store.img} alt="즐겨찾기된 매장" height={'100%'} />
        </a>
      </div>
      <div className="absolute bottom-6 left-6 font-black text-yellow-200 text-2xl">
        {store.store_name}
      </div>
    </div>
  );
};

const MainPage = () => {
  const favoriteStores = storeData.filter(
    (store) => store.is_favorite === true,
  );

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,

    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="">
      <div className="flex justify-between mx-5">
        <h1>즐겨찾기</h1>
        <h1>더보기</h1>
      </div>
      <Slider {...settings}>
        {favoriteStores.map((store, index) => (
          <FavoriteStoreCard store={store} key={index} />
        ))}
      </Slider>
      <div className="flex flex-col max-w-screen-md mx-auto">
        <h1 className="flex flex-start w-full">빵집 리스트</h1>
        <div className="flex flex-wrap justify-center">
          {storeData.map((store, index) => (
            <StoreCard key={index} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
