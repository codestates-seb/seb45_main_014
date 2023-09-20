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
import images from '../../assets/images/Images.js';
import Hamburger from './Hamburger.jsx';

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

const Logo = styled.div`
  flex: 1;
  display: flex;
  min-width: 60px;
  align-items: center;
  text-align: center;
  font-size: 24px;
  font-family: AritaSans;
  font-weight: 900;
  span {
    @media screen and (max-width: 815px) {
      display: none;
    }
  }
`;

const MenuBox = styled.div`
  flex: 1;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 1045px) {
    display: none;
  }
`;

const SearchBox = styled.div`
  flex: 2;
  /* width: fit-content; */
  display: flex;
  justify-content: center;
  @media screen and (max-width: 700px) {
    /* 화면 너비가 좁아질 때 placeholder 텍스트 숨기기 */
    input::placeholder {
      visibility: hidden;
    }
  }
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

export const ItemBadge = styled.span`
  position: absolute;
  right: -4px;
  top: -1px;
  width: 20px;
  height: 20px;
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
  font-size: 10px;
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
    // e.preventDefault();
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   setItemCount(cartItem.length);
  // }, [cartItem]);
  // cartItem.quantity를 모두 더한 값을 itemCount로 설정
  useEffect(() => {
    const total = cartItem.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
    setItemCount(total);
  }, [cartItem]);

  return (
    <>
      <HeaderBox>
        <Logo>
          <Link to="/" className="flex items-center">
            <img src={images.mainlogo} alt="main logo" width="50" />
            <span>BBANG ORDER</span>
          </Link>
        </Logo>
        <SearchBox>
          <SearchBar />
        </SearchBox>
        <Hamburger openLogin={openModal} itemCount={itemCount} />
        {isLoggedIn ? (
          <MenuBox>
            <Greeting />
            <UserBox aria-label="유저 메뉴">
              <UserMenu />
            </UserBox>
            <CartBox aria-label="장바구니">
              <Link to={'/cart'}>
                <CartIcon />
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
