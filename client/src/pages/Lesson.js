import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, BookOpen } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import PremiumButton from '../components/PremiumButton';
import AnimatedElement from '../components/AnimatedElement';
import ProgressIndicator from '../components/ProgressIndicator';
import '../styles/Lesson.css';
import { getLesson, getModule, getLessons, markLessonAsViewed } from '../utils/api';
import Button from '../components/Button';

const Lesson = ({ showToast }) => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [module, setModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completing, setCompleting] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [lessonData, moduleData, lessonsData] = await Promise.all([
          getLesson(moduleId, lessonId),
          getModule(moduleId),
          getLessons(moduleId)
        ]);
        
        setLesson(lessonData);
        setModule(moduleData);
        setLessons(lessonsData);
        
        // Находим индекс текущего урока
        const index = lessonsData.findIndex(l => l.id === lessonId);
        setCurrentLessonIndex(index !== -1 ? index : 0);
        
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить урок. Пожалуйста, попробуйте позже.');
        console.error('Error fetching lesson data:', err);
        showToast && showToast('Ошибка при загрузке урока', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [moduleId, lessonId, showToast]);
  
  const handleCompleteLesson = async () => {
    try {
      setCompleting(true);
      await markLessonAsViewed(moduleId, lessonId);
      showToast && showToast('Урок отмечен как просмотренный', 'success');
      
      // Обновляем данные урока
      const updatedLesson = await getLesson(moduleId, lessonId);
      setLesson(updatedLesson);
      
      // Обновляем состояние урока
      setLesson(prev => ({
        ...prev,
        isCompleted: true
      }));
      
      // Обновляем состояние в списке уроков
      setLessons(prev => 
        prev.map(l => 
          l.id === lessonId 
            ? { ...l, isCompleted: true } 
            : l
        )
      );
      
      // Если есть следующий урок, переходим к нему
      if (currentLessonIndex < lessons.length - 1) {
        const nextLesson = lessons[currentLessonIndex + 1];
        setTimeout(() => {
          navigate(`/modules/${moduleId}/lessons/${nextLesson.id}`);
        }, 1500);
      }
    } catch (err) {
      console.error('Error marking lesson as viewed:', err);
      showToast && showToast('Ошибка при отметке урока', 'error');
    } finally {
      setCompleting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="lesson-loading">
        <div className="loader"></div>
        <p>Загрузка урока...</p>
      </div>
    );
  }
  
  if (error || !lesson) {
    return (
      <div className="lesson-error">
        <h2>Ошибка</h2>
        <p>{error || 'Урок не найден'}</p>
        <Button 
          variant="primary" 
          as={Link} 
          to={`/modules/${moduleId}`}
          icon={<ArrowLeft size={16} />}
        >
          Вернуться к модулю
        </Button>
      </div>
    );
  }
  
  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;
  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const progress = Math.round((completedLessons / lessons.length) * 100) || 0;
  
  return (
    <div className="lesson-page">
      <section className="lesson-header">
        <AdaptiveContainer>
          <div className="lesson-navigation">
            <Link to={`/modules/${moduleId}`} className="lesson-back-button">
              <ArrowLeft size={16} />
              <span>Назад к модулю</span>
            </Link>
            
            <div className="lesson-progress">
              <div className="lesson-progress-text">
                Урок {currentLessonIndex + 1} из {lessons.length}
              </div>
              <ProgressIndicator progress={progress} />
            </div>
          </div>
        </AdaptiveContainer>
      </section>
      
      <section className="lesson-content">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="lesson-meta">
              <h1 className="lesson-title">{lesson.title}</h1>
              
              {lesson.duration && (
                <div className="lesson-duration">
                  <Clock size={16} />
                  <span>{lesson.duration}</span>
                </div>
              )}
            </div>
            
            <div className="lesson-body">
              <div className="lesson-main">
                {lesson.content && (
                  <div className="lesson-text" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                )}
                
                <div className="lesson-actions">
                  {!lesson.isCompleted ? (
                    <Button 
                      variant="primary" 
                      onClick={handleCompleteLesson}
                      icon={<Check size={16} />}
                      disabled={completing}
                    >
                      {completing ? 'Отмечаем...' : 'Отметить просмотренным'}
                    </Button>
                  ) : (
                    <div className="lesson-completed-message">
                      <Check size={18} />
                      <span>Урок завершен</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lesson-sidebar">
                <div className="lesson-navigation-sidebar">
                  <h3 className="lesson-sidebar-title">Навигация по урокам</h3>
                  
                  <div className="lesson-navigation-links">
                    {prevLesson && (
                      <Link 
                        to={`/modules/${moduleId}/lessons/${prevLesson.id}`}
                        className="lesson-navigation-link lesson-prev-link"
                      >
                        <ArrowLeft size={16} />
                        <div className="lesson-navigation-link-content">
                          <span className="lesson-navigation-link-label">Предыдущий урок</span>
                          <span className="lesson-navigation-link-title">{prevLesson.title}</span>
                        </div>
                      </Link>
                    )}
                    
                    {nextLesson && (
                      <Link 
                        to={`/modules/${moduleId}/lessons/${nextLesson.id}`}
                        className="lesson-navigation-link lesson-next-link"
                      >
                        <div className="lesson-navigation-link-content">
                          <span className="lesson-navigation-link-label">Следующий урок</span>
                          <span className="lesson-navigation-link-title">{nextLesson.title}</span>
                        </div>
                        <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
                
                {module && (
                  <div className="lesson-module-info">
                    <h3 className="lesson-sidebar-title">О модуле</h3>
                    <div className="lesson-module-card">
                      <h4 className="lesson-module-title">{module.title}</h4>
                      <p className="lesson-module-description">{module.description}</p>
                      <Link to={`/modules/${moduleId}`} className="lesson-module-link">
                        <BookOpen size={16} />
                        <span>Все уроки модуля</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Lesson; 