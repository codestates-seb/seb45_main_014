import { styled, keyframes } from 'styled-components';
import { useSearchStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu.jsx';
import { useState } from 'react';
import SearchDropdown from './SearchDropdown.jsx';
import { ReactComponent as RemoveSVG } from '../../assets/images/deletebutton.svg';
import { ReactComponent as SearchSVG } from '../../assets/images/magnifier.svg';

const SearchbarContainer = styled.form`
  display: flex;
  justify-content: center;
  position: relative;
`;

const SearchboxInput = styled.input`
  border-radius: 10px;
  border: 2px solid #debe8f;
  width: 400px;
  font-size: 14px;
  padding: 7.8px 9.1px 7.8px 80px;
  color: black;
  z-index: 140;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    width 0.2s,
    transform 0.2s;
  &.focused {
    border-color: #debe8f;
    width: 480px;
    transition: all 0.2s ease;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 150;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 200;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경의 색상과 투명도 설정 */
  z-index: 100; /* 모달을 가장 위로 표시 */
  animation: ${fadeIn} 0.3s ease;
  display: ${({ isFocused }) =>
    isFocused ? 'block' : 'none'}; /* focus 여부에 따라 표시 여부 결정 */
`;

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchFilter } = useSearchStore();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const holder = (searchFilter) => {
    const message = {
      store: '검색할 매장명을 입력해 주세요',
      region: '검색할 지역을 입력해 주세요',
      menu: '검색할 메뉴를 입력해 주세요',
    };

    return message[searchFilter];
  };

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleFocused = (e) => {
    e.preventDefault();
    setIsFocused(true);
  };

  // 로컬 스토리지에 검색어 저장
  const saveSearchTerm = (term) => {
    const recentSearches = getRecentSearches();
    recentSearches.unshift(term); // 최근 검색어 배열의 맨 앞에 추가
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

    // 최근 검색어를 10개까지만 저장(queue)
    if (recentSearches.length > 10) {
      recentSearches.pop();
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  };

  // 로컬 스토리지에서 최근 검색어 불러오기
  const getRecentSearches = () => {
    const recentSearches = localStorage.getItem('recentSearches');
    return recentSearches ? JSON.parse(recentSearches) : [];
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate({
        pathname: '/search',
        search: `?search_keyword=${searchQuery.trim()}&search_target=${searchFilter}`,
      });
      saveSearchTerm(searchQuery.trim());
      // 검색창 focus 해제하기
      setIsFocused(false);
      // 페이지 이동시 강제 스크롤 이동
      window.scrollTo(0, 0);
    } else {
      // 검색 키워드가 존재하지 않는 경우 경고창 띄우기
      alert('검색어를 입력해 주세요!');
    }
  };

  return (
    <>
      <DarkOverlay isFocused={isFocused} onClick={() => setIsFocused(false)} />
      <SearchbarContainer
        onSubmit={searchSubmitHandler}
        onClick={handleFocused}
      >
        <div className="flex flex-1 justify-center z-[101]">
          <DropdownMenu />
          <ButtonContainer>
            <RemoveSVG onClick={() => setSearchQuery('')} />
            <SearchSVG
              onClick={searchSubmitHandler}
              className={'absolute top-0 right-8'}
            />
          </ButtonContainer>
          <SearchboxInput
            className={`searchbox ${isFocused ? 'focused' : ''}`}
            type="text"
            placeholder={holder(searchFilter)}
            onChange={handleSearchQuery}
            value={searchQuery}
          ></SearchboxInput>
          {isFocused && <SearchDropdown />}
        </div>
      </SearchbarContainer>
    </>
  );
};

export default SearchBar;
