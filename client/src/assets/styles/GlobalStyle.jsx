import { createGlobalStyle } from 'styled-components';
import GmarketSans from '../fonts/GmarketSansTTFMedium.ttf';
import AritaSans from '../fonts/AritaSans-Medium.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSans';
    src: url(${GmarketSans}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
  font-family: 'AritaSans'; /* 사용하고 싶은 font-family명을 지정 */
  src: url(${AritaSans}) format('opentype'); /* 폰트파일 불러오기 */
  }
  * {
    box-sizing: border-box;
  }
  html, body {
    font-family: 'GmarketSans', sans-serif;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  body {
    padding-top: 65px;
  }
  ul, li {
    list-style-type: none;
  }
  `;

export default GlobalStyle;
