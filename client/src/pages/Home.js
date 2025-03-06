// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, BookOpen } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import CircleNumber from '../components/CircleNumber';
import Button from '../components/Button';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <AdaptiveContainer>
          <h1 className="hero-title">WB Решение</h1>
          <p className="hero-subtitle">
            Ваш надежный партнер в мире маркетплейсов
          </p>
          <p className="course-description">
            WB Решение поможет вам с нуля разобраться в работе маркетплейса и построить прибыльный бизнес. 
            Вы получите пошаговую инструкцию и все необходимые инструменты для запуска продаж на Wildberries.
          </p>
          
          <div className="course-features">
            <div className="feature">
              <div className="feature-icon">
                <BookOpen size={24} color="#0088cc" />
              </div>
              <div className="feature-content">
                <h3>8 Модулей</h3>
                <p>Комплексный подход к обучению</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <Award size={24} color="#0088cc" />
              </div>
              <div className="feature-content">
                <h3>48 Уроков</h3>
                <p>Подробные видео с практическими заданиями</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">
                <Clock size={24} color="#0088cc" />
              </div>
              <div className="feature-content">
                <h3>16 Часов</h3>
                <p>Концентрированные знания без воды</p>
              </div>
            </div>
          </div>
          
          <div className="cta-section">
            <Button 
              variant="primary" 
              size="large" 
              icon={<ArrowRight size={18} />} 
              iconPosition="right"
              onClick={() => window.location.href = '/modules'}
            >
              Начать обучение
            </Button>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="benefits-section">
        <AdaptiveContainer>
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Быстрый старт</h3>
              <p>Запустите свой бизнес на маркетплейсе в кратчайшие сроки</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Увеличение продаж</h3>
              <p>Проверенные стратегии для роста вашего бизнеса</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔍</div>
              <h3>Аналитика рынка</h3>
              <p>Научитесь анализировать нишу и находить прибыльные товары</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Оптимизация процессов</h3>
              <p>Автоматизируйте рутинные задачи и сосредоточьтесь на развитии</p>
            </div>
          </div>
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Home;