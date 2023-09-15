import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';

const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  min-height: 300px;
  height: max-content;
  background-color: white;
  border: 2px solid #debe8f;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 100;
  overflow: hidden;
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

  const recentSearches = JSON.parse(localStorage.getItem('recentSearches'));

  return (
    <Dropdown isOpen={isMenuOpen} ref={dropdownRef}>
      <h2 className="bg-[#debe8f] px-2 py-1 text-white font-semibold text-sm">
        최근 검색어
      </h2>
      <ul className="text-sm">
        {!recentSearches ? (
          <li className="pt-4 text-center text-lg text-gray-300">
            최근 검색어가 없습니다.
          </li>
        ) : (
          recentSearches
            .map((term, index) => (
              <li
                key={index}
                className="text-gray-400 hover:bg-slate-100 py-1 px-2"
              >
                {term}
              </li>
            ))
            .slice(0, 10)
        )}
      </ul>
    </Dropdown>
  );
};

export default SearchDropdown;
