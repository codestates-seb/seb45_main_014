import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import MainPage from './pages/main/MainPage.jsx';
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
      <Header />
      <MainPage />
      <Footer />
    </>
  );
}

export default App;
