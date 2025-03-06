import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun } from 'react-feather';
import '../styles/Navbar.css';

const Navbar = ({ 
  onMenuClick, 
  onDarkModeToggle, 
  darkMode 
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            className="navbar-menu-button" 
            onClick={onMenuClick}
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="navbar-brand">
            WB Курс
          </Link>
        </div>
        
        <div className="navbar-right">
          <button 
            className="navbar-theme-button" 
            onClick={onDarkModeToggle}
            aria-label={darkMode ? "Включить светлую тему" : "Включить темную тему"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 