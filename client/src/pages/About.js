// client/src/pages/About.js
import React from 'react';
import { ArrowRight, Award, Users, BookOpen, Star, Shield, TrendingUp } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import PremiumButton from '../components/PremiumButton';
import PremiumCard from '../components/PremiumCard';
import AnimatedElement from '../components/AnimatedElement';
import '../styles/About.css';
import FeedbackForm from '../components/FeedbackForm';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h1 className="about-title">О курсе WB Решение</h1>
            <p className="about-subtitle">
              Ваш путь к успешному бизнесу на Wildberries начинается здесь
            </p>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="about-mission">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="mission-container">
              <h2 className="section-title">Наша миссия</h2>
              <p className="mission-text">
                Мы создали WB Решение с одной целью — помочь предпринимателям построить успешный бизнес на маркетплейсе Wildberries. Наша команда экспертов объединила многолетний опыт работы с платформой, чтобы предоставить вам самые эффективные стратегии и инструменты.
              </p>
              <p className="mission-text">
                Мы верим, что каждый может достичь финансовой независимости через электронную коммерцию, имея правильные знания и поддержку. Наш курс — это не просто набор видеоуроков, а полноценная система обучения с практическими заданиями, обратной связью и постоянными обновлениями.
              </p>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="about-benefits">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h2 className="section-title">Преимущества курса</h2>
            <p className="section-description">
              Почему тысячи предпринимателей выбирают именно нас
            </p>
          </AnimatedElement>
          
          <div className="benefits-grid">
            <AnimatedElement animation="fade-up" delay={0.1}>
              <PremiumCard 
                title="Актуальные знания" 
                icon={<BookOpen size={24} />}
                variant="primary"
              >
                <p>Наш курс регулярно обновляется с учетом последних изменений на платформе Wildberries и трендов рынка.</p>
              </PremiumCard>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.2}>
              <PremiumCard 
                title="Практический подход" 
                icon={<TrendingUp size={24} />}
                variant="primary"
              >
                <p>Все стратегии и методики проверены на реальных кейсах и действующих бизнесах наших выпускников.</p>
              </PremiumCard>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.3}>
              <PremiumCard 
                title="Поддержка экспертов" 
                icon={<Shield size={24} />}
                variant="primary"
              >
                <p>Наши преподаватели — практикующие специалисты с многолетним опытом работы на маркетплейсах.</p>
              </PremiumCard>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.4}>
              <PremiumCard 
                title="Сообщество" 
                icon={<Users size={24} />}
                variant="primary"
              >
                <p>Вы станете частью сообщества единомышленников, где можно обмениваться опытом и находить партнеров.</p>
              </PremiumCard>
            </AnimatedElement>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="about-stats">
        <AdaptiveContainer>
          <div className="stats-grid">
            <AnimatedElement animation="fade-up" delay={0.1}>
              <div className="stat-item">
                <div className="stat-value">5000+</div>
                <div className="stat-label">Выпускников</div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.2}>
              <div className="stat-item">
                <div className="stat-value">8</div>
                <div className="stat-label">Модулей обучения</div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.3}>
              <div className="stat-item">
                <div className="stat-value">97%</div>
                <div className="stat-label">Положительных отзывов</div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.4}>
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Поддержка</div>
              </div>
            </AnimatedElement>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="about-team">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h2 className="section-title">Наша команда</h2>
            <p className="section-description">
              Познакомьтесь с экспертами, которые помогут вам достичь успеха
            </p>
          </AnimatedElement>
          
          <div className="team-grid">
            <AnimatedElement animation="fade-up" delay={0.1}>
              <div className="team-member">
                <div className="team-member-photo team-member-photo-1"></div>
                <h3 className="team-member-name">Александр Петров</h3>
                <p className="team-member-position">Основатель и главный эксперт</p>
                <p className="team-member-bio">
                  Более 7 лет опыта работы с маркетплейсами. Построил бизнес с оборотом более 10 млн рублей в месяц.
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.2}>
              <div className="team-member">
                <div className="team-member-photo team-member-photo-2"></div>
                <h3 className="team-member-name">Екатерина Смирнова</h3>
                <p className="team-member-position">Эксперт по маркетингу</p>
                <p className="team-member-bio">
                  Специалист по продвижению товаров на маркетплейсах. Опыт работы с более чем 200 успешными проектами.
                </p>
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-up" delay={0.3}>
              <div className="team-member">
                <div className="team-member-photo team-member-photo-3"></div>
                <h3 className="team-member-name">Дмитрий Иванов</h3>
                <p className="team-member-position">Аналитик</p>
                <p className="team-member-bio">
                  Эксперт по аналитике продаж и оптимизации ассортимента. Помогает клиентам увеличивать прибыль на 30-50%.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="about-cta">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="cta-container">
              <h2 className="cta-title">Готовы начать свой путь к успеху?</h2>
              <p className="cta-description">
                Присоединяйтесь к тысячам предпринимателей, которые уже развивают свой бизнес с WB Решение
              </p>
              <PremiumButton 
                to="/modules" 
                variant="gradient" 
                size="large"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Начать обучение
              </PremiumButton>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <div className="feedback-section">
        <h2>Связаться с нами</h2>
        <p>
          Если у вас есть вопросы, предложения или вы хотите узнать больше о курсе, 
          заполните форму ниже:
        </p>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default About;