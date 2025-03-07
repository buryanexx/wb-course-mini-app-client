import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'react-feather';
import '../styles/Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Закрытие меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-text">WB Решение</span>
        </Link>
        
        <nav className={`header-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <button 
            className="header-close-menu" 
            onClick={() => setIsMenuOpen(false)}
            aria-label="Закрыть меню"
          >
            <X size={24} />
          </button>
          
          <ul className="header-menu">
            <li className="header-menu-item">
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Главная
              </Link>
            </li>
            <li className="header-menu-item">
              <Link 
                to="/modules" 
                className={location.pathname.startsWith('/modules') ? 'active' : ''}
              >
                Модули
              </Link>
            </li>
            <li className="header-menu-item">
              <Link 
                to="/knowledge" 
                className={location.pathname.startsWith('/knowledge') ? 'active' : ''}
              >
                База знаний
              </Link>
            </li>
            <li className="header-menu-item">
              <Link 
                to="/tools" 
                className={location.pathname.startsWith('/tools') ? 'active' : ''}
              >
                Инструменты
              </Link>
            </li>
            <li className="header-menu-item">
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                О нас
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <button 
            className="header-theme-toggle interactive-element" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Включить светлую тему' : 'Включить темную тему'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="header-menu-toggle interactive-element" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div 
          className="header-overlay" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;