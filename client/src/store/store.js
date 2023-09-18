import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiUrl = process.env.REACT_APP_API_URL;

export const useBookmarkStore = create((set) => ({
  isBookmarked: false,
  toggleBookmark: async (store_id, accessToken) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/members/favorites/${store_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const { is_favorite } = response.data.store;
      set({ isBookmarked: is_favorite === 'true' });
      is_favorite
        ? toast.success('즐겨찾기에 추가되었습니다.')
        : toast.error('즐겨찾기에서 삭제되었습니다.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('즐겨찾기 에러', error);
    }
  },
}));

export const userFormStore = create((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  phone: '',
  errors: {},
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setNickname: (nickname) => set({ nickname }),
  setPhone: (phone) => set({ phone }),
  setErrors: (errors) => set({ errors }),
}));

export const useRatingStore = create((set) => ({
  rating: 5,
  setRating: (rating) => set({ rating }),
}));

export const useImageStore = create((set) => ({
  selectedImage: null,
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  clearSelectedImage: () => set({ selectedImage: null }),
}));

export const useByteSizeStore = create((set) => ({
  text: '',
  setText: (text) => set({ text }),
}));

// 검색 기능
export const useSearchStore = create((set) => ({
  searchQuery: '',
  searchFilter: 'store',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchFilter: (filter) => set({ searchFilter: filter }),
}));

export const useModalStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useLoginModalStore = create((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));

export const useCartItemStore = create((set) => ({
  cartItem: [],
  checkItem: [],
  storeId: 0,
  setCartItem: (data) => set({ cartItem: data }),
  setCheckItem: (data) => set({ checkItem: data }),
  setStoreId: (data) => set({ storeId: data }),
}));

export const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('access_token') !== null,
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  guest: false,
  login: (access, refresh) => {
    set({ isLoggedIn: true, accessToken: access, refreshToken: refresh });
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  },
  logout: async () => {
    // 로그아웃 post 요청
    try {
      await axios.post(`${apiUrl}/api/member/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
        },
      });
      toast.success('로그아웃 되었습니다.');
    } catch (error) {
      console.error(error);
    } finally {
      set({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        guest: false,
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },
  guestLogin: () => {
    set({
      isLoggedIn: true,
      guest: true,
      accessToken: 'guest',
      refreshToken: 'guest',
    });
    console.log('guest login');
  },
  // 회원 탈퇴
  deleteMember: async () => {
    try {
      await axios.delete(`${apiUrl}/api/member`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      toast.success('회원 탈퇴 되었습니다.');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    } finally {
      set({
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        guest: false,
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },
}));
