import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { X, Home, Book, Info, Settings, HelpCircle } from 'react-feather';
import '../styles/Menu.css';

const Menu = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <div className="menu-logo">
            <div className="menu-logo-icon"></div>
            <span>WB Решение</span>
          </div>
          <button className="close-button" onClick={toggleMenu} aria-label="Закрыть меню">
            <X size={24} />
          </button>
        </div>
        
        <div className="menu-content">
          <div className="menu-nav">
            <h3 className="menu-nav-title">Навигация</h3>
            <ul className="menu-nav-list">
              <li className="menu-nav-item">
                <NavLink to="/" className="menu-nav-link" onClick={toggleMenu}>
                  <span className="menu-nav-icon"><Home size={18} /></span>
                  Главная
                </NavLink>
              </li>
              <li className="menu-nav-item">
                <NavLink to="/modules" className="menu-nav-link" onClick={toggleMenu}>
                  <span className="menu-nav-icon"><Book size={18} /></span>
                  Модули
                </NavLink>
              </li>
              <li className="menu-nav-item">
                <NavLink to="/about" className="menu-nav-link" onClick={toggleMenu}>
                  <span className="menu-nav-icon"><Info size={18} /></span>
                  О нас
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div className="menu-nav">
            <h3 className="menu-nav-title">Поддержка</h3>
            <ul className="menu-nav-list">
              <li className="menu-nav-item">
                <a href="#" className="menu-nav-link">
                  <span className="menu-nav-icon"><HelpCircle size={18} /></span>
                  Помощь
                </a>
              </li>
              <li className="menu-nav-item">
                <a href="#" className="menu-nav-link">
                  <span className="menu-nav-icon"><Settings size={18} /></span>
                  Настройки
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="menu-footer">
          Версия 1.0.0
        </div>
      </nav>
    </>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default Menu;