import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Info, Book } from 'react-feather';
import '../styles/Header.css';

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="menu-button" onClick={toggleMenu} aria-label="Меню">
            <Menu size={24} />
          </button>
          <Link to="/" className="logo">
            <div className="logo-icon"></div>
            <span>WB Решение</span>
          </Link>
        </div>
        
        <div className="header-right">
          <div className="header-actions">
            <Link to="/modules" className="header-action">
              <Book size={16} />
              <span>Модули</span>
            </Link>
            <Link to="/about" className="header-action">
              <Info size={16} />
              <span>О нас</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};

export default Header;