import { styled } from 'styled-components';
import shop_logo from '../../assets/images/pb_logo.png';
import { useBookmarkStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import images from '../../assets/images/Images';
import { useEffect } from 'react';
import StoreBanner from './StoreBanner.jsx';
import storemenuData from '../../assets/data/menuData.js';

const ShopInfo = ({ store, menu }) => {
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

  return (
    <div className="text-center">
      <div>
        <StoreBanner menuimgs={storemenuData[0]} />
        <div className="flex justify-center mb-6 ">
          <img className="w-24" src={shop_logo} alt="매장 로고" />
          <div className="text-left text-3xl mr-36 pt-8 w-1/6">
            {store.store_name}
          </div>
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
          <div className="flex flex-col text-left border rounded-lg p-4">
            <div className="text-2xl mb-3">매장 소개</div>
            <div className="flex flex-col">
              <div className="flex mr-3  mb-6">
                <p className="mr-2">영업 시간</p>
                <p>{store.region_name}</p>
              </div>
              <div className="flex mr-3 mb-6">
                <p className="mr-2">매장 평점</p>
                <p>{store.rating}</p>
              </div>
              <div className="flex mr-3 mb-6">
                <p className="mr-2">매장 메뉴</p>
                <div className="flex flex-wrap max-w-[400px]">
                  {menu.map((menu, index) => {
                    return (
                      <p className="mr-3" key={index}>
                        {menu.menu_name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex mr-3 mb-6">
                <p className="mr-2">매장 주소</p>
                <p>{store.region_name}</p>
              </div>
              <div className="flex mr-6 ">
                <p className="mr-2">매장 번호</p>
                <p>{store.phone_num}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-left text-2xl">
            <span className="mb-3">매장 위치</span>
            <div
              className="rounded-s-lg mb-8"
              id="map"
              style={{ width: '350px', height: '280px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopInfo;

const ShopBookmarkIcon = styled.img`
  width: 24px;
  margin-right: 20px;
  padding-top: 150%;
`;

const ShopInfoShareIcon = styled.img`
  width: 24px;
`;
