import { styled } from 'styled-components';
import shop_logo from '../../image/pb_logo.png';
const ShopInfo = () => {
  return (
    <div className="text-center">
      <ShopLogo src={shop_logo} alt="매장 이미지" />
      <ShopInfoBookMarkButton>즐겨찾기</ShopInfoBookMarkButton>
      <ShopInfoShareButton>공유하기</ShopInfoShareButton>
      <div className="text-center">매장 명</div>
      <div className="flex justify-center">
        <span>매장 소개</span>
        <ShopInfoMap>매장 위치 지도</ShopInfoMap>
      </div>
    </div>
  );
};

export default ShopInfo;
const ShopLogo = styled.img`
  width: 250px;
  height: 200px;
  margin-left: 35%;
`;

const ShopInfoBookMarkButton = styled.button``;

const ShopInfoShareButton = styled.button``;

const ShopInfoMap = styled.div`
  width: 200px;
  height: 200px;
  background-color: Gray;
  margin-left: 20px;
`;
