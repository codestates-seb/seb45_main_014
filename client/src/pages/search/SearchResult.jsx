import { styled } from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import StoreCard from '../../assets/StoreCard.jsx';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactComponent as Magnifier } from '../../assets/images/magnifier.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../../components/Loading.jsx';

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
  justify-content: space-around;
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
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가
  const location = useLocation();

  // 페이지 번호를 인수로 받아 데이터를 가져오는 함수
  const fetchData = useCallback(
    (pageNumber) => {
      const API = `${process.env.REACT_APP_API_URL}/api`;
      setIsLoading(true); // 요청 시작 시 isLoading을 true로 설정
      axios
        .get(`${API}/search${location.search}&page=${pageNumber}&size=10`)
        .then((res) => {
          const newData = res.data.menus || res.data.stores; // search_target에 따라 데이터를 다르게 가져옴

          if (newData.length === 0) {
            setHasMore(false); // 더 이상 데이터가 없을 때 hasMore를 false로 설정
          } else {
            setData((prevData) => [...prevData, ...newData]); // 기존 데이터에 새로운 데이터를 추가
            if (newData.length < 10) {
              setHasMore(false); // 데이터의 길이가 10보다 작으면 무한 스크롤 중지
            }
            setPage(pageNumber + 1); // 다음 페이지를 위해 페이지 번호를 증가
          }
        })
        .catch((err) => {
          console.log('에러임', err);
          setHasMore(false); // 데이터를 가져오는 동안 에러가 발생하면 hasMore를 false로 설정하여 무한 스크롤을 중지
        })
        .finally(() => {
          setIsLoading(false); // 요청이 완료되면 isLoading을 false로 설정
        });
    },
    [location, setData, setHasMore, setPage],
  );

  // 검색어가 변경될 때마다 데이터를 가져오는 useEffect
  useEffect(() => {
    const keyWord = decodeURI(location.search);

    if (keyWord) {
      setData([]); // 검색어가 변경될 때마다 기존 데이터를 초기화
      setHasMore(true); // 재검색을 할 경우 다시 hasMore를 true로 설정하여 무한 스크롤을 계속할 수 있도록 함
      fetchData(1); // 페이지 로드시 첫 번째 페이지 데이터 로드
    } else {
      setData([]);
    }
  }, [location, fetchData]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('search_keyword');
  const searchTarget = searchParams.get('search_target');

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
          <LoadingSpinner position="absolute" />
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
          next={() => fetchData(page)} // 다음 페이지 데이터 로드
          hasMore={hasMore} // 무한 스크롤을 계속할지 여부
          loader={
            <div className="flex justify-center pt-14" hidden>
              로딩중...
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
