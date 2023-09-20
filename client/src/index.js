import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ResetScroll from './utils/ResetScroll.jsx';
import GlobalStyle from './assets/styles/GlobalStyle.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <ResetScroll />
    <App />
  </BrowserRouter>,
);
