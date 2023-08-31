import { styled } from 'styled-components';
import StoreCard from '../../assets/StoreCard.jsx';
import storeData from '../../assets/data/storeData';
import { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button.jsx';

const FavoriteStoreCard = ({ store, index }) => {
  return (
    <>
      <div key={index} className="w-1/3">
        <a href={`/store/${store.id}`}>
          <img src={store.img} alt="즐겨찾기된 매장" />
        </a>
        <div>{store.store_name}</div>
      </div>
    </>
  );
};

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [pagedStores, setPagedStores] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPagedStores(storeData.slice(startIndex, endIndex));
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage === Math.ceil(favoriteStores.length / itemsPerPage)) {
      setCurrentPage(1);
    }

    if (currentPage < Math.ceil(favoriteStores.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const favoriteStores = storeData.filter(
    (store) => store.is_favorite === true,
  );

  return (
    <div className="">
      {/* 즐겨찾기된 매장 */}
      <div className="flex justify-between mx-5">
        <h1 className="flex">즐겨찾기</h1>
        <h1 className="flex">더보기</h1>
      </div>
      <div className="flex flex-col items-center overflow-x-auto whitespace-nowrap">
        <div className="flex flex-col items-center">
          <div className="flex">
            {pagedStores.map((store, index) => (
              <FavoriteStoreCard store={store} key={index} />
            ))}
          </div>
          <div className="flex gap-4">
            <Button onClick={handlePrevPage}>이전</Button>
            <Button>{currentPage}</Button>
            <Button onClick={handleNextPage}>다음</Button>
          </div>
        </div>
      </div>
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
