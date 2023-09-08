import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactComponent as Magnifier } from '../../assets/images/magnifier.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();

  const API = `${process.env.REACT_APP_API_URL}/api`;

  useEffect(() => {
    const keyWord = decodeURI(location.search);

    if (keyWord) {
      fetchData(1); // 페이지 로드시 첫 번째 페이지 데이터 로드
    } else {
      setData([]);
    }
  }, [location, API]);

  const fetchData = (pageNumber) => {
    axios
      .get(`${API}/search${location.search}&page=${pageNumber}&size=10`)
      .then((res) => {
        const newData = res.data.stores;
        if (newData.length === 0) {
          setHasMore(false); // 더 이상 데이터가 없을 때 hasMore를 false로 설정
        } else {
          setData((prevData) => [...prevData, ...newData]);
          setPage(pageNumber + 1);
        }
      })
      .catch((err) => {
        console.log('에러임', err);
        setHasMore(false); // 데이터를 가져오는 동안 에러가 발생하면 hasMore를 false로 설정하여 무한 스크롤을 중지
      });
  };

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
      {/*무한 스크롤 구현*/}
      <InfiniteScroll
        dataLength={data.length}
        next={() => fetchData(page)} // 다음 페이지 데이터 로드
        hasMore={hasMore} // 무한 스크롤을 계속할지 여부
        loader={<h4>Loading...</h4>}
      >
        <DataContainer>
          {data.map((store, idx) => (
            <StoreCard key={idx} store={store} />
          ))}
        </DataContainer>
      </InfiniteScroll>
    </Wrapper>
  );
};

export default SearchResult;
