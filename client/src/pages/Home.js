// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import AdaptiveContainer from '../components/AdaptiveContainer';
import CircleNumber from '../components/CircleNumber';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <AdaptiveContainer>
        <h1>О компании</h1>
        <p className="course-description">
          WB Решение поможет вам с нуля разобраться в работе маркетплейса и построить прибыльный бизнес. Вы получите пошаговую инструкцию и все необходимые инструменты для запуска продаж на Wildberries.
        </p>
        
        <div className="course-features">
          <div className="feature">
            <CircleNumber number="8" />
            <div>
              <h3>Модули</h3>
              <p>Комплексный подход к обучению</p>
            </div>
          </div>
          
          <div className="feature">
            <CircleNumber number="48" />
            <div>
              <h3>Уроков</h3>
              <p>Подробные видео с практическими заданиями</p>
            </div>
          </div>
          
          <div className="feature">
            <CircleNumber number="16" />
            <div>
              <h3>Часов</h3>
              <p>Концентрированные знания без воды</p>
            </div>
          </div>
        </div>
        
        <Link to="/modules" className="start-button">
          Начать обучение
        </Link>
      </AdaptiveContainer>
    </div>
  );
};

export default Home;