import { styled } from 'styled-components';
import { useAuthStore } from '../../store/store.js';
import copy from 'clipboard-copy';
import images from '../../assets/images/Images';
import { useEffect, useState } from 'react';
import StoreBanner from './StoreBanner.jsx';

// 슬라이드 라이브러리
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ShopInfo = ({ store }) => {
  console.log(store);
  const currentUrl = window.location;
  const { isLoggedIn, accessToken } = useAuthStore((state) => state);

  const [isBookmarked, setIsBookmarked] = useState(store.is_favorite);

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
              content: `<div style="width:240px; font-size:19px; text-align:center; padding:4px 0px 8px 0px;">${store.store_name}</div>`,
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

  // const settings = {
  //   infinite: true,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,

  //   autoplay: true,
  //   autoplaySpeed: 3500,
  // };

  const handleBookmark = () => {
    if (!isLoggedIn) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/members/favorites/${store.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setIsBookmarked(res.data.store.is_favorite);
        if (res.data.store.is_favorite) {
          toast.success('즐겨찾기에 추가되었습니다!');
        } else {
          toast.error('즐겨찾기에서 삭제되었습니다!');
        }
      })
      .catch((err) => {
        console.error('즐겨찾기 에러', err);
      });
  };

  return (
    <div className="text-center xl:w-full">
      <div className="flex justify-center w-full h-[500px]">
        {/* <Slider {...settings} className="mb-10 w-11/12">
            {store.menus.map((menu, index) => (
              <StoreBanner menu={menu} key={index} />
            ))}
          </Slider> */}
        <ShopBanner src={store.img} />
      </div>
      <h1 className="xl:text-5xl sm:text-3xl xl:my-10 sm:my-5">
        {store.store_name}
      </h1>
      <StoreLayout>
        <StoreInfoBox>
          <StoreIntro>
            <div className="border-b xl:mr-4 pb-2">
              <h2 className="xl:text-4xl sm:text-2xl">매장 소개</h2>
              <BookmarkShare>
                <button>
                  <ShopBookmarkIcon
                    src={isBookmarked ? images.bookmarkOn : images.bookmarkOff}
                    alt="즐겨찾기 아이콘"
                    onClick={handleBookmark}
                  />
                </button>
                <button>
                  <ShopInfoShareIcon
                    onClick={handleCopyUrl}
                    src={images.share}
                    alt="공유 버튼 아이콘"
                  />
                </button>
              </BookmarkShare>
            </div>
            <StoreInfo>
              <StoreInfoItem>
                <p>영업 시간 :</p>
                <span>{store.running_time}</span>
              </StoreInfoItem>
              <StoreInfoItem>
                <p>매장 평점 :</p>
                <span>{store.rating}</span>
              </StoreInfoItem>
              <StoreInfoItem>
                <p>대표 메뉴 :</p>
                {store.menus.map((menu, index) => {
                  return (
                    <span className="mr-3" key={index}>
                      {menu.menu_name}
                    </span>
                  );
                })}
              </StoreInfoItem>
              <StoreInfoItem>
                <p>매장 주소 :</p>
                <span>{store.address}</span>
              </StoreInfoItem>
              <StoreInfoItem>
                <p>매장 번호 :</p>
                <span>{store.phone_num}</span>
              </StoreInfoItem>
            </StoreInfo>
          </StoreIntro>
          <StoreMap>
            <h2 className="xl:text-4xl sm:text-2xl pb-2">매장 위치 </h2>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
          </StoreMap>
        </StoreInfoBox>
      </StoreLayout>
    </div>
  );
};
export default ShopInfo;

const ShopBookmarkIcon = styled.img`
  width: 24px;
`;

const ShopInfoShareIcon = styled.img`
  width: 24px;
`;

// const StoreIntro = styled.div`
//   max-width: 550px;
//   display: flex;
//   flex-direction: column;
//   text-align: left;
//   border-radius: 8px;
//   flex-grow: 0;

//   @media (max-width: 1280px) {
//     display: flex;
//     margin-bottom: 50px;
//     width: 450px;
//     margin-left: 0px;
//   }
// `;

const ShopBanner = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

const StoreLayout = styled.div`
  max-width: 1070px;
  margin: 0 auto;

  &::after {
    display: block;
    content: '';
    clear: both;
  }
`;

const StoreInfoBox = styled.div`
  display: inline-block;
  max-width: 100%;
  text-align: left;

  @media screen and (max-width: 1280px) {
    display: flex;
    flex-direction: column;
    margin-left: 26%;
  }

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    margin-left: 11%;
  }
`;

const StoreIntro = styled.div`
  display: inline-block;
  width: 535px;
  float: left;
  padding-right: 5px;

  h2 {
    display: inline;
  }
  button {
    display: inline;
  }
  p {
    display: inline;
    margin-right: 5px;
  }
  @media screen and (max-width: 1280px) {
    width: 500px;
    margin-bottom: 10px;
  }
`;

const StoreMap = styled.div`
  display: inline-block;
  max-width: 50%;
  padding-left: 5px;

  @media screen and (max-width: 1280px) {
    padding-left: 0px;
  }
`;

const BookmarkShare = styled.div`
  display: inline-block;
  button {
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const StoreInfo = styled.div``;

const StoreInfoItem = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  p {
    font-size: 20px;
    font-weight: 600;
  }
  span {
    font-size: 20px;
  }
`;
