import { styled } from 'styled-components';
import { useSearchStore } from '../store/store';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu.jsx';

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

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchFilter } = useSearchStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log(`searchQuery 값은 ${searchQuery}`);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchQuery) {
      setSearchParams({
        search_keyword: searchQuery,
        search_target: searchFilter,
      });
      navigate(
        `/search?search_value=${searchQuery}&search_target=${searchFilter}`,
      );
    } else {
      // 검색 키워드가 존재하지 않는 경우, 쿼리 스트링이 없는 원래 URL을 보여주도록 navigate 처리한다.
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
      <div className="flex flex-1 justify-center">
        <DropdownMenu />
        <SearchboxInput
          className="searchbox"
          type="text"
          placeholder={holder(searchFilter)}
          onChange={handleSearchQuery}
          value={searchQuery}
        ></SearchboxInput>
      </div>
    </SearchbarContainer>
  );
};

export default SearchBar;
