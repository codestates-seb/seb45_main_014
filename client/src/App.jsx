import './App.css';
import Shop from './pages/Shop.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import MainPage from './pages/main/MainPage.jsx';
import { createGlobalStyle } from 'styled-components';
import GmarketSans from './assets/fonts/GmarketSansTTFMedium.ttf';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/signUp/SignUpPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import MyPage from './pages/myPage/MyPage.jsx';

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
      <div className="pt-32 mb-64">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
