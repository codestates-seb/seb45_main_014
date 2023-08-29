import { styled } from 'styled-components';
import shop_logo from '../../image/pb_logo.png';
import { useBookmarkStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import images from '../../assets/images/Images';
import { useEffect } from 'react';

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
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667,
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
      <div className="relative">
        <ShopLogo src={StoreImg} alt="매장 이미지" />
        <button onClick={toggleBookmark}>
          <ShopBookmarkIcon
            src={isBookmarked ? images.bookmarkOn : images.bookmarkOff}
            alt="즐겨찾기 아이콘"
          />
        </button>
        <button>
          <ShopInfoShareIcon
            onClick={handleCopyUrl}
            src={images.shareicon}
            alt="공유 버튼 아이콘"
          />
        </button>
      </div>
      <div className="text-center">{StoreName}</div>
      <div className="flex justify-center mb-6">
        <span>매장 소개</span>
        <ShopInfoMap>매장 지도</ShopInfoMap>
        <div id="map" style={{ width: '500px', height: '400px' }}></div>
      </div>
    </div>
  );
};

export default ShopInfo;

const ShopLogo = styled.img`
  width: 300px;
  height: 220px;
  margin-left: 350px;
`;

const ShopInfoMap = styled.div`
  width: 500px; /* 충분한 크기로 설정 */
  height: 300px; /* 충분한 크기로 설정 */
`;

const ShopBookmarkIcon = styled.img`
  position: absolute;
  left: 380px;
  top: 180px;
  width: 30px;
  height: 30px;
`;

const ShopInfoShareIcon = styled.img`
  position: absolute;
  right: 390px;
  top: 180px;
  width: 30px;
  height: 30px;
`;
