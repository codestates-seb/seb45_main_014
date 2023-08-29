import { useState } from 'react';
import Button from '../../components/Button.jsx';
import { styled } from 'styled-components';
import Reviews from './Reviews.jsx';
import Orders from './Orders.jsx';
import Favorites from './Favorites.jsx';

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
          <Button className="ml-5">프로필 수정</Button>
        </div>
      </div>
      <div className="w-full h-48 border-zinc-700 border-2 my-6">
        유저 이미지
      </div>
      <TabContainer>
        <li className="w-full">
          <a href="#리뷰 관리" onClick={() => setCurrentTab('리뷰 관리')}>
            리뷰 관리
          </a>
        </li>
        <li className="w-full">
          <a href="#주문 내역" onClick={() => setCurrentTab('주문 내역')}>
            주문 내역
          </a>
        </li>
        <li className="w-full">
          <a href="#즐겨찾기" onClick={() => setCurrentTab('즐겨찾기')}>
            즐겨찾기
          </a>
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
