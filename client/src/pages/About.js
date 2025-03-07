// client/src/pages/About.js
import React from 'react';
import { BookOpen, Award, TrendingUp, Users, Star, Mail, Phone } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-header">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h1 className="about-title">О курсе</h1>
            <p className="about-subtitle">
              Курс по выходу на Wildberries: от нуля до прибыли в 300 000 рублей
            </p>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="about-description">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="about-description-content">
              <h2>Что вы получите</h2>
              <p>
                Наш курс предоставляет полное руководство по запуску и развитию бизнеса на маркетплейсе Wildberries. 
                Вы узнаете все необходимые шаги от регистрации до масштабирования продаж и оптимизации процессов.
              </p>
              <p>
                Курс разработан практикующими экспертами, которые делятся реальным опытом и проверенными стратегиями. 
                Все материалы постоянно обновляются в соответствии с изменениями на платформе.
              </p>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="about-features">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h2 className="section-title">Преимущества курса</h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen size={32} />
                </div>
                <h3 className="feature-title">Практические знания</h3>
                <p className="feature-description">
                  Все материалы основаны на реальном опыте успешных продавцов
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Award size={32} />
                </div>
                <h3 className="feature-title">Поддержка экспертов</h3>
                <p className="feature-description">
                  Наши эксперты помогут решить любые вопросы в процессе обучения
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp size={32} />
                </div>
                <h3 className="feature-title">Гарантированный результат</h3>
                <p className="feature-description">
                  Следуя нашим рекомендациям, вы достигнете желаемых результатов
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Users size={32} />
                </div>
                <h3 className="feature-title">Сообщество</h3>
                <p className="feature-description">
                  Доступ к закрытому сообществу учеников и выпускников курса
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Star size={32} />
                </div>
                <h3 className="feature-title">Дополнительные материалы</h3>
                <p className="feature-description">
                  Шаблоны, чек-листы и другие полезные материалы для работы
                </p>
              </div>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="about-stats">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">8+</div>
                <div className="stat-label">Модулей</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">42+</div>
                <div className="stat-label">Уроков</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">1200+</div>
                <div className="stat-label">Учеников</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-value">300K+</div>
                <div className="stat-label">Средний доход выпускников</div>
              </div>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="about-contact">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="contact-card">
              <h2 className="contact-title">Остались вопросы?</h2>
              <p className="contact-description">
                Свяжитесь с нами любым удобным способом, и мы ответим на все ваши вопросы
              </p>
              
              <div className="contact-methods">
                <a href="tel:+79001234567" className="contact-method">
                  <Phone size={20} />
                  <span>+7 (900) 123-45-67</span>
                </a>
                
                <a href="mailto:info@wb-course.ru" className="contact-method">
                  <Mail size={20} />
                  <span>info@wb-course.ru</span>
                </a>
              </div>
              
              <Button 
                variant="primary" 
                size="large"
                fullWidth
              >
                Записаться на консультацию
              </Button>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default About;