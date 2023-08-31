import { styled } from 'styled-components';
import storeData from '../../assets/data/storeData';
import { useState, useEffect } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchResult = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(storeData);
  }, []);

  return (
    <Wrapper>
      검색 결과
      <DataContainer>
        {data.map((item) => (
          <StoreCard
            key={item.id}
            storeName={item.store_name}
            storeLocation={item.region_name}
            storeRating={item.rating}
          />
        ))}
      </DataContainer>
    </Wrapper>
  );
};

export default SearchResult;
