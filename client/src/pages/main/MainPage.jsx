import StoreCard from '../../assets/StoreCard.jsx';

const MainPage = () => {
  return (
    <div className="flex flex-wrap max-w-screen-lg mx-auto justify-center">
      {/* // 추후 데이터 불러오는 것으로 변경 */}
      <StoreCard />
      <StoreCard />
    </div>
  );
};

export default MainPage;
