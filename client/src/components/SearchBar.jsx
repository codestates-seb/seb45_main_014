import { styled } from 'styled-components';
import images from '../assets/images/Images';

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
  function handleFocus() {
    console.log('포커스 받았음');
  }

  return (
    <SearchbarContainer>
      <div className="flex flex-1 justify-center">
        <SearchboxInput
          className="searchbox"
          type="text"
          placeholder="지역, 가게명 또는 메뉴명"
          onFocus={handleFocus}
        />
      </div>
    </SearchbarContainer>
  );
};

export default SearchBar;
