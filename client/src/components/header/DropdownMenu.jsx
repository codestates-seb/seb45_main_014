import { styled, keyframes } from 'styled-components';
import { useSearchStore } from '../../store/store';
import { useState, useEffect, useRef } from 'react';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  padding-right: 4px;
`;

const slideInAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
  `;

const DropDownPosition = styled.div`
  position: absolute;
  width: 70px;
  height: 200px;
  overflow: hidden;
  z-index: 1000;
`;

const DropdownWrapper = styled.ul`
  position: absolute;
  width: 70px;
  margin-top: 4px;
  text-align: center;
  border: 2px solid #debe8f;
  background-color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  transform-origin: top center;
  transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});
  transition: transform 0.2s ease-in-out;
  animation: ${(props) => (props.isOpen ? slideInAnimation : 'none')} 0.2s
    ease-in-out;
`;

const DropdownHeader = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  width: 70px;
  height: 40.59px;
  font-size: 14px;
  font-weight: 600;
  background-color: #debe8f;
  z-index: 1000;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #b3915f;
  }
`;

const DropdownMenu = () => {
  const { setSearchFilter, searchFilter } = useSearchStore();
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

  const searchFilterToKR = () => {
    switch (searchFilter) {
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
  return (
    <Wrapper onClick={handleToggleDropdown}>
      <DropdownHeader>{searchFilterToKR()}</DropdownHeader>
      {isOpen && (
        <DropDownPosition>
          <DropdownWrapper isOpen={isOpen} ref={dropdownRef}>
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
        </DropDownPosition>
      )}
    </Wrapper>
  );
};

export default DropdownMenu;
