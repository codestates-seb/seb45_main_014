import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 1;
  width: calc(50% + 70px);
  height: 300px;
  background-color: white;
  border: 2px solid #f9d4b1;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 102;
`;

const SearchDropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <Dropdown isOpen={isMenuOpen} ref={dropdownRef}>
      검색어 리스트 오는곳
    </Dropdown>
  );
};

export default SearchDropdown;
