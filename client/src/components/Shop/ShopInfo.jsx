import { styled } from 'styled-components';
import shop_logo from '../../image/pb_logo.png';
import { useBookmarkStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import React, { useEffect } from 'react';
import images from '../../assets/images/Images';

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
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=b676bffeb7b033ef9950c49bb688d15c&libraries=services,drawing';
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('kakaomap');

        // Check if the LatLng constructor is available before using it
        if (window.kakao.maps.LatLng) {
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978),
            level: 3,
          };
          new window.kakao.maps.Map(container, options);
        } else {
          console.error('LatLng constructor is not available.');
        }
      }
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
