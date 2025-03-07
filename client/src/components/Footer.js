import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">WB Решение</span>
            </Link>
            <p className="footer-tagline">
              Ваш надежный партнер в мире маркетплейсов
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-links-title">Навигация</h3>
              <ul className="footer-links-list">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/modules">Модули</Link></li>
                <li><Link to="/knowledge">База знаний</Link></li>
                <li><Link to="/tools">Инструменты</Link></li>
                <li><Link to="/about">О нас</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Контакты</h3>
              <ul className="footer-links-list">
                <li><a href="tel:+79001234567">+7 (900) 123-45-67</a></li>
                <li><a href="mailto:info@wb-reshenie.ru">info@wb-reshenie.ru</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} WB Решение. Все права защищены.
          </div>
          
          <div className="footer-made-with">
            Сделано с <span className="heart">❤</span> в России
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;