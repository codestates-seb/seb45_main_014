import { styled } from 'styled-components';
import { useSearchStore } from '../../store/store';
import { useState, useEffect, useRef } from 'react';

const Wrapper = styled.div`
  padding-right: 4px;
`;

const DropdownWrapper = styled.ul`
  display: flex;
  margin-top: 4px;
  flex-direction: column;
  text-align: center;
  border: 2px solid #debe8f;
  background-color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
`;

const DropdownHeader = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  width: 70px;
  height: 41px;
  font-size: 14px;
  font-weight: 600;
  background-color: #debe8f;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #b3915f;
  }
`;

const DropdownMenu = () => {
  const { setSearchFilter } = useSearchStore();
  const options = [
    { value: 'store', name: '가게명' },
    { value: 'region', name: '지역명' },
    { value: 'menu', name: '메뉴명' },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // 전역 클릭 이벤트 핸들러
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // 드롭다운이 열렸을 때 이벤트 핸들러 등록
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSearchFilter(option.value);
    setIsOpen(false);
    console.log(`searchFilter 값은 ${option.value}`);
  };

  return (
    <Wrapper>
      <DropdownHeader onClick={handleToggleDropdown}>
        {selectedOption.name}
      </DropdownHeader>
      {isOpen && (
        <DropdownWrapper ref={dropdownRef}>
          {options.map((option) => (
            <li
              key={option.value}
              role="presentation"
              onClick={() => handleSelectOption(option)}
              className="py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

export default DropdownMenu;
