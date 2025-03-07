// client/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, TrendingUp } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import ModuleCard from '../components/ModuleCard';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import '../styles/Home.css';
import { getModules } from '../utils/api';
import Carousel from '../components/Carousel';

const Home = ({ addToast }) => {
  const [featuredModules, setFeaturedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedModules = async () => {
      try {
        setLoading(true);
        const modules = await getModules();
        // Берем первые 3 модуля для отображения на главной
        setFeaturedModules(modules.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured modules:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить рекомендуемые модули'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedModules();
  }, [addToast]);
  
  const featuredItems = [
    {
      id: 1,
      title: "Как увеличить продажи на Wildberries",
      description: "Практические советы и стратегии для роста продаж",
      image: "/images/featured-1.jpg",
      link: "/knowledge/marketing/article/increase-sales"
    },
    {
      id: 2,
      title: "Новые правила работы с маркетплейсом",
      description: "Обзор последних изменений в правилах Wildberries",
      image: "/images/featured-2.jpg",
      link: "/knowledge/rules/article/new-rules-2023"
    },
    {
      id: 3,
      title: "Оптимизация карточек товаров",
      description: "Как правильно оформить карточку товара для максимальных продаж",
      image: "/images/featured-3.jpg",
      link: "/knowledge/product/article/card-optimization"
    }
  ];
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <AdaptiveContainer>
          <div className="hero-content">
            <AnimatedElement animation="fade-up">
              <h1 className="hero-title">Курс по выходу на Wildberries</h1>
              <p className="hero-subtitle">От нуля до прибыли в 300 000 рублей</p>
              
              <div className="hero-cta">
                <Link to="/modules">
                  <Button 
                    variant="primary" 
                    size="large"
                    icon={<ArrowRight size={20} />}
                    iconPosition="right"
                  >
                    Начать обучение
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </AdaptiveContainer>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h2 className="section-title">Почему наш курс?</h2>
            
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
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      {/* Featured Modules Section */}
      <section className="featured-modules">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="section-header">
              <h2 className="section-title">Популярные модули</h2>
              <Link to="/modules" className="section-link">
                Все модули
                <ArrowRight size={16} />
              </Link>
            </div>
            
            {loading ? (
              <div className="loading-modules">
                <div className="loader"></div>
                <p>Загрузка модулей...</p>
              </div>
            ) : (
              <div className="modules-grid">
                {featuredModules.map((module, index) => (
                  <AnimatedElement 
                    key={module.id} 
                    animation="fade-up"
                    delay={index * 0.1}
                  >
                    <ModuleCard module={module} />
                  </AnimatedElement>
                ))}
              </div>
            )}
            
            <div className="featured-modules-cta">
              <Link to="/modules">
                <Button 
                  variant="outline" 
                  size="medium"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Смотреть все модули
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      {/* Home Featured Section */}
      <section className="home-featured">
        <h2 className="section-title">Популярные материалы</h2>
        <Carousel
          items={featuredItems}
          renderItem={(item) => (
            <div className="featured-item">
              <div className="featured-image" style={{ backgroundImage: `url(${item.image || '/images/placeholder.jpg'})` }}></div>
              <div className="featured-content">
                <h3 className="featured-title">{item.title}</h3>
                <p className="featured-description">{item.description}</p>
                <Link to={item.link} className="featured-link">Читать подробнее</Link>
              </div>
            </div>
          )}
        />
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="cta-card">
              <h2 className="cta-title">Готовы начать свой путь к успеху?</h2>
              <p className="cta-description">
                Присоединяйтесь к тысячам предпринимателей, которые уже зарабатывают на Wildberries
              </p>
              
              <Link to="/modules">
                <Button 
                  variant="primary" 
                  size="large"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Начать обучение
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Home;