import { useEffect, useState } from 'react';
import Button from '../assets/buttons/Button.jsx';
import { styled } from 'styled-components';
import Reviews from '../components/myPage/review/Reviews.jsx';
import Orders from '../components/myPage/order/Orders.jsx';
import Favorites from '../components/myPage/favorite/Favorites.jsx';
import axios from 'axios';
import { useAuthStore } from '../store/store.js';

import { Link, useNavigate } from 'react-router-dom';
import EditProfile from '../components/myPage/EditProfile.jsx';
import formatDate from '../utils/formatDate.js';
import ImageUploadModal from '../components/myPage/ImageUploadModal.jsx';
import { RedButton } from '../assets/buttons/RedButton.jsx';

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

    &.active {
      background-color: #ddd;
    }

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
  const { isLoggedIn, accessToken, deleteMember } = useAuthStore(
    (state) => state,
  );
  const [member, setMember] = useState([]);

  const [reviewCount, setReviewCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleDeleteMemberButton = () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      deleteMember();
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    // 각 탭 갯수 가져오기
    const fetchInitialData = async () => {
      const tabs = ['리뷰 관리', '주문 내역', '즐겨찾기'];
      for (const tab of tabs) {
        let apiUrl = '';
        if (tab === '리뷰 관리')
          apiUrl = `${process.env.REACT_APP_API_URL}/api/reviews`;
        if (tab === '주문 내역')
          apiUrl = `${process.env.REACT_APP_API_URL}/api/members/orders`;
        if (tab === '즐겨찾기')
          apiUrl = `${process.env.REACT_APP_API_URL}/api/members/favorites`;

        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              page: 1,
              size: 1,
            },
          });

          const total_elements = response.data.pageInfo.total_elements;
          if (tab === '리뷰 관리') setReviewCount(total_elements);
          if (tab === '주문 내역') setOrderCount(total_elements);
          if (tab === '즐겨찾기') setFavoriteCount(total_elements);
        } catch (error) {
          console.error(`[${tab}] 데이터를 가져오는데 실패함: `, error);
        }
      }
    };

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

    // 로그인 상태이고 accessToken이 있으면 데이터 가져오기
    if (isLoggedIn && accessToken) {
      fetchInitialData();
      getMember();
    } else {
      // 로그인 상태가 아니면 메인 페이지로 이동
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  }, [accessToken, currentTab, isLoggedIn, navigate]);

  // 각 탭에 따라 렌더링할 컴포넌트 변경
  const renderDataComponent = () => {
    if (currentTab === '리뷰 관리') {
      return <Reviews />;
    } else if (currentTab === '주문 내역') {
      return <Orders />;
    } else if (currentTab === '즐겨찾기') {
      return <Favorites />;
    }
  };

  // 모달 관련 함수
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

  return (
    <div className="max-w-screen-lg mx-auto p-10 max-sm:flex-col">
      <div className="flex justify-between relative flex-row max-sm:flex-col">
        <div className="flex gap-5">
          <img
            src={member.img}
            alt="유저 이미지"
            className="flex justify-center items-center border-2 w-28 h-28 rounded-full"
          ></img>
          <div className="flex flex-col justify-center gap-2">
            <h1>{member.nickname}</h1>
            <div className="flex">가입일: {formatDate(member.createdAt)}</div>
            <div className="lg:flex lg:flex-row max-sm:flex-col gap-2">
              <Button onClick={openImageModal}>이미지 변경</Button>
              <Button onClick={openEditProfileModal}>프로필 수정</Button>
            </div>
          </div>
        </div>
        <RedButton
          onClick={handleDeleteMemberButton}
          className="absolute right-0 bottom-0 h-1/3 max-sm:static"
        >
          회원 탈퇴
        </RedButton>
      </div>

      <TabContainer className="my-5">
        {/* 리뷰 관리 탭 */}
        <li className={`w-full ${currentTab === '리뷰 관리' ? 'active' : ''}`}>
          <Link to="#review" onClick={() => setCurrentTab('리뷰 관리')}>
            리뷰 관리 ({reviewCount})
          </Link>
        </li>
        {/* 주문 내역 탭 */}
        <li className={`w-full ${currentTab === '주문 내역' ? 'active' : ''}`}>
          <Link to="#order" onClick={() => setCurrentTab('주문 내역')}>
            주문 내역 ({orderCount})
          </Link>
        </li>
        {/* 즐겨찾기 탭 */}
        <li className={`w-full ${currentTab === '즐겨찾기' ? 'active' : ''}`}>
          <Link to="#favorite" onClick={() => setCurrentTab('즐겨찾기')}>
            즐겨찾기 ({favoriteCount})
          </Link>
        </li>
      </TabContainer>
      <div className="flex justify-center">{renderDataComponent()}</div>
      {isEditProfileModalOpen && (
        <EditProfile onClose={closeEditProfileModal} />
      )}
      {isImageModalOpen && (
        <ImageUploadModal memberImage={member.img} onClose={closeImageModal} />
      )}
    </div>
  );
};

export default MyPage;
