import React from 'react';
import { styled, keyframes } from 'styled-components';

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  margin: 5px;
  background-color: #debe8f;
  border-radius: 50%;
  animation: ${moveUpDown} 1s linear infinite;
  animation-delay: ${(props) => props.delay || '0s'};
`;

const LoadingDot = () => {
  return (
    <LoadingContainer>
      <Dot delay="0s" />
      <Dot delay="0.3s" />
      <Dot delay="0.6s" />
    </LoadingContainer>
  );
};

export default LoadingDot;
