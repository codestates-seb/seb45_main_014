import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactComponent as Magnifier } from '../../assets/images/magnifier.svg';

const Wrapper = styled.section`
  max-width: 650px;
  height: 100%;
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

const NoResult = styled.div`
  display: flex;
  padding: 40px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600px;
  font-size: 20px;
  font-weight: 500;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  color: rgb(181, 181, 181);
`;

const SearchResult = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  const API = `${process.env.REACT_APP_API_URL}/api`;
  useEffect(() => {
    const keyWord = decodeURI(location.search);

    if (keyWord) {
      axios
        .get(`${API}/search${keyWord}`)
        .then((res) => setData(res.data.stores))
        .catch((err) => console.log('에러임', err));
    } else {
      setData([]);
    }
  }, [location, API]);

  // query string에서 search_keyword를 가져옴
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search_keyword');

  return (
    <Wrapper>
      <div className="text-[24px] pb-3">
        <span className="flex justify-center">
          <p className="text-[#debe8f] font-semibold">{`'${query}'`}</p>
          <p>에 대한 검색결과</p>
        </span>
      </div>
      {data.length === 0 && (
        <NoResult>
          <Magnifier />
          <p className="pt-8">검색된 결과가 없습니다.</p>
        </NoResult>
      )}
      <DataContainer>
        {data.map((store, idx) => (
          <StoreCard key={idx} store={store} />
        ))}
      </DataContainer>
    </Wrapper>
  );
};

export default SearchResult;
