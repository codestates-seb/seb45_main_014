import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { useSearchStore } from '../../store/store';

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
  const [activeTab, setActiveTab] = useState('recommended'); // 기본값은 추천 검색어
  const dropdownRef = useRef(null);
  const { setSearchQuery } = useSearchStore();

  const setQuery = (term) => {
    setSearchQuery(term);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
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
  // 추천 검색어 하드코딩하기
  const recommendedSearches = [
    { term: '가게', target: 'store' },
    { term: '빵', target: 'menu' },
    { term: '서울', target: 'region' },
    { term: '케이크', target: 'menu' },
  ];

  return (
    <Dropdown isOpen={isMenuOpen} ref={dropdownRef}>
      <div className="flex h-7 bg-[#debe8f] text-white font-semibold text-sm border-b-2 border-[#debe8f] ">
        <button
          onClick={() => toggleTab('recommended')}
          className={`flex-1 ${
            activeTab === 'recommended' ? 'bg-[#c6a276] active' : ''
          }`}
        >
          추천 검색어
        </button>
        <button
          onClick={() => toggleTab('recent')}
          className={`flex-1 ${
            activeTab === 'recent' ? 'bg-[#c6a276] active' : ''
          }`}
        >
          최근 검색어
        </button>
      </div>
      <ul className="text-sm">
        {activeTab === 'recent' &&
          (!recentSearches ? (
            <li className="pt-4 text-center text-lg text-gray-300">
              최근 검색어가 없습니다.
            </li>
          ) : (
            recentSearches
              .map((term, index) => (
                <li
                  key={index}
                  role="presentation"
                  value={term}
                  className="text-gray-400 hover:bg-slate-100 py-1 px-2 cursor-pointer"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </li>
              ))
              .slice(0, 10)
          ))}
        {activeTab === 'recommended' &&
          recommendedSearches.map((item, index) => (
            <li
              key={index}
              role="presentation"
              value={item.term}
              className="text-gray-400 hover:bg-slate-100 py-1 px-2 cursor-pointer"
              onClick={() => setQuery(item.term)}
            >
              {item.term}
            </li>
          ))}
      </ul>
    </Dropdown>
  );
};

export default SearchDropdown;
