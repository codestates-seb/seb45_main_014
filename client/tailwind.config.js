/ @type {import('tailwindcss').Config} */;
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // ** 를 사용하여 모든 하위 디렉토리의 파일을 선택합니다
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
