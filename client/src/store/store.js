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

export const useCountStore = create((set) => ({
  count: 1, // 초기값을 1으로 설정
  up() {
    set((state) => ({ count: state.count + 1 }));
  },
  down() {
    set((state) => ({ count: state.count > 1 ? state.count - 1 : 1 }));
  },
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

export const useLoginModalStore = create((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
