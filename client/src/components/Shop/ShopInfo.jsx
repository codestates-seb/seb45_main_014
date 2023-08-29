import { styled } from 'styled-components';
import shop_logo from '../../assets/images/pb_logo.png';
import { useBookmarkStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import React, { useEffect } from 'react';
import images from '../../assets/images/Images';
import { Map } from 'react-kakao-maps-sdk';

const ShopInfo = () => {
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const currentUrl = window.location.origin;

  const handleCopyUrl = () => {
    copy(currentUrl);
    alert('URL이 복사되었습니다.');
  };

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
            src={images.share}
            alt="공유 버튼 아이콘"
          />
        </button>
      </div>
      <div className="text-center m-3 w-">{StoreName}</div>
      <div className="flex justify-center mb-6">
        <span className="mr-6">매장 소개</span>
        <Map
          center={{ lat: 35.955406, lng: 126.978647 }} // 지도의 중심 좌표
          style={{ width: '400px', height: '250px' }} // 지도 크기
          level={3} // 지도 확대 레벨
        ></Map>
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
