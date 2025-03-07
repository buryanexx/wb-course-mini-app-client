import React, { useEffect } from 'react';
import './styles/App.css';

function App() {
  useEffect(() => {
    // Инициализация Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>WB Курс</h1>
        <p>Минимальная версия приложения для деплоя</p>
      </header>
      <main className="app-content">
        <p>Приложение успешно развернуто!</p>
        <p>Полная версия будет доступна в ближайшее время.</p>
      </main>
    </div>
  );
}

export default App; 