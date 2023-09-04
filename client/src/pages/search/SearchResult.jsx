import { styled } from 'styled-components';
import storeData from '../../assets/data/storeData';
import { useState, useEffect } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useSearchStore } from '../../store/store';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchResult = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { searchQuery } = useSearchStore();
  const [resultQuery, setResultQuery] = useState('');

  // 나중에 API 구현했을 떄?
  // const API = 'localhost:3000';
  // useEffect(() => {
  //   const keyWord = decodeURI(location.search);

  //   axios
  //     .get(`${API}/search/${keyWord}`)
  //     .then((res) => setData(res.data.stores))
  //     .catch((err) => console.log('에러임', err));

  //   if (!keyWord) {
  //     axios
  //       .get(`${API}/search`)
  //       .then((res) => setData(res.data.stores))
  //       .catch((err) => console.log('에러임', err));
  //   }
  // }, [location]);
  useEffect(() => {
    if (searchQuery) {
      const filteredData = storeData.filter((data) =>
        data.store_name.includes(searchQuery),
      );
      setData(filteredData);
      setResultQuery(searchQuery);
      console.log(`키워드는 ${resultQuery} 입니다.`);
    } else {
      setData(storeData);
    }
  }, [location]);

  return (
    <Wrapper>
      <div className="flex text-[20px] w-[76%] content-start pt-3 pb-3">
        {!data.length ? (
          `검색결과가 없습니다.`
        ) : (
          <span className="flex">
            <p className="text-[#debe8f] font-semibold">{`'${resultQuery}'`}</p>
            <p>에 대한 검색결과는 총 {data.length}건 입니다.</p>
          </span>
        )}
      </div>
      <DataContainer>
        {data.map((store, idx) => (
          <StoreCard key={idx} store={store} />
        ))}
      </DataContainer>
    </Wrapper>
  );
};

export default SearchResult;
