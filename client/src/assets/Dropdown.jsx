import React, { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from 'styled-components';

const Wrapper = styled.div`
  z-index: 800;
`;

const slideInAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
  `;

const DropdownWrapper = styled.ul`
  display: flex;
  margin-top: 4px;
  text-align: center;
  flex-direction: column;
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

const DropDownPosition = styled.div`
  position: absolute;
  width: 85px;
  height: 200px;
  overflow: hidden;
  z-index: 1;
`;

const DropdownHeader = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #debe8f;
  width: 85px;
  height: 31px;
  font-size: 14px;
  font-weight: 600;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #debe8f;
  }
`;

const DropdownMenu = ({ options, defaultOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Wrapper onClick={handleToggleDropdown}>
      <DropdownHeader>{selectedOption.name}</DropdownHeader>
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
