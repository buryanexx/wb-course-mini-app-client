import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'react-feather';
import '../styles/Header.css';

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <div className="header-container">
        <button className="menu-button" onClick={toggleMenu} aria-label="Меню">
          <Menu size={24} />
        </button>
        <Link to="/" className="logo">
          WB-курс
        </Link>
      </div>
    </header>
  );
};

export default Header;