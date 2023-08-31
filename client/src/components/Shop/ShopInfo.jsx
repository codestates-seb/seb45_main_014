import { styled } from 'styled-components';
import shop_logo from '../../assets/images/pb_logo.png';
import { useBookmarkStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import images from '../../assets/images/Images';
import { useEffect } from 'react';
import StoreRollingBanner from './StoreRollingBanner.jsx';
const ShopInfo = () => {
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const currentUrl = window.location.origin;

  const handleCopyUrl = () => {
    copy(currentUrl);
    alert('URL이 복사되었습니다.');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_APP_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 서버에서 받아오는 좌표
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701, // 서버에서 받아온 좌표
          126.570667, // 서버에서 받아온 좌표
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const StoreName = '파리 바게트';
  const StoreImg = shop_logo;

  return (
    <div className="text-center border-b">
      <StoreRollingBanner />
      <div>
        <div className="flex justify-center mb-6">
          <div className="text-left text-3xl mr-32 ">{StoreName}</div>
          <div>
            <button onClick={toggleBookmark}>
              <ShopBookmarkIcon
                src={isBookmarked ? images.bookmarkOn : images.bookmarkOff}
                alt="즐겨찾기 아이콘"
              />
            </button>
            <button>
              <ShopInfoShareIcon
                onClick={handleCopyUrl}
                src={images.share}
                alt="공유 버튼 아이콘"
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col text-left">
            <div className="text-2xl">매장 소개</div>
            <div>
              <p>매장 주소</p>
              <p>
                경기도 남양주시 조안면 북한강로 908 지번 경기도 남양주시 조안면
                삼봉리 193-2
              </p>
            </div>
          </div>
          <div className="flex flex-col text-left text-2xl">
            <span className="mb-3">매장 위치</span>
            <div id="map" style={{ width: '300px', height: '280px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopInfo;

const ShopLogo = styled.img`
  width: 250px;
`;

const ShopBookmarkIcon = styled.img`
  width: 24px;
  margin-right: 20px;
`;

const ShopInfoShareIcon = styled.img`
  width: 24px;
`;
