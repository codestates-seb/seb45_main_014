import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../assets/buttons/Button.jsx';
import SearchBar from './SearchBar.jsx';
import Login from '../login/Login.jsx';
import UserMenu from './Usermenu.jsx';
import Greeting from './Greeting.jsx';
import { useCartItemStore, useAuthStore } from '../../store/store.js';
import { ReactComponent as CartIcon } from '../../assets/images/cart.svg';
import { useEffect, useState } from 'react';

const HeaderBox = styled.header`
  padding: 12px;
  width: 100%;
  position: fixed;
  margin-top: -65px;
  z-index: 1000;
  height: 65px;
  background-color: white;
  color: #debe8f;
  display: flex;
  justify-content: space-between;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const Logo = styled(Link)`
  display: flex;
  width: 300px;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-family: AritaSans;
  font-weight: 900;
`;

const MenuBox = styled.div`
  padding-right: 10px;
  display: flex;
  width: 300px;
  justify-content: flex-end;
  align-items: center;
`;

const SearchBox = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CartBox = styled.div`
  margin-left: 15px;
  position: relative;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.15);
  }
`;

const UserBox = styled.div`
  margin-left: 15px;
`;

const ItemBadge = styled.span`
  position: absolute;
  right: -4px;
  top: -1px;
  width: 20px;
  height: 20px;
  padding: 0 4px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 10px;
  background-color: #b39260;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  line-height: 15px;
  text-align: center;
  white-space: nowrap;
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  // Zustand에서 cartItem을 가져옴
  const { cartItem } = useCartItemStore();
  const [itemCount, setItemCount] = useState(0);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  useEffect(() => {
    setItemCount(cartItem.length);
  }, [cartItem]);

  return (
    <>
      <HeaderBox>
        <Logo to="/">
          {/* <img src={images.mainlogo} alt="main logo" width="50" /> */}
          BBANG ORDER
        </Logo>
        <SearchBox>
          <SearchBar />
        </SearchBox>
        {isLoggedIn ? (
          <MenuBox>
            <Greeting />
            <UserBox aria-label="유저 메뉴">
              <UserMenu />
            </UserBox>
            <CartBox aria-label="장바구니">
              <Link to={'/cart'}>
                <CartIcon />
                {/*cartItem의 길이가 0보다 크면 ItemBadge를 렌더링*/}
                {itemCount > 0 && <ItemBadge>{itemCount}</ItemBadge>}
              </Link>
            </CartBox>
          </MenuBox>
        ) : (
          <MenuBox>
            <Button onClick={openModal} weight="800">
              로그인
            </Button>
          </MenuBox>
        )}
      </HeaderBox>
      {isModalOpen && <Login onClose={closeModal} />}
    </>
  );
};

export default Header;
