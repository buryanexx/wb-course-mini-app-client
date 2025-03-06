import React from 'react';
import PropTypes from 'prop-types';
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

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired
};

export default Header;