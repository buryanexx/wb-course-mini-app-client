import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Book, Info } from 'react-feather';
import '../styles/Menu.css';

const Menu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="menu" onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h2 className="menu-title">Меню</h2>
          <button className="close-button" onClick={toggleMenu} aria-label="Закрыть меню">
            <X size={24} />
          </button>
        </div>
        <nav className="menu-nav">
          <Link to="/" className="menu-item" onClick={toggleMenu}>
            <Home size={20} />
            <span>Главная</span>
          </Link>
          <Link to="/modules" className="menu-item" onClick={toggleMenu}>
            <Book size={20} />
            <span>Модули курса</span>
          </Link>
          <Link to="/about" className="menu-item" onClick={toggleMenu}>
            <Info size={20} />
            <span>О проекте</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Menu;