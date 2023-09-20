import React from 'react';
import { styled, keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  position: ${(props) => props.position || 'fixed'};
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left || '50%'};
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinnerElement = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #383636;
  border-radius: 50%;
  animation: ${spinAnimation} 1.5s linear infinite;
`;

const LoadingSpinner = ({ position, top, left }) => {
  return (
    <SpinnerContainer position={position} top={top} left={left}>
      <LoadingSpinnerElement />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
