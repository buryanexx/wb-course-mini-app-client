import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Book, Clock, Award, Users } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import LessonCard from '../components/LessonCard';
import PremiumButton from '../components/PremiumButton';
import PriceTag from '../components/PriceTag';
import AnimatedElement from '../components/AnimatedElement';
import ProgressIndicator from '../components/ProgressIndicator';
import '../styles/Module.css';
import { getModule, getLessons } from '../utils/api';
import Button from '../components/Button';

const Module = ({ showToast }) => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        setLoading(true);
        const moduleData = await getModule(moduleId);
        const lessonsData = await getLessons(moduleId);
        
        setModule(moduleData);
        setLessons(lessonsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching module:', err);
        setError('Не удалось загрузить модуль. Пожалуйста, попробуйте позже.');
        showToast && showToast('Ошибка при загрузке модуля', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchModuleData();
  }, [moduleId, showToast]);
  
  if (loading) {
    return (
      <div className="module-loading">
        <div className="loader"></div>
        <p>Загрузка модуля...</p>
      </div>
    );
  }
  
  if (error || !module) {
    return (
      <div className="module-error">
        <h2>Ошибка</h2>
        <p>{error || 'Модуль не найден'}</p>
        <Link to="/modules" className="module-back-link">
          Вернуться к списку модулей
        </Link>
      </div>
    );
  }
  
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const progress = Math.round((completedLessons / lessons.length) * 100) || 0;
  
  return (
    <div className="module-page">
      <section className="module-hero" style={{ backgroundImage: `url(${module.image})` }}>
        <div className="module-hero-overlay"></div>
        <AdaptiveContainer>
          <div className="module-hero-content">
            <Link to="/modules" className="module-back-link">
              <ArrowLeft size={16} />
              <span>Назад к модулям</span>
            </Link>
            
            <AnimatedElement animation="fade-up">
              <h1 className="module-title">{module.title}</h1>
              
              <div className="module-meta">
                {module.level && (
                  <div className="module-level">
                    <Award size={16} />
                    <span>{module.level}</span>
                  </div>
                )}
                
                {module.duration && (
                  <div className="module-duration">
                    <Clock size={16} />
                    <span>{module.duration}</span>
                  </div>
                )}
                
                {module.studentsCount && (
                  <div className="module-students">
                    <Users size={16} />
                    <span>{module.studentsCount} учеников</span>
                  </div>
                )}
              </div>
              
              <div className="module-progress-container">
                <div className="module-progress-info">
                  <span>Прогресс модуля</span>
                  <span>{completedLessons}/{lessons.length} уроков</span>
                </div>
                <ProgressIndicator progress={progress} />
              </div>
            </AnimatedElement>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="module-content">
        <AdaptiveContainer>
          <div className="module-description">
            <AnimatedElement animation="fade-up">
              <h2 className="module-section-title">О модуле</h2>
              <div className="module-description-text">
                <p>{module.description}</p>
              </div>
            </AnimatedElement>
          </div>
          
          <div className="module-lessons">
            <AnimatedElement animation="fade-up" delay={0.1}>
              <h2 className="module-section-title">Уроки в этом модуле</h2>
              
              <div className="module-lessons-list">
                {lessons.map((lesson, index) => (
                  <AnimatedElement 
                    key={lesson.id} 
                    animation="fade-up"
                    delay={index * 0.05}
                  >
                    <LessonCard 
                      lesson={lesson}
                      moduleId={moduleId}
                      index={index + 1}
                    />
                  </AnimatedElement>
                ))}
              </div>
            </AnimatedElement>
          </div>
          
          {module.premium && (
            <div className="module-premium">
              <AnimatedElement animation="fade-up" delay={0.2}>
                <div className="module-premium-card">
                  <h2 className="module-premium-title">Получите полный доступ</h2>
                  <p className="module-premium-description">
                    Разблокируйте все уроки этого модуля и получите доступ к дополнительным материалам.
                  </p>
                  
                  <div className="module-premium-features">
                    <div className="module-premium-feature">
                      <Check size={18} />
                      <span>Все уроки модуля</span>
                    </div>
                    <div className="module-premium-feature">
                      <Check size={18} />
                      <span>Дополнительные материалы</span>
                    </div>
                    <div className="module-premium-feature">
                      <Check size={18} />
                      <span>Доступ навсегда</span>
                    </div>
                  </div>
                  
                  <div className="module-premium-price">
                    <PriceTag price={module.price} />
                  </div>
                  
                  <PremiumButton 
                    variant="gradient"
                    size="large"
                    fullWidth
                  >
                    Получить доступ
                  </PremiumButton>
                </div>
              </AnimatedElement>
            </div>
          )}
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Module; 