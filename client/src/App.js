// client/src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import ModulesList from './pages/ModulesList';
import ModuleDetail from './pages/ModuleDetail';
import About from './pages/About';
import './styles/App.css';

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Инициализация Telegram WebApp
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand();
        
        // Настройка цветовой схемы в зависимости от темы Telegram
        document.documentElement.style.setProperty(
          '--tg-theme-bg-color', 
          tg.themeParams.bg_color || '#FFFFFF'
        );
        document.documentElement.style.setProperty(
          '--tg-theme-text-color', 
          tg.themeParams.text_color || '#000000'
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
