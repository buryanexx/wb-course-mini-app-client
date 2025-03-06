import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'react-feather';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="footer-logo-icon"></div>
          <span className="footer-logo-text">WB Решение</span>
        </div>
        
        <p className="copyright">© {currentYear} WB Решение. Все права защищены.</p>
        
        <div className="footer-links">
          <Link to="/about" className="footer-link">О нас</Link>
          <a href="#" className="footer-link">Политика конфиденциальности</a>
          <a href="#" className="footer-link">Условия использования</a>
          <a href="#" className="footer-link">Контакты</a>
        </div>
        
        <div className="footer-social">
          <a href="#" className="social-link" aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href="#" className="social-link" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <Twitter size={16} />
          </a>
          <a href="#" className="social-link" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;