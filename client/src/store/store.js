import { create } from 'zustand';
import axios from 'axios';

export const useBookmarkStore = create((set) => ({
  isBookmarked: false,
  toggleBookmark: () => set((state) => ({ isBookmarked: !state.isBookmarked })),
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
  rating: 0,
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

// export const useShopInventoryStore = create((set) => ({
//   inventory: 0,
//   isFetch: false,
//   fetchinventory: async () => {
//     try {
//       const resulte = await axios.get(`${URL적기}`)
//     };
//     set({ inventory: resulte.${재고량 key값, isFetch: true });
//   } catch (error) {
//     console.error('남은 재고가 없습니다.', error);
//   }
//   },
// }));

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
  setCartItem: (data) => set({ cartItem: data }),

  // 수량 변경 함수
  quantityPlus: (id) => {
    set((state) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { cartItems: newCartItems };
    });
  },
  quantityMinus: (id) => {
    set((state) => {
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { cartItems: newCartItems };
    });
  },
}));

export const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('access_token') !== null,
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  login: (access, refresh) => {
    set({ isLoggedIn: true, accessToken: access, refreshToken: refresh });
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  },
  logout: () => {
    set({ isLoggedIn: false, accessToken: null, refreshToken: null });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
}));
