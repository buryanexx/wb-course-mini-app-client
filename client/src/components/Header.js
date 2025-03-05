import React from 'react';
import '../styles/Header.css';

const Header = ({ toggleMenu }) => {
  return (
    <header className="header">
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span>☰</span>
      </div>
      <div className="logo">
        <h1>WB-курс</h1>
      </div>
    </header>
  );
};

export default Header;