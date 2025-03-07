// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// Импортируем только основные стили
import './styles/global.css';
import './styles/App.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/Menu.css';
import './styles/ModuleCard.css';
import './styles/Home.css';
import './styles/AdaptiveContainer.css';
import './styles/CircleNumber.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Удаляем регистрацию Service Worker для офлайн-режима
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(registration => {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       })
//       .catch(error => {
//         console.log('ServiceWorker registration failed: ', error);
//       });
//   });
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();