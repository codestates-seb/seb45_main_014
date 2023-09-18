import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg';
import { styled } from 'styled-components';
import { useAuthStore } from '../../store/store.js';
import axios from 'axios';

const UserMenuContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const UserIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
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

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  background-color: white;
  padding: 0;
  margin: 0;
  z-index: 5;
`;

const MenuItem = styled.div`
  text-align: center;
  width: 100%;
  padding: 10px;
  font-weight: 500;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Icon = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
  background-image: url(${(props) => props.img});
  background-size: cover;
  &:hover {
    transform: scale(1.15);
  }
`;

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userImg, setUserImg] = useState('');
  const { logout, accessToken } = useAuthStore();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const goToMyPage = () => {
    navigate('/mypage');
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

  // 유저 이미지 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const img = res.data.img;
        if (img) {
          setUserImg(img);
        } else {
          // 유효한 이미지가 없을 경우
          setUserImg(
            'https://img.freepik.com/premium-vector/pretzel-with-salt-on-it-hand-drawn-watercolor-vector-illustration-isolated-on-white-background_650009-16.jpg',
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return (
    <UserMenuContainer ref={dropdownRef}>
      <UserIconWrapper onClick={toggleMenu}>
        {userImg ? <Icon img={userImg} /> : <UserIcon />}
      </UserIconWrapper>
      <MenuDropdown isOpen={isMenuOpen}>
        <MenuList>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToMyPage();
              closeMenu();
            }}
          >
            마이페이지
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              logout();
              closeMenu();
            }}
          >
            로그아웃
          </MenuItem>
        </MenuList>
      </MenuDropdown>
    </UserMenuContainer>
  );
};

export default UserMenu;
