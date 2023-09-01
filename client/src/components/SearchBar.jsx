import { styled } from 'styled-components';
import { useSearchStore } from '../store/store';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SearchbarContainer = styled.form`
  display: flex;
  justify-content: center;
`;

const SearchboxInput = styled.input`
  border-radius: 10px;
  border: 2px solid #debe8f;
  width: 50%;
  font-size: 14px;
  padding: 7.8px 9.1px 7.8px 32px;
  color: black;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    width 0.2s,
    transform 0.2s;
  &:focus {
    border-color: #debe8f;
    outline: none;
    box-shadow: 0 0 3px 3px #f7e5c6;
    width: 90%;
    transition: all 0.2s ease;
    transform: translateY(3em);
  }
  * {
    filter: blur(2px);
  }
`;

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearchQuery = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log(searchQuery);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (searchQuery) {
      setSearchParams({
        search_keyword: searchQuery,
        // search_target: '',
      });
    } else {
      // 검색 키워드가 존재하지 않는 경우, 쿼리 스트링이 없는 원래 URL을 보여주도록 navigate 처리한다.
      navigate('/search');
    }
  };
  return (
    <SearchbarContainer onSubmit={searchSubmitHandler}>
      <div className="flex flex-1 justify-center">
        <SearchboxInput
          className="searchbox"
          type="text"
          placeholder="지역, 가게명 또는 메뉴명"
          onChange={handleSearchQuery}
          value={searchQuery}
        />
      </div>
    </SearchbarContainer>
  );
};

export default SearchBar;
