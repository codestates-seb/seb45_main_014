import { styled } from 'styled-components';
import StoreCard from '../../assets/StoreCard.jsx';
import storeData from '../../assets/data/storeData';
import { useState, useEffect, useRef } from 'react';

const FavoriteStoreCard = ({ store, index }) => {
  return (
    <>
      <div key={index}>
        <a href={`/store/${store.id}`}>
          <img src={store.img} alt="즐겨찾기된 매장" />
        </a>
        <div>{store.store_name}</div>
      </div>
    </>
  );
};

const BannerItem = styled.div`
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.active ? '1' : '0')};
`;

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const favoriteStores = storeData.filter(
    (store) => store.is_favorite === true,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % favoriteStores.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [favoriteStores.length]);

  return (
    <div className="">
      {/* 즐겨찾기된 매장 */}
      <div className="flex justify-center mx-5">
        <h1 className="flex  justify-center items-center">즐겨찾기</h1>
      </div>
      <div className="flex flex-col items-center overflow-x-auto whitespace-nowrap">
        <div className="flex">
          {favoriteStores.map((store, index) => (
            <BannerItem key={index} active={index === currentIndex}>
              <FavoriteStoreCard store={store} key={index} />
            </BannerItem>
          ))}
          {/* 더보기 버튼 임시 주석처리
          <div className="flex flex-col items-center justify-center hover:bg-gray-200 w-40">
           
            <a href="/mypage#favorites">
              <img
                src={images.arrow}
                alt="더보기 버튼"
                width={'70px'}
                height={'70px'}
              />
            </a>
            <div>더보기</div> 
          </div> */}
        </div>
      </div>
      <div className="flex flex-col max-w-screen-md mx-auto">
        <h1 className="flex justify-center">빵집 리스트</h1>
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
