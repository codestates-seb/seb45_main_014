import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreCard, { FavoriteStoreCard } from '../../assets/StoreCard.jsx';
import storeData from '../../assets/data/storeData';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSignStore } from '../../store/store.js';

const Title = styled.h1`
  margin: 1rem 0;
`;

export const getFavoriteStores = () => {
  return storeData.filter((store) => store.is_favorite === true);
};

const MainPage = () => {
  const favoriteStores = getFavoriteStores();
  const { token } = useSignStore();

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/login`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <div className="flex justify-between">
          <Title>즐겨찾기</Title>
          <Title className="text-blue-500 underline underline-offset-8 hover:text-blue-600 cursor-pointer">
            <Link to="/mypage#favorite">더보기</Link>
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
