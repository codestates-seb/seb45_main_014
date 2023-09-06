import { useState } from 'react';
import Button from '../assets/buttons/Button.jsx';
import { styled } from 'styled-components';
import Reviews from '../components/myPage/Reviews.jsx';
import Orders from '../components/myPage/Orders.jsx';
import Favorites from '../components/myPage/Favorites.jsx';

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

  return (
    <div className="max-w-screen-lg mx-auto p-10">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex justify-center items-center border-2 w-16 h-16 border-red-500 rounded-full">
            아바타
          </div>
          <div className="flex items-center ml-5">유저이름</div>
        </div>
        <div className="flex">
          <Button className="ml-5">
            <Link to="/mypage/edit">프로필 수정</Link>
          </Button>
        </div>
      </div>
      <div className="w-full h-48 border-zinc-700 border-2 my-6">
        유저 이미지
      </div>
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
