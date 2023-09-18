import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const ScrollBtn = styled.div`
  position: fixed;
  right: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  cursor: pointer;

  border-radius: 50%;
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
            enableBackground="new 0 0 24 24"
            viewBox="0 0 24 24"
            id="UpperArrow"
          >
            <path
              d="M16.9,13.4l-4.2-4.2l0,0c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0l3.5-3.5l3.5,3.5
	c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3C17.3,14.4,17.3,13.8,16.9,13.4z"
              fill="#debe90"
              className="color000000 svgShape"
            ></path>
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
            id="DownArrow"
          >
            <path
              d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              fill="#debe90"
              className="color000000 svgShape"
            ></path>
          </svg>
        </ScrollBtnBottom>
      )}
    </div>
  );
};

export default ScrollButtonWithPosition;
