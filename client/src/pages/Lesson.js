import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, BookOpen } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import '../styles/Lesson.css';
import { getModule, getLesson, markLessonAsViewed } from '../utils/api';

const Lesson = ({ addToast }) => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Получаем данные модуля и урока
        const moduleData = await getModule(moduleId);
        const lessonData = await getLesson(moduleId, lessonId);
        
        setModule(moduleData);
        setLesson(lessonData);
        
        // Находим предыдущий и следующий уроки
        const lessonIndex = moduleData.lessons.findIndex(l => l.id === parseInt(lessonId));
        
        if (lessonIndex > 0) {
          setPrevLesson(moduleData.lessons[lessonIndex - 1]);
        } else {
          setPrevLesson(null);
        }
        
        if (lessonIndex < moduleData.lessons.length - 1) {
          setNextLesson(moduleData.lessons[lessonIndex + 1]);
        } else {
          setNextLesson(null);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError('Не удалось загрузить урок. Пожалуйста, попробуйте позже.');
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить урок'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [moduleId, lessonId, addToast]);
  
  const handleCompleteLesson = async () => {
    try {
      setIsCompleting(true);
      
      await markLessonAsViewed(moduleId, lessonId);
      
      // Обновляем состояние урока
      setLesson(prev => ({
        ...prev,
        isCompleted: true
      }));
      
      addToast({
        variant: 'success',
        title: 'Урок завершен',
        message: 'Прогресс успешно сохранен'
      });
      
      // Если есть следующий урок, переходим к нему
      if (nextLesson) {
        navigate(`/modules/${moduleId}/lessons/${nextLesson.id}`);
      }
    } catch (err) {
      console.error('Error completing lesson:', err);
      addToast({
        variant: 'error',
        title: 'Ошибка',
        message: 'Не удалось отметить урок как завершенный'
      });
    } finally {
      setIsCompleting(false);
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
  
  if (error || !lesson || !module) {
    return (
      <div className="lesson-error">
        <h2>Ошибка</h2>
        <p>{error || 'Урок не найден'}</p>
        <Link to={`/modules/${moduleId}`} className="lesson-back-link">
          Вернуться к модулю
        </Link>
      </div>
    );
  }
  
  return (
    <div className="lesson-page">
      <section className="lesson-header">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-down">
            <div className="lesson-navigation">
              <Link to={`/modules/${moduleId}`} className="lesson-back-link">
                <ArrowLeft size={20} />
                <span>Назад к модулю</span>
              </Link>
              
              <div className="lesson-meta">
                <div className="lesson-meta-item">
                  <Clock size={16} />
                  <span>{lesson.duration}</span>
                </div>
                {lesson.isCompleted && (
                  <div className="lesson-meta-item lesson-completed-badge">
                    <Check size={16} />
                    <span>Завершено</span>
                  </div>
                )}
              </div>
            </div>
            
            <h1 className="lesson-title">{lesson.title}</h1>
            <p className="lesson-description">{lesson.description}</p>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="lesson-content">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div 
              className="lesson-content-html"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="lesson-actions">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <div className="lesson-navigation-buttons">
              {prevLesson && (
                <Link 
                  to={`/modules/${moduleId}/lessons/${prevLesson.id}`}
                  className="lesson-nav-button lesson-prev-button"
                >
                  <ArrowLeft size={20} />
                  <span>Предыдущий урок</span>
                </Link>
              )}
              
              <Button
                variant={lesson.isCompleted ? 'success' : 'primary'}
                size="large"
                icon={lesson.isCompleted ? <Check size={20} /> : <ArrowRight size={20} />}
                iconPosition="right"
                onClick={handleCompleteLesson}
                disabled={isCompleting || lesson.isCompleted}
              >
                {lesson.isCompleted ? 'Урок завершен' : 'Завершить урок'}
              </Button>
              
              {nextLesson && (
                <Link 
                  to={`/modules/${moduleId}/lessons/${nextLesson.id}`}
                  className="lesson-nav-button lesson-next-button"
                >
                  <span>Следующий урок</span>
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
            
            <div className="lesson-module-info">
              <h3>Модуль: {module.title}</h3>
              <Link to={`/modules/${moduleId}`} className="lesson-module-link">
                <BookOpen size={16} />
                <span>Все уроки модуля</span>
              </Link>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Lesson; 