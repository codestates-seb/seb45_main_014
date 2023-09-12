import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import { styled } from 'styled-components';

const UserMenuContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.15);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 110%;
  right: -110%;
  width: 130px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  background-color: white;
  padding: 0;
  margin: 0;
  z-index: 5;
`;

const MenuItem = styled.li`
  text-align: center;
  width: 100%;
  padding: 10px;
  font-weight: 500;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // 전역 클릭 이벤트 핸들러
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // 드롭다운이 열렸을 때 이벤트 핸들러 등록
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <UserMenuContainer>
      <UserIconWrapper onClick={toggleMenu}>
        <UserIcon />
      </UserIconWrapper>
      <MenuDropdown isOpen={isMenuOpen} ref={dropdownRef}>
        <MenuList>
          <MenuItem>
            <Link to="/mypage">마이페이지</Link>
          </MenuItem>
          <MenuItem>
            <a href="/logout">로그아웃</a>
          </MenuItem>
        </MenuList>
      </MenuDropdown>
    </UserMenuContainer>
  );
};

export default UserMenu;
