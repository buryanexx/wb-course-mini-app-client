// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Home from './pages/Home';
import Modules from './pages/Modules';
import Module from './pages/Module';
import Lesson from './pages/Lesson';
import About from './pages/About';
import NotFound from './pages/NotFound';
import KnowledgeBase from './pages/KnowledgeBase';
import KnowledgeCategory from './pages/KnowledgeCategory';
import Article from './pages/Article';
import Tools from './pages/Tools';
import MarginCalculator from './pages/MarginCalculator';
import { initTelegramApp } from './utils/telegram';
import './styles/global.css';
import './styles/App.css';
import './styles/Typography.css';
import Toast from './components/Toast';

const App = () => {
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    // Инициализация Telegram Mini App
    initTelegramApp();
    
    // Проверка предпочтений пользователя для темной темы
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode || prefersDarkMode);
    
    document.body.classList.toggle('dark-theme', darkMode);
    
    // Отслеживание изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.body.classList.toggle('dark-theme', newDarkMode);
  };
  
  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, ...toast }]);
    
    // Автоматическое удаление уведомления через 5 секунд
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };
  
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };
  
  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className={`main-content ${isMobile ? 'has-bottom-nav' : ''}`}>
          <Routes>
            <Route path="/" element={<Home addToast={addToast} />} />
            <Route path="/modules" element={<Modules addToast={addToast} />} />
            <Route path="/modules/:moduleId" element={<Module addToast={addToast} />} />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={<Lesson addToast={addToast} />} />
            <Route path="/knowledge" element={<KnowledgeBase addToast={addToast} />} />
            <Route path="/knowledge/:categoryId" element={<KnowledgeCategory addToast={addToast} />} />
            <Route path="/knowledge/:categoryId/article/:articleId" element={<Article addToast={addToast} />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/margin-calculator" element={<MarginCalculator addToast={addToast} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
        
        {isMobile && <MobileBottomNav />}
        
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
