import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { initTelegramApp } from './utils/telegram';
import './styles/global.css';
import './styles/App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Инициализация Telegram Mini App
    initTelegramApp();
    
    // Проверка предпочтений пользователя для темной темы
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode || prefersDarkMode);
    
    document.body.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.body.classList.toggle('dark-theme', newDarkMode);
  };
  
  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App; 