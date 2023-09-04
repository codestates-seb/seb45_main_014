import { styled } from 'styled-components';
import { useSearchStore } from '../../store/store';

const DropdownWrapper = styled.select`
  text-align: center;
  width: 70px;
  height: 100%;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  background-color: #debe8f;
  color: white;
  margin-right: 4px;
  outline: 0;
  &:focus {
    outline: 0;
    border-color: #debe8f;
    outline: none;
  }
`;

const DropdownMenu = () => {
  const { setSearchFilter } = useSearchStore();
  const options = [
    { value: 'store', name: '가게명' },
    { value: 'region', name: '지역명' },
    { value: 'menu', name: '메뉴명' },
  ];
  const handleSearchFilter = (e) => {
    const filter = e.target.value;
    setSearchFilter(filter);
    console.log(`searchFilter 값은 ${filter}`);
  };

  return (
    <DropdownWrapper onChange={handleSearchFilter}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </DropdownWrapper>
  );
};

export default DropdownMenu;
