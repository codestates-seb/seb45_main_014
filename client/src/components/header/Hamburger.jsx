import { styled } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as HamburgerIcon } from '../../assets/images/hamburger.svg';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import { ReactComponent as CartIcon } from '../../assets/images/cart.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/logout.svg';
import Greeting from './Greeting.jsx';
import { useAuthStore } from '../../store/store';
import { Link } from 'react-router-dom';

const HamburgerButton = styled.div`
  flex: 1;
  display: none;
  @media screen and (max-width: 1045px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: transparent;
    border: none;
    font-size: 24px;
    color: #debe8f;
  }
`;

const MenuList = styled.div`
  display: none;
  @media screen and (max-width: 1045px) {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 240px;
    min-width: 165px;
    margin-top: 65px;
    background-color: white;
    z-index: 99;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: ${(props) =>
      props.open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
    li {
      display: flex;
      height: 50px;
      align-items: center;
      padding-left: 20px;
      cursor: pointer;
      &:hover {
        background-color: #f9f9f9;
      }
    }
  }
`;

export const ItemBadge = styled.span`
  position: absolute;
  right: 11px;
  top: 10px;
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

const Hamburger = ({ openLogin, itemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // 컴포넌트가 unmount 될 때 이벤트 핸들러 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <HamburgerButton ref={menuRef}>
        <button type="button" aria-label="메뉴" onClick={toggleMenu}>
          <HamburgerIcon width="45" />
          {itemCount > 0 && <ItemBadge>{itemCount}</ItemBadge>}
        </button>
      </HamburgerButton>
      {
        <MenuList open={isMenuOpen}>
          {isLoggedIn && (
            <div className="flex items-center justify-center h-[50px]">
              <Greeting />
            </div>
          )}
          {!isLoggedIn && (
            <li role="presentation" onClick={openLogin}>
              <span>로그인</span>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/mypage" className="flex items-center">
                  <UserIcon width="30" className="pr-1" />
                  <span>마이페이지</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center">
                  <CartIcon width="30" className="pr-1" />
                  <span>장바구니</span>
                  <span className="ml-1 text-sm text-[#b39260]">
                    ({itemCount})
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="flex items-center">
                  <LogoutIcon width="30" className="pr-1" />
                  <span>로그아웃</span>
                </Link>
              </li>
            </>
          )}
        </MenuList>
      }
    </>
  );
};

export default Hamburger;
