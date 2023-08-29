import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import images from '../assets/images/Images.js';

const HeaderBox = styled.header`
  padding: 12px;
  width: 100%;
  position: fixed;
  z-index: 1000;
  height: 120px;
  background-color: white;
  color: #b6a280;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  position: fixed;
  padding: 12px;
  top: 0;
  left: 0;
  font-size: 24px;
  font-family: AritaSans;
  font-weight: 900;
`;

const MenuBox = styled.div`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

const SearchBox = styled.div`
  flex: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderBox>
      <MenuBox>
        <Logo>
          {/* <img src={images.mainlogo} alt="main logo" width="50" /> */}
          BBANG ORDER
        </Logo>
        <Button weight="800">로그인</Button>
        <Button className="ml-2 mr-1" weight="800">
          회원가입
        </Button>
      </MenuBox>
      <SearchBox>검색 바 영역</SearchBox>
    </HeaderBox>
  );
};

export default Header;
