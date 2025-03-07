import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Database, Settings, Info } from 'react-feather';
import '../styles/MobileBottomNav.css';

const MobileBottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Главная', icon: <Home size={20} /> },
    { path: '/modules', label: 'Модули', icon: <Book size={20} /> },
    { path: '/knowledge', label: 'База', icon: <Database size={20} /> },
    { path: '/tools', label: 'Инструменты', icon: <Settings size={20} /> },
    { path: '/about', label: 'О нас', icon: <Info size={20} /> }
  ];
  
  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`mobile-nav-item ${location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? 'active' : ''}`}
        >
          <div className="mobile-nav-icon">{item.icon}</div>
          <span className="mobile-nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileBottomNav; 