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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Временно отключаем строгий режим
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);