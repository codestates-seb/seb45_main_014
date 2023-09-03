import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { createGlobalStyle } from 'styled-components';
import GmarketSans from './assets/fonts/GmarketSansTTFMedium.ttf';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/Loading.jsx';

const MainPage = lazy(() => import('./pages/main/MainPage.jsx'));
const MyPage = lazy(() => import('./pages/myPage/MyPage.jsx'));
const Store = lazy(() => import('./pages/Store.jsx'));
const PostReview = lazy(() => import('./pages/myPage/PostReview.jsx'));
const EditProfile = lazy(() => import('./pages/myPage/EditProfile.jsx'));
const MenuDetails = lazy(() => import('./pages/menu/MenuDetails.jsx'));

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
      <main className="pt-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/stores/:id" element={<Store />} />
            <Route path="/reviews/post" element={<PostReview />} />
            <Route path="/mypage/edit" element={<EditProfile />} />
            <Route path="/menu" element={<MenuDetails />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
