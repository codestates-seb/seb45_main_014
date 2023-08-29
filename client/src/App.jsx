import './App.css';
import Shop from './pages/Shop.jsx';
import { createGlobalStyle } from 'styled-components';
import GmarketSans from './assets/fonts/GmarketSansTTFMedium.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSans';
    src: url(${GmarketSans}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  body {
    font-family: 'GmarketSans', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Shop />
    </>
  );
}

export default App;
