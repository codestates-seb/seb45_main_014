import { create } from 'zustand';

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
