import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, Info, X } from 'react-feather';
import '../styles/Sidebar.css';

const Sidebar = ({ open, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Главная', icon: <Home size={18} /> },
    { path: '/modules', label: 'Модули', icon: <Book size={18} /> },
    { path: '/about', label: 'О курсе', icon: <Info size={18} /> }
  ];
  
  return (
    <div className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Меню</h2>
        <button 
          className="sidebar-close" 
          onClick={onClose}
          aria-label="Закрыть меню"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sidebar-menu-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'sidebar-menu-link sidebar-menu-link-active' : 'sidebar-menu-link'
                }
                onClick={onClose}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                <span className="sidebar-menu-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 