import { useEffect, useState } from 'react';
import Button from '../assets/buttons/Button.jsx';
import { styled } from 'styled-components';
import Reviews from '../components/myPage/Reviews.jsx';
import Orders from '../components/myPage/Orders.jsx';
import Favorites from '../components/myPage/Favorites.jsx';
import axios from 'axios';
import { useAuthStore } from '../store/store.js';

import { Link } from 'react-router-dom';

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

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

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
  }, [isLoggedIn, accessToken]);

  return (
    <div className="max-w-screen-lg mx-auto p-10">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={member.img}
            alt="유저 이미지"
            className="flex justify-center items-center border-2 w-24 h-24 rounded-full"
          ></img>
          <div className="flex items-center ml-5">{member.nickname}</div>
        </div>
        <div className="flex">
          <Button className="ml-5">
            <Link to="/mypage/edit">프로필 수정</Link>
          </Button>
        </div>
      </div>
      {/* <div className="w-full h-48 border-zinc-700 border-2 my-6">
        유저 이미지
      </div> */}
      <TabContainer className="mb-5">
        <li className="w-full">
          <Link to="#review" onClick={() => setCurrentTab('리뷰 관리')}>
            리뷰 관리
          </Link>
        </li>
        <li className="w-full">
          <Link to="#order" onClick={() => setCurrentTab('주문 내역')}>
            주문 내역
          </Link>
        </li>
        <li className="w-full">
          <Link to="#favorite" onClick={() => setCurrentTab('즐겨찾기')}>
            즐겨찾기
          </Link>
        </li>
      </TabContainer>
      <div className="flex justify-center">
        {currentTab === '리뷰 관리' && <Reviews />}
        {currentTab === '주문 내역' && <Orders />}
        {currentTab === '즐겨찾기' && <Favorites />}
      </div>
    </div>
  );
};

export default MyPage;
