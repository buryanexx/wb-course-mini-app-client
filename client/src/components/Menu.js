import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Info, X } from 'react-feather';
import '../styles/Menu.css';

const Menu = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Главная', icon: <Home size={20} /> },
    { path: '/modules', label: 'Модули', icon: <Book size={20} /> },
    { path: '/about', label: 'О курсе', icon: <Info size={20} /> }
  ];
  
  return (
    <div className={`menu ${isOpen ? 'menu-open' : ''}`}>
      <div className="menu-header">
        <button className="menu-close" onClick={toggleMenu}>
          <X size={24} />
        </button>
      </div>
      
      <nav className="menu-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.path} className="menu-item">
              <Link
                to={item.path}
                className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={toggleMenu}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="menu-footer">
        <p className="menu-copyright">© {new Date().getFullYear()} WB Решение</p>
      </div>
    </div>
  );
};

export default Menu;