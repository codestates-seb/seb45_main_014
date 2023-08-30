import { create } from 'zustand';
import { useEffect, useState } from 'react';
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
