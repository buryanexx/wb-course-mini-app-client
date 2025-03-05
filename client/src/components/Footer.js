import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} WB-курс. Все права защищены.</p>
        <div className="footer-links">
          <a href="/policy">Политика конфиденциальности</a>
          <a href="/terms">Условия использования</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;