// client/src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import ModulesList from './pages/ModulesList';
import ModuleDetail from './pages/ModuleDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Инициализация Telegram WebApp
  useEffect(() => {
    // Проверяем, что Telegram WebApp уже загружен
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      // Получаем цвета из темы Telegram
      const {
        bg_color,
        text_color,
        hint_color,
        link_color,
        button_color,
        button_text_color
      } = tg.themeParams;
      
      // Устанавливаем CSS переменные
      document.documentElement.style.setProperty('--tg-theme-bg-color', bg_color || '#FFFFFF');
      document.documentElement.style.setProperty('--tg-theme-text-color', text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', link_color || '#0088cc');
      document.documentElement.style.setProperty('--tg-theme-button-color', button_color || '#0088cc');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', button_text_color || '#FFFFFF');
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleMenu={toggleMenu} />
        <Menu isOpen={menuOpen} toggleMenu={toggleMenu} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<ModulesList />} />
            <Route path="/modules/:id" element={<ModuleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
