// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Home from './pages/Home';
import Modules from './pages/Modules';
import Module from './pages/Module';
import Lesson from './pages/Lesson';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { initTelegramApp } from './utils/telegram';
import './styles/global.css';
import './styles/App.css';
import './styles/Typography.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    initTelegramApp();
    // Проверка предпочтений пользователя для темной темы
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(localStorage.getItem('darkMode') === 'true' || prefersDarkMode);
    
    document.body.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };
  
  const addToast = (toast) => {
    const id = Date.now();
    setToasts([...toasts, { ...toast, id }]);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };
  
  const removeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };
  
  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
        <Navbar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onDarkModeToggle={toggleDarkMode}
          darkMode={darkMode}
        />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="main-content" onClick={isMenuOpen ? closeMenu : undefined}>
          <Routes>
            <Route path="/" element={<Home addToast={addToast} />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/modules/:moduleId" element={<Module />} />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={<Lesson />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
        
        <div className="toast-container">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;
