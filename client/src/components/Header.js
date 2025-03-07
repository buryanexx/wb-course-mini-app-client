import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'react-feather';
import '../styles/Header.css';

const Header = ({ darkMode, toggleDarkMode, toggleMenu, isMenuOpen }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">WB Решение</span>
        </Link>
        
        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Включить светлую тему" : "Включить темную тему"}
            title={darkMode ? "Включить светлую тему" : "Включить темную тему"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            title={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;