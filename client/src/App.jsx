import './App.css';
import Footer from './components/Footer.jsx';
import Header from './components/header/Header.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import LoadingSpinner from './components/Loading.jsx';
import ScrollButton from './assets/buttons/ScrollButton.jsx';
import axios from 'axios';
import { useCartItemStore, useAuthStore } from './store/store';
import AuthGoogle from './components/login/AuthGoogle.jsx';
import { Toaster, useToasterStore, toast } from 'react-hot-toast';
import LoadingComponent from './components/myPage/MyPageLoading.jsx';

const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const MainPage = lazy(() => import('./pages/main/MainPage.jsx'));
const MyPage = lazy(() => import('./pages/MyPage.jsx'));
const Store = lazy(() => import('./pages/Store.jsx'));
const SearchResult = lazy(() => import('./pages/search/SearchResult.jsx'));
const Cart = lazy(() => import('./pages/cart/Cart.jsx'));

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== '/mypage';
  const { setCartItem, setStoreId, setCheckItem } = useCartItemStore();
  const { accessToken } = useAuthStore((state) => state);
  const { isLoggedIn } = useAuthStore();
  const { toasts } = useToasterStore();

  // 토스트 메시지 최대 3개까지만 띄우기
  const TOAST_LIMIT = 3;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  // 웹페이지 최초 로딩 시 장바구니 데이터 가져오기
  useEffect(() => {
    const API = `${process.env.REACT_APP_API_URL}/api`;
    isLoggedIn &&
      axios
        .get(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const storeId = res.data.order.store_id;
          const orderMenus = res.data.order.order_menus;
          setCartItem(orderMenus);
          setCheckItem(orderMenus.map((menu) => menu.id));
          setStoreId(storeId);
        })
        .catch((err) => console.log('에러임', err));
  }, [setCartItem, accessToken, isLoggedIn, setStoreId, setCheckItem]);

  return (
    <>
      <Toaster containerStyle={{ position: 'fixed', top: '65px' }} />
      <Header />
      <main className="w-full mx-auto min-h-screen">
        <ScrollButton />
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/stores/:id" element={<Store />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth/google" element={<AuthGoogle />} />
          </Routes>
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
