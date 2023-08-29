import StoreCard from '../../assets/StoreCard.jsx';

const MainPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 즐겨찾기된 매장 */}
      {/* 즐겨찾기 모음 중 랜덤한 4개를 렌더링 할 것이냐? */}
      <h1 className="flex justify-center">즐겨찾기</h1>
      <div className="flex flex-col items-center overflow-x-auto whitespace-nowrap">
        <div className="flex">
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
          <StoreCard />
        </div>
      </div>

      {/* // 추후 데이터 불러오는 것으로 변경 */}
      <h1 className="flex justify-center">빵집 리스트</h1>
      <div className="flex flex-wrap justify-center">
        <StoreCard />
        <StoreCard />
      </div>
    </div>
  );
};

export default MainPage;
