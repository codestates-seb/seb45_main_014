import { useEffect, useState } from 'react';
import Button from '../assets/buttons/Button.jsx';
import { styled } from 'styled-components';
import Reviews from '../components/myPage/Reviews.jsx';
import Orders from '../components/myPage/Orders.jsx';
import Favorites from '../components/myPage/Favorites.jsx';
import axios from 'axios';
import { useAuthStore, useModalStore } from '../store/store.js';

import { Link } from 'react-router-dom';
import EditProfile from '../components/myPage/EditProfile.jsx';
import formatDate from '../utils/formatDate.js';
import ImageUploadModal from '../components/myPage/ImageUploadModal.jsx';

const TabContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-bottom: 2px solid #ccc;

  > li {
    display: flex;
    border-right: 2px solid #ccc;
    height: 3rem;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }
  }

  > li > a {
    display: block;
    width: 100%;
  }

  > li:last-child {
    border-right: none;
  }
`;

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState('리뷰 관리');
  const { isLoggedIn, accessToken } = useAuthStore((state) => state);
  const [member, setMember] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [reviewCount, setReviewCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const openEditProfileModal = () => {
    setEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  // 해시값 인식 후 초기 렌더링 시 해시 값에 따라 탭 변경
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#review') setCurrentTab('리뷰 관리');
    if (hash === '#order') setCurrentTab('주문 내역');
    if (hash === '#favorite') setCurrentTab('즐겨찾기');
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 회원 정보 가져오기
    const getMember = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/member`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setMember(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMember();

    // 리뷰 가져오기
    const getReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              page: 1,
              size: 6,
            },
          },
        );
        setReviews(response.data.reviews);
        setReviewCount(response.data.reviews.length);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();

    // 주문 내역 가져오기
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/orders`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              page: 1,
              size: 16,
            },
          },
        );
        setOrders(response.data.orders);
        setOrderCount(response.data.orders.length);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();

    // 즐겨찾기 가져오기
    const getFavorites = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members/favorites`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              page: 1,
              size: 8,
            },
          },
        );
        setFavorites(response.data.stores);
        setFavoriteCount(response.data.stores.length);
      } catch (error) {
        console.error(error);
      }
    };
    getFavorites();
  }, [isLoggedIn, accessToken]);

  return (
    <div className="max-w-screen-lg mx-auto p-10">
      <div className="flex gap-5">
        <img
          src={member.img}
          alt="유저 이미지"
          className="flex justify-center items-center border-2 w-28 rounded-full"
        ></img>
        <div className="flex flex-col justify-center gap-2">
          <h1 className="">{member.nickname}</h1>
          <div>가입일: {formatDate(member.createdAt)}</div>
          <div className="flex gap-2">
            <Button className="" onClick={openImageModal}>
              이미지 변경
            </Button>
            <Button className="" onClick={openEditProfileModal}>
              프로필 수정
            </Button>
          </div>
        </div>
      </div>
      <TabContainer className="my-5">
        <li className="w-full">
          <Link to="#review" onClick={() => setCurrentTab('리뷰 관리')}>
            리뷰 관리 ({reviewCount})
          </Link>
        </li>
        <li className="w-full">
          <Link to="#order" onClick={() => setCurrentTab('주문 내역')}>
            주문 내역 ({orderCount})
          </Link>
        </li>
        <li className="w-full">
          <Link to="#favorite" onClick={() => setCurrentTab('즐겨찾기')}>
            즐겨찾기 ({favoriteCount})
          </Link>
        </li>
      </TabContainer>
      <div className="flex justify-center">
        {currentTab === '리뷰 관리' && <Reviews data={reviews} />}
        {currentTab === '주문 내역' && <Orders data={orders} />}
        {currentTab === '즐겨찾기' && <Favorites data={favorites} />}
      </div>
      {isEditProfileModalOpen && (
        <EditProfile onClose={closeEditProfileModal} />
      )}
      {isImageModalOpen && <ImageUploadModal onClose={closeImageModal} />}
    </div>
  );
};

export default MyPage;
