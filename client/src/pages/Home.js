// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'react-feather';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Курс выхода на Wildberries</h1>
        <p className="subtitle">От нуля до 300.000 рублей чистой прибыли</p>
        <div className="hero-image">
          {/* Здесь можно будет добавить иллюстрацию */}
        </div>
      </div>

      <div className="course-overview">
        <h2>О курсе</h2>
        <p>
          Наш курс поможет вам с нуля разобраться в работе с маркетплейсом Wildberries 
          и построить успешный бизнес с доходом до 300.000 рублей в месяц. 
          Мы проведем вас от выбора ниши до масштабирования, предоставив все необходимые 
          инструменты и знания для достижения успеха.
        </p>
        
        <div className="features">
          <div className="feature">
            <div className="feature-icon">
              <span>8</span>
            </div>
            <div className="feature-text">
              <h3>Модулей</h3>
              <p>Комплексная программа обучения</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <span>48</span>
            </div>
            <div className="feature-text">
              <h3>Часов</h3>
              <p>Общая продолжительность</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <span>16</span>
            </div>
            <div className="feature-text">
              <h3>Заданий</h3>
              <p>Практическое применение</p>
            </div>
          </div>
        </div>
        
        <Link to="/modules" className="cta-button">
          <span>Перейти к модулям</span>
          <ChevronRight size={18} />
        </Link>
      </div>

      <div className="course-benefits">
        <h2>Чему вы научитесь</h2>
        <ul className="benefits-list">
          <li>Анализировать рынок и выбирать прибыльные ниши</li>
          <li>Находить надежных поставщиков и вести переговоры</li>
          <li>Создавать привлекательные карточки товаров</li>
          <li>Разрабатывать эффективную финансовую модель</li>
          <li>Оптимизировать логистические процессы</li>
          <li>Запускать результативные рекламные кампании</li>
          <li>Анализировать показатели и масштабировать бизнес</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;