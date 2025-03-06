// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/App.css';
import './styles/AdaptiveContainer.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);