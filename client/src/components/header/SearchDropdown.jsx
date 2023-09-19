import { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { useSearchStore } from '../../store/store';
import { ReactComponent as ArrowSVG } from '../../assets/images/topleftarrow.svg';
import { ReactComponent as SearchSVG } from '../../assets/images/searchicon.svg';
import { ReactComponent as RemoveSVG } from '../../assets/images/deletebutton.svg';
import { useNavigate } from 'react-router-dom';

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
  overflow: hidden;
`;

const SearchDropdown = ({ searchInputRef, saveSearchTerm, toggleFocus }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('recommended'); // 기본값은 추천 검색어
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem('recentSearches')) || [],
  ); // 최근 검색어 목록
  const dropdownRef = useRef(null);
  const { setSearchQuery, setSearchFilter } = useSearchStore();

  const setQueryAndFilter = (term, target) => {
    setSearchQuery(term);
    setSearchFilter(target);
    searchInputRef.current.focus();
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

  // 추천 검색어 하드코딩하기
  const recommendedSearches = [
    { term: '베이커리', target: 'store' },
    { term: '빵', target: 'menu' },
    { term: '서울', target: 'region' },
    { term: '케이크', target: 'menu' },
    { term: '크림', target: 'menu' },
  ];

  const targetToKR = (target) => {
    switch (target) {
      case 'store':
        return '가게명';
      case 'region':
        return '지역명';
      case 'menu':
        return '메뉴명';
      default:
        return '';
    }
  };

  // 선택한 검색어로 검색하기
  const handleSelectOption = (term, target) => {
    setQueryAndFilter(term, target);
    console.log(`searchFilter 값은 ${target}, searchQuery 값은 ${term}`);
    if (term.trim()) {
      navigate({
        pathname: '/search',
        search: `?search_keyword=${term.trim()}&search_target=${target}`,
      });
      saveSearchTerm({ term: term.trim(), target: target });
      // 페이지 이동시 강제 스크롤 이동
      window.scrollTo(0, 0);
      closeMenu();
      toggleFocus();
    }
  };

  // 최근 검색어 삭제 함수
  const deleteRecentSearch = (term, target) => {
    const updatedRecentSearches = recentSearches.filter(
      (item) => item.term !== term || item.target !== target,
    );
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedRecentSearches),
    );
  };

  // 항목 삭제 이벤트 핸들러
  const handleDeleteRecentSearch = (term, target) => {
    deleteRecentSearch(term, target);
  };

  return (
    <Dropdown isOpen={isMenuOpen} ref={dropdownRef}>
      <div className="flex h-7 bg-[#debe8f] text-white font-semibold text-sm border-b-2 border-[#debe8f] ">
        <button
          type="button"
          onClick={() => toggleTab('recommended')}
          className={`flex-1 ${
            activeTab === 'recommended' ? 'bg-[#c6a276] active' : ''
          }`}
        >
          추천 검색어
        </button>
        <button
          type="button"
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
          (!recentSearches || recentSearches.length === 0 ? (
            <li className="pt-4 text-center text-lg text-gray-300">
              최근 검색어가 없습니다.
            </li>
          ) : (
            recentSearches
              .map((item, index) => (
                <li
                  key={index}
                  role="presentation"
                  value={item.term}
                  className="text-gray-400 hover:bg-slate-100 py-1 px-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // 이벤트 전파 방지
                    handleSelectOption(item.term, item.target);
                  }}
                >
                  <SearchSVG className="w-4 h-3 inline-block mr-1" />
                  {item.term}
                  <span className="text-gray-300 text-xs pl-1">
                    ({targetToKR(item.target)})
                  </span>
                  <div
                    className="inline-block absolute right-8"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // 이벤트 전파 방지
                      setQueryAndFilter(item.term, item.target);
                    }}
                  >
                    <ArrowSVG className="w-5 h-5" />
                  </div>
                  <div
                    className="inline-block absolute right-2"
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 방지
                      handleDeleteRecentSearch(item.term, item.target);
                    }}
                  >
                    <RemoveSVG className="w-5 h-5" />
                  </div>
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // 이벤트 전파 방지
                handleSelectOption(item.term, item.target);
              }}
            >
              <SearchSVG className="w-4 h-3 inline-block mr-1" />
              {item.term}
              <span className="text-gray-300 text-xs pl-1">
                ({targetToKR(item.target)})
              </span>
              <div
                className="inline-block absolute right-1"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // 이벤트 전파 방지
                  setQueryAndFilter(item.term, item.target);
                }}
              >
                <ArrowSVG className="w-5 h-5" />
              </div>
            </li>
          ))}
      </ul>
    </Dropdown>
  );
};

export default SearchDropdown;
