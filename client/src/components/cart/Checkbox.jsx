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

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <CheckLabel>
      <input type="checkbox" onChange={handleCheck} checked={isChecked} />
      <div className="mr-3">
        <img
          src={!isChecked ? images.boxunchecked : images.boxchecked}
          alt="checkbox"
        />
      </div>
    </CheckLabel>
  );
};

export default CheckBox;
