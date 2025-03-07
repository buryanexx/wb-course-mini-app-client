import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Book, Clock, Award, Users, Check } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import LessonCard from '../components/LessonCard';
import AnimatedElement from '../components/AnimatedElement';
import ProgressIndicator from '../components/ProgressIndicator';
import Button from '../components/Button';
import '../styles/Module.css';
import { getModule, getLessons } from '../utils/api';

const Module = ({ addToast }) => {
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
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить модуль'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchModuleData();
  }, [moduleId, addToast]);
  
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
  const progress = lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0;
  
  return (
    <div className="module-page">
      <section className="module-header">
        <AdaptiveContainer>
          <div className="module-header-content">
            <div className="module-info">
              <AnimatedElement animation="fade-right">
                <Link to="/modules" className="module-back-link">
                  <ArrowLeft size={20} />
                  <span>Назад к модулям</span>
                </Link>
                
                <h1 className="module-title">{module.title}</h1>
                <p className="module-description">{module.description}</p>
                
                <div className="module-meta">
                  <div className="module-meta-item">
                    <Clock size={18} />
                    <span>{module.duration}</span>
                  </div>
                  <div className="module-meta-item">
                    <Book size={18} />
                    <span>{lessons.length} уроков</span>
                  </div>
                  <div className="module-meta-item">
                    <Users size={18} />
                    <span>{module.studentsCount} учеников</span>
                  </div>
                  <div className="module-meta-item module-level">
                    <Award size={18} />
                    <span>{module.level}</span>
                  </div>
                </div>
                
                <div className="module-progress">
                  <ProgressIndicator value={progress} showValue={true} />
                  <div className="module-progress-text">
                    <span>{completedLessons} из {lessons.length} уроков завершено</span>
                  </div>
                </div>
              </AnimatedElement>
            </div>
            
            <div className="module-image">
              <AnimatedElement animation="fade-left">
                <img src={module.image} alt={module.title} />
              </AnimatedElement>
            </div>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="module-content">
        <AdaptiveContainer>
          <div className="module-lessons">
            <AnimatedElement animation="fade-up">
              <h2 className="module-section-title">Уроки модуля</h2>
              
              <div className="lessons-list">
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
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Module; 