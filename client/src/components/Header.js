import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'react-feather';
import '../styles/Header.css';

const Header = ({ toggleMenu, isMenuOpen }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">WB Решение</span>
        </Link>
        
        <nav className="desktop-nav">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Главная
          </Link>
          <Link to="/modules" className={location.pathname.includes('/modules') ? 'nav-link active' : 'nav-link'}>
            Модули
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>
            О курсе
          </Link>
        </nav>
        
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Меню">
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;