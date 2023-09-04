import { styled } from 'styled-components';
import storeData from '../../assets/data/storeData';
import { useState, useEffect } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useSearchStore } from '../../store/store';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.section`
  max-width: 650px;
  margin: 0 auto 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const DataContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  }, [location, resultQuery, searchQuery]);

  return (
    <Wrapper>
      <div className="text-[20px] pb-3">
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
