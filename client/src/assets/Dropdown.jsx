import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  z-index: 800;
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
`;

const DropdownHeader = styled.label`
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
