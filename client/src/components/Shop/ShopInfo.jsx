import { styled } from 'styled-components';
import shop_logo from '../../assets/images/pb_logo.png';
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
      <div>
        <div className="flex text-center">
          <ShopLogo src={StoreImg} alt="매장 이미지" />
          <div className="text-center text-3xl pt-14">{StoreName}</div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <div className="flex flex-col text-left mr-6">
          <span className="text-2xl text-left mb-3">매장 소개</span>
          <div className="text-left">매장 소개 내용</div>
        </div>
        <div className="flex flex-col text-left text-2xl relative">
          <span className="mb-3">매장 위치</span>
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
          <div id="map" style={{ width: '300px', height: '280px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;

const ShopLogo = styled.img`
  width: 150px;
  margin-left: 350px;
`;

const ShopBookmarkIcon = styled.img`
  position: absolute;
  width: 24px;
  top: 0px;
  right: 30px;
`;

const ShopInfoShareIcon = styled.img`
  position: absolute;
  width: 24px;
  top: 0px;
  right: 0px;
`;
