import { styled } from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactComponent as Magnifier } from '../../assets/images/magnifier.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingComponent from '../../components/myPage/MyPageLoading.jsx';

const Wrapper = styled.section`
  max-width: 1024px;
  height: 100%;
  margin: 0 auto 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const DataContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가
  const location = useLocation();
  const searchQuery = location.search;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search_keyword');
  const searchTarget = searchParams.get('search_target');

  const fetchMoreData = () => {
    setTimeout(() => {
      fetchData(page);
    }, 1000);
  };

  // 검색어가 변경될 때마다 데이터를 가져오는 useEffect

  const fetchData = useCallback(
    (pageNumber) => {
      setHasMore(true);
      setIsLoading(true); // 요청이 시작되면 isLoading을 true로 설정

      axios
        .get(`${process.env.REACT_APP_API_URL}/api/search${searchQuery}`, {
          params: {
            page: pageNumber,
            size: 9,
          },
        })
        .then((res) => {
          const newData = res.data.menus || res.data.stores;
          setPage(pageNumber + 1);
          setData((prevData) => [...prevData, ...newData]);
          if (newData.length < 9) {
            setHasMore(false);
            setIsLoading(false); // 요청이 끝나면 isLoading을 false로 설정
          }
        })
        .catch((err) => {
          console.log('검색 페이지에서 에러남', err);
        })
        .finally(() => {
          setIsLoading(false); // 요청이 끝나면 isLoading을 false로 설정
        });
    },
    [searchQuery],
  );

  useEffect(() => {
    const keyWord = decodeURI(searchQuery);

    if (keyWord) {
      setData([]); // 검색어가 변경될 때마다 기존 데이터를 초기화
      setHasMore(true); // 재검색을 할 경우 다시 hasMore를 true로 설정하여 무한 스크롤을 계속할 수 있도록 함
      fetchData(1);
    } else {
      setData([]);
    }
  }, [location, searchQuery, fetchData]);

  return (
    <Wrapper>
      <div className="text-[24px] pb-3">
        <span className="flex justify-center">
          <p className="text-[#debe8f] font-semibold">{`'${query}'`}</p>
          <p>에 대한 검색결과</p>
        </span>
      </div>
      {/* 요청이 pending 후에 NoResult를 표시 */}
      {isLoading ? (
        <div className="flex justify-center pt-14">
          <LoadingComponent />
        </div>
      ) : data.length === 0 ? (
        <NoResult>
          <Magnifier />
          <p className="pt-8">검색된 결과가 없습니다.</p>
        </NoResult>
      ) : (
        // 무한 스크롤 구현
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData} // 다음 페이지 데이터 로드
          hasMore={hasMore} // 무한 스크롤을 계속할지 여부
          loader={
            <div className="flex justify-center pt-14">
              <LoadingComponent />
            </div>
          }
        >
          <DataContainer>
            {data.map((item, idx) => (
              <StoreCard key={idx} store={item} />
            ))}
          </DataContainer>
        </InfiniteScroll>
      )}
    </Wrapper>
  );
};

export default SearchResult;
