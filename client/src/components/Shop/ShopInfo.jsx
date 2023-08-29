import { styled } from 'styled-components';
import pb_logo from '../../image/pb_logo.png';
const ShopInfo = () => {
  return (
    <div className="text-center">
      <img
        className="w-72 h-72 mx-0 ml-0"
        src={pb_logo}
        alt="파리바게트 로고"
      />
      <ShopInfoBookMarkButton>즐겨찾기</ShopInfoBookMarkButton>
      <ShopInfoShareButton>공유하기</ShopInfoShareButton>
      <div className="text-center">매장 명</div>
      <div className="flex justify-between">
        <span>매장 소개</span>
        <ShopInfoMap>매장 위치 지도</ShopInfoMap>
      </div>
    </div>
  );
};

export default ShopInfo;
const ShopLogo = styled.img``;

const ShopInfoBookMarkButton = styled.button``;

const ShopInfoShareButton = styled.button``;

const ShopInfoMap = styled.div`
  width: 200px;
  height: 200px;
  background-color: Gray;
`;
