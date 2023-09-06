import { styled } from 'styled-components';
import images from '../../assets/images/Images';
import { useState } from 'react';

const CheckLabel = styled.label`
  input {
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
  }
`;

const CheckBox = ({ onChange, checked }) => {
  return (
    <CheckLabel>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <div className="mr-3">
        <img
          src={!checked ? images.boxunchecked : images.boxchecked}
          alt="checkbox"
        />
      </div>
    </CheckLabel>
  );
};

export default CheckBox;
