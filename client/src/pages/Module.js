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
          <AnimatedElement animation="fade-up">
            <Link to="/modules" className="module-back-button">
              <ArrowLeft size={16} />
              <span>Назад к модулям</span>
            </Link>
            
            <h1 className="module-title">{module.title}</h1>
            
            <div className="module-meta">
              {module.level && (
                <div className={`module-level module-level-${module.level.toLowerCase()}`}>
                  {module.level}
                </div>
              )}
              
              {module.lessonsCount && (
                <div className="module-meta-item">
                  <Book size={16} />
                  <span>{module.lessonsCount} уроков</span>
                </div>
              )}
              
              {module.duration && (
                <div className="module-meta-item">
                  <Clock size={16} />
                  <span>{module.duration}</span>
                </div>
              )}
              
              {module.studentsCount && (
                <div className="module-meta-item">
                  <Users size={16} />
                  <span>{module.studentsCount} учеников</span>
                </div>
              )}
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="module-content">
        <AdaptiveContainer>
          <div className="module-layout">
            <div className="module-main">
              <AnimatedElement animation="fade-up">
                <div className="module-description">
                  <h2 className="section-title">Описание модуля</h2>
                  <div className="module-description-content">
                    <p>{module.description}</p>
                  </div>
                </div>
              </AnimatedElement>
              
              <AnimatedElement animation="fade-up" delay={0.1}>
                <div className="module-lessons">
                  <h2 className="section-title">Уроки модуля</h2>
                  
                  <div className="module-progress">
                    <div className="module-progress-info">
                      <div className="module-progress-title">Ваш прогресс</div>
                      <div className="module-progress-stats">
                        <span className="module-progress-completed">{completedLessons}</span>
                        <span className="module-progress-separator">/</span>
                        <span className="module-progress-total">{lessons.length}</span>
                        <span className="module-progress-text">уроков завершено</span>
                      </div>
                    </div>
                    <ProgressIndicator progress={progress} />
                  </div>
                  
                  <div className="lessons-list">
                    {lessons.map(lesson => (
                      <LessonCard 
                        key={lesson.id}
                        {...lesson}
                        moduleId={moduleId}
                      />
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>
            
            <div className="module-sidebar">
              <AnimatedElement animation="fade-left">
                <div className="module-card">
                  {module.price !== undefined && (
                    <div className="module-price">
                      <PriceTag 
                        price={module.price} 
                        oldPrice={module.oldPrice} 
                        discount={module.discount}
                        variant="gradient"
                        size="large"
                      />
                    </div>
                  )}
                  
                  <div className="module-actions">
                    {lessons.length > 0 && (
                      <PremiumButton 
                        to={`/modules/${moduleId}/lessons/${lessons[0].id}`}
                        variant="gradient"
                        size="large"
                        fullWidth
                      >
                        {progress > 0 ? 'Продолжить обучение' : 'Начать обучение'}
                      </PremiumButton>
                    )}
                  </div>
                  
                  {module.features && module.features.length > 0 && (
                    <div className="module-features">
                      <h3 className="module-features-title">Что вы получите</h3>
                      <ul className="module-features-list">
                        {module.features.map((feature, index) => (
                          <li key={index} className="module-feature-item">
                            <Award size={16} className="module-feature-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Module; 