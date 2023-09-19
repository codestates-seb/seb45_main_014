import { getByteSize } from './getByteSize';

export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email) && email.length <= 30;
};

export const validatePassword = (password) => {
  const pattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,25}$/;
  return pattern.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateNickname = (nickname) => {
  const pattern = /^[가-힣a-zA-Z]+$/;
  // getByteSize 함수는 이전에 정의한 것으로 가정
  return (
    pattern.test(nickname) &&
    getByteSize(nickname) <= 12 &&
    getByteSize(nickname) >= 4
  );
};

export const validatePhone = (phone) => {
  const cleanPhone = phone.replace(/-/g, '');
  return /^\d{10,11}$/.test(cleanPhone) && cleanPhone.length <= 11;
};
