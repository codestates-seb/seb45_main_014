import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/header/Header.jsx';
import { createGlobalStyle } from 'styled-components';
import GmarketSans from './assets/fonts/GmarketSansTTFMedium.ttf';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/Loading.jsx';
import ScrollButton from './assets/buttons/ScrollButton.jsx';

const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const MainPage = lazy(() => import('./pages/main/MainPage.jsx'));
const MyPage = lazy(() => import('./pages/MyPage.jsx'));
const Store = lazy(() => import('./pages/Store.jsx'));
const PostReview = lazy(() => import('./components/myPage/PostReview.jsx'));
const EditProfile = lazy(() => import('./components/myPage/EditProfile.jsx'));
const SearchResult = lazy(() => import('./pages/search/SearchResult.jsx'));

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSans';
    src: url(${GmarketSans}) format('truetype');
    font-weight: 300;
    font-style: normal;
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
  `;

function App() {
  return (
    <>
      <GlobalStyle /> <Header />
      <main className="w-full mx-auto">
        <ScrollButton />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/stores/:id" element={<Store />} />
            <Route path="/reviews/post" element={<PostReview />} />
            <Route path="/mypage/edit" element={<EditProfile />} />
            <Route path="/search" element={<SearchResult />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
