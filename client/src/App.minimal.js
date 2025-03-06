import React, { useEffect } from 'react';
import './styles/App.css';

function MinimalApp() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <h1>WB Решение</h1>
        </div>
      </header>
      <main className="main-content">
        <h2>Добро пожаловать в WB Решение!</h2>
        <p>Это минимальная версия приложения для тестирования.</p>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="copyright">© {new Date().getFullYear()} WB Решение. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}

export default MinimalApp; 