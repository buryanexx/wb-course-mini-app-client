import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const Menu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`menu-container ${isOpen ? 'open' : ''}`}>
      <div className="menu-overlay" onClick={toggleMenu}></div>
      <div className="menu">
        <div className="menu-header">
          <h2>Меню</h2>
          <button className="close-button" onClick={toggleMenu}>
            <span>✕</span>
          </button>
        </div>
        <nav className="menu-nav">
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>
                <span className="menu-icon">🏠</span>
                <span>Главная</span>
              </Link>
            </li>
            <li>
              <Link to="/modules" onClick={toggleMenu}>
                <span className="menu-icon">📦</span>
                <span>Модули курса</span>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenu}>
                <span className="menu-icon">ℹ️</span>
                <span>О проекте</span>
              </Link>
            </li>
            <li>
              <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                <span className="menu-icon">💬</span>
                <span>Обратная связь</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;