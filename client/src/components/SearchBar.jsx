import { styled } from 'styled-components';

const SearchbarContainer = styled.form`
  display: flex;
  position: relative;
  justify-content: center;
`;

const SearchboxInput = styled.input`
  border-radius: 10px;
  border: 2px solid #b6a280;
  width: 90%;
  padding: 7.8px 9.1px 7.8px 32px;
  color: black;
  &:focus {
    border-color: #b6a280;
    outline: none;
    box-shadow: 0 0 3px 3px #f7e5c6;
  }
`;

const SearchBar = () => {
  return (
    <SearchbarContainer>
      <SearchboxInput
        className="searchbox"
        type="text"
        placeholder="지역, 가게명 또는 메뉴명"
      />
    </SearchbarContainer>
  );
};

export default SearchBar;
