import { useEffect, useState } from 'react';
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

  border-radius: 10%;
  padding: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
`;

const ScrollBtnTop = styled(ScrollBtn)`

  top: 47.5%;
`;

const ScrollBtnBottom = styled(ScrollBtn)`
  top: 52.5%;

`;

const ScrollButtonWithPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const threshold = 10;

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
      {Math.abs(
        scrollPosition - (document.body.scrollHeight - window.innerHeight),
      ) > threshold && (
        <ScrollBtnBottom type="ScrollBtn" onClick={scrollToBottom}>
          <img src={bottom} alt="bottom" />
        </ScrollBtnBottom>
      )}
    </div>
  );
};

export default ScrollButtonWithPosition;
