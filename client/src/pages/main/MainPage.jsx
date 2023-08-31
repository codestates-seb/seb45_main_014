import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreCard from '../../assets/StoreCard.jsx';
import storeData from '../../assets/data/storeData';
import { styled } from 'styled-components';
import { StoreImage } from '../../assets/Styles.jsx';
import { Link } from 'react-router-dom';

const FavoriteStoreImage = styled(StoreImage)`
  width: 500px;
`;

const Title = styled.h1`
  margin: 1rem 0;
`;

export const FavoriteStoreCard = ({ store }) => {
  return (
    <div className="relative p-2">
      <div className="flex items-center">
        <a href={`/store/${store.id}`}>
          <FavoriteStoreImage src={store.img} alt="즐겨찾기된 매장" />
        </a>
      </div>
      <div className="absolute bottom-6 left-6 font-black text-yellow-200 text-2xl">
        {store.store_name}
      </div>
    </div>
  );
};

export const getFavoriteStores = () => {
  return storeData.filter((store) => store.is_favorite === true);
};

const MainPage = () => {
  const favoriteStores = getFavoriteStores();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,

    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <div className="flex justify-between">
          <Title>즐겨찾기</Title>
          <Title className="text-blue-500 underline underline-offset-8 hover:text-blue-600 cursor-pointer">
            <Link to="/mypage#즐겨찾기">더보기</Link>
          </Title>
        </div>
        <Slider {...settings}>
          {favoriteStores.map((store, index) => (
            <FavoriteStoreCard store={store} key={index} />
          ))}
        </Slider>
      </div>
      <div className="flex flex-col max-w-screen-lg mx-auto">
        <div>
          <Title className="flex">빵집 리스트</Title>
        </div>
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
