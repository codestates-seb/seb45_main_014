import { styled, keyframes } from 'styled-components';
import { useSearchStore } from '../../store/store';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu.jsx';
import { useState } from 'react';

const SearchbarContainer = styled.form`
  display: flex;
  justify-content: center;
  position: relative;
`;

const SearchboxInput = styled.input`
  border-radius: 10px;
  border: 2px solid #debe8f;
  width: 40%;
  font-size: 14px;
  padding: 7.8px 9.1px 7.8px 16px;
  color: black;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    width 0.2s,
    transform 0.2s;
  &:focus {
    border-color: #debe8f;
    outline: none;
    width: 50%;
    transition: all 0.2s ease;
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
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log(`searchQuery 값은 ${searchQuery}`);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // setSearchParams({
      //   search_keyword: searchQuery.trim(),
      //   search_target: searchFilter,
      //   page: 1,
      //   size: 10,
      // });
      navigate(
        `/search?search_keyword=${searchQuery.trim()}&search_target=${searchFilter}&page=1&size=10`,
      );

      // 검색창 focus 해제하기
      document.activeElement.blur();
    } else {
      // 검색 키워드가 존재하지 않는 경우 경고창 띄우기
      alert('검색어를 입력해 주세요!');
    }
  };

  const holder = (searchFilter) => {
    const message = {
      store: '검색할 매장명을 입력해 주세요',
      region: '검색할 지역을 입력해 주세요',
      menu: '검색할 메뉴를 입력해 주세요',
    };

    return message[searchFilter];
  };

  return (
    <SearchbarContainer onSubmit={searchSubmitHandler}>
      <DarkOverlay isFocused={isFocused} />
      <div className="flex flex-1 justify-center z-[101]">
        <DropdownMenu />
        <SearchboxInput
          className="searchbox"
          type="text"
          placeholder={holder(searchFilter)}
          onChange={handleSearchQuery}
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></SearchboxInput>
      </div>
    </SearchbarContainer>
  );
};

export default SearchBar;
