import { styled } from 'styled-components';
import { useBookmarkStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import images from '../../assets/images/Images';
import { useEffect } from 'react';
import StoreBanner from './StoreBanner.jsx';

// 슬라이드 라이브러리
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShopInfo = ({ store }) => {
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const currentUrl = window.location;

  const handleCopyUrl = () => {
    copy(currentUrl);
    alert('URL이 복사되었습니다.');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 서버에서 받아오는 좌표
          level: 2,
        };

        // Create the map
        const map = new window.kakao.maps.Map(container, options);

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(`${store.address}`, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0px 0px 0px;">${store.store_name}</div>`,
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      });
    };

    // Append the script element to the document head
    document.head.appendChild(script);

    // Clean up by removing the script element when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [store.address, store.store_name]);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,

    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div className="text-center">
      <div>
        <div className="flex justify-center">
          {/* <Slider {...settings} className="mb-10 w-11/12">
            {storemenuData.map((menu, index) => (
              <StoreBanner menu={menu} key={index} />
            ))}
          </Slider> */}
        </div>
        <div className="flex justify-center mb-6">
          {/* <img className="w-24" src={shop_logo} alt="매장 로고" /> */}
          <h1 className="text-left text-5xl pt-8 w-1/6 ">{store.store_name}</h1>
        </div>
        <div className="flex justify-center space-x-8 mb-8">
          <StoreIntro>
            <div className="flex text-4xl mb-3 pb-1.5 border-b">
              <strong className="mr-3">매장 소개</strong>
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
                <p className="mr-2">대표 메뉴</p>
                <div className="flex flex-wrap max-w-[400px]">
                  {store.menus.map((menu, index) => {
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
          </StoreIntro>
          <div className="flex flex-col text-left text-2xl">
            <span className="mb-3">매장 위치</span>
            <div
              className="rounded-lg"
              id="map"
              style={{ width: '450px', height: '400px' }}
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
  margin-right: 10px;
`;

const ShopInfoShareIcon = styled.img`
  width: 24px;
`;

const StoreIntro = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: 8px;
`;
