import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import images from '../assets/images/Images.js';
import SearchBar from './SearchBar.jsx';

const HeaderBox = styled.header`
  padding: 12px;
  width: 100%;
  position: fixed;
  z-index: 1000;
  max-height: 120px;
  background-color: white;
  color: #b6a280;
  display: flex;
  justify-content: space-between;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-family: AritaSans;
  font-weight: 900;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBox = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderBox>
      <Logo to="/">
        {/* <img src={images.mainlogo} alt="main logo" width="50" /> */}
        BBANG ORDER
      </Logo>
      <SearchBox>
        <SearchBar />
      </SearchBox>
      <MenuBox>
        <Link to="/login">
          <Button weight="800">로그인</Button>
        </Link>
        <Link to="/signup">
          <Button className="ml-2 mr-1" weight="800">
            회원가입
          </Button>
        </Link>
      </MenuBox>
    </HeaderBox>
  );
};

export default Header;
