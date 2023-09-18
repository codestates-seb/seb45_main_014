import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

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
  top: 48%;
`;

const ScrollBtnBottom = styled(ScrollBtn)`
  top: 52%;
`;

const ScrollButtonWithPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // 스크롤 위치에 따라 버튼 보이기/숨기기
  const threshold = 100;
  const showButtonThreshold = 500;

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
      {scrollPosition > showButtonThreshold && (
        <ScrollBtnTop type="ScrollBtn" onClick={scrollToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="up-arrow"
          >
            <path d="M11.293,1.293a1,1,0,0,1,1.414,0l5,5a1,1,0,0,1-1.414,1.414L13,4.414V22a1,1,0,0,1-2,0V4.414L7.707,7.707A1,1,0,0,1,6.293,6.293Z"></path>
          </svg>
        </ScrollBtnTop>
      )}
      {Math.abs(
        scrollPosition - (document.body.scrollHeight - window.innerHeight),
      ) > threshold && (
        <ScrollBtnBottom type="ScrollBtn" onClick={scrollToBottom}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="down-arrow"
          >
            <path
              d="m17.71 17.71-5 5a1 1 0 0 1-.33.21.94.94 0 0 1-.76 0 1 1 0 0 1-.33-.21l-5-5a1 1 0 0 1 1.42-1.42l3.29 3.3V2a1 1 0 0 1 2 0v17.59l3.29-3.3a1 1 0 0 1 1.42 1.42Z"
              data-name="down arrow"
            ></path>
          </svg>
        </ScrollBtnBottom>
      )}
    </div>
  );
};

export default ScrollButtonWithPosition;
