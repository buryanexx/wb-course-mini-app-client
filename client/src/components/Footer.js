import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'react-feather';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              WB Решение
            </Link>
            <p className="footer-tagline">
              Ваш надежный партнер в мире маркетплейсов
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4 className="footer-links-title">Навигация</h4>
              <ul className="footer-links-list">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/modules">Модули</Link></li>
                <li><Link to="/about">О курсе</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-links-title">Контакты</h4>
              <ul className="footer-links-list">
                <li><a href="mailto:info@wbsolution.ru">info@wbsolution.ru</a></li>
                <li><a href="tel:+79001234567">+7 (900) 123-45-67</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} WB Решение. Все права защищены.
          </p>
          <p className="footer-made-with">
            Сделано с <Heart size={14} className="heart-icon" /> в России
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;