import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">© {currentYear} WB Решение. Все права защищены.</p>
        <div className="footer-links">
          <a href="#" className="footer-link">Политика конфиденциальности</a>
          <a href="#" className="footer-link">Условия использования</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;