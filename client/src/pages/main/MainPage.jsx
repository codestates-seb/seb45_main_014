import StoreCard from '../../assets/StoreCard.jsx';
import images from '../../assets/images/Images.js';

const MainPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      {/* 즐겨찾기된 매장 */}
      {/* 즐겨찾기 모음 중 랜덤한 4개를 렌더링 할 것이냐? */}
      <div className="flex justify-center mx-5">
        <h1 className="flex  justify-center items-center">즐겨찾기</h1>
      </div>
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
          </div>
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
