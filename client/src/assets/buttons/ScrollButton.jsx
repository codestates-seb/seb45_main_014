import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import bottom from '../icons/bottom-alignment.ico';
import top from '../icons/top-alignment.ico';

const ScrollBtn = styled.div`
  position: fixed;
  right: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  cursor: pointer;

  border-radius: 50%;
  background-color: lightgray;
  padding: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }
`;

const ScrollBtnTop = styled(ScrollBtn)`
  top: 48%;
`;

const ScrollBtnBottom = styled(ScrollBtn)`
  top: 52%;
`;

const ScrollButtonWithPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {scrollPosition > 0 && (
        <ScrollBtnTop type="ScrollBtn" onClick={scrollToTop}>
          <img src={top} alt="top" />
        </ScrollBtnTop>
      )}
      {scrollPosition < document.body.scrollHeight - window.innerHeight && (
        <ScrollBtnBottom type="ScrollBtn" onClick={scrollToBottom}>
          <img src={bottom} alt="top" />
        </ScrollBtnBottom>
      )}
    </div>
  );
};

export default ScrollButtonWithPosition;
