import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import ModuleCard from '../components/ModuleCard';
import AnimatedElement from '../components/AnimatedElement';
import '../styles/Modules.css';
import { getModules } from '../utils/api';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, Award } from 'react-feather';
import Card from '../components/Card';
import Button from '../components/Button';
import StatGroup from '../components/StatGroup';

const Modules = ({ addToast }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const data = await getModules();
        setModules(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError('Не удалось загрузить модули. Пожалуйста, попробуйте позже.');
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить модули'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, [addToast]);
  
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || module.level === filterLevel;
    
    return matchesSearch && matchesLevel;
  });
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    setFilterLevel(e.target.value);
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  
  if (loading) {
    return (
      <div className="modules-page">
        <div className="modules-loading">
          <div className="loader"></div>
          <p>Загрузка модулей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modules-page">
        <div className="modules-error">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  // Расчет статистики
  const totalModules = modules.length;
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = modules.reduce((sum, module) => 
    sum + module.lessons.filter(lesson => lesson.completed).length, 0);
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const stats = [
    {
      title: 'Всего модулей',
      value: totalModules,
      icon: <Book size={20} />
    },
    {
      title: 'Всего уроков',
      value: totalLessons,
      icon: <Book size={20} />
    },
    {
      title: 'Пройдено уроков',
      value: completedLessons,
      icon: <Award size={20} />,
      change: `${completionRate}%`,
      changeType: 'positive'
    }
  ];

  return (
    <div className="modules-page">
      <div className="page-header">
        <h1 className="page-title">Обучающие модули</h1>
        <p className="page-description">
          Структурированные материалы для эффективного обучения работе с Wildberries
        </p>
      </div>
      
      <section className="modules-header">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h1 className="modules-title">Модули курса</h1>
            <p className="modules-subtitle">
              Изучите все модули курса и станьте экспертом в продажах на Wildberries
            </p>
            
            <div className="modules-progress">
              <div className="modules-progress-bar">
                <div 
                  className="modules-progress-fill" 
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <div className="modules-progress-text">
                <span>Общий прогресс: {completionRate}%</span>
                <span>{completedLessons} из {totalLessons} уроков</span>
              </div>
            </div>
          </AnimatedElement>
        </AdaptiveContainer>
      </section>
      
      <section className="modules-content">
        <AdaptiveContainer>
          <div className="modules-controls">
            <div className="modules-search">
              <Search size={18} className="modules-search-icon" />
              <input
                type="text"
                placeholder="Поиск модулей..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="modules-search-input"
              />
            </div>
            
            <div className="modules-filters">
              <div className="modules-filter">
                <Filter size={18} className="modules-filter-icon" />
                <select 
                  value={filterLevel} 
                  onChange={handleFilterChange}
                  className="modules-filter-select"
                >
                  <option value="all">Все уровни</option>
                  <option value="Начальный">Начальный</option>
                  <option value="Средний">Средний</option>
                  <option value="Продвинутый">Продвинутый</option>
                </select>
              </div>
              
              <button 
                className="modules-view-toggle" 
                onClick={toggleViewMode}
                aria-label={viewMode === 'grid' ? 'Список' : 'Сетка'}
              >
                {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
              </button>
            </div>
          </div>
          
          <div className="modules-stats">
            <StatGroup stats={stats} columns={3} />
          </div>
          
          {filteredModules.length === 0 ? (
            <div className="modules-empty">
              <p>Модули не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          ) : (
            <div className={`modules-grid modules-${viewMode}`}>
              {filteredModules.map((module, index) => (
                <AnimatedElement 
                  key={module.id} 
                  animation="fade-up"
                  delay={index * 0.1}
                >
                  <Card
                    title={`${index + 1}. ${module.title}`}
                    description={module.description}
                    icon={<Book size={24} />}
                    footer={
                      <div className="module-card-footer">
                        <div className="module-card-progress">
                          <div className="module-card-progress-bar">
                            <div 
                              className="module-card-progress-fill" 
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                          <span className="module-card-progress-text">
                            {module.completedLessons}/{module.totalLessons} уроков ({module.progress}%)
                          </span>
                        </div>
                        <Button 
                          variant="primary" 
                          as={Link} 
                          to={`/modules/${module.id}`}
                          icon={<ChevronRight size={16} />}
                          iconPosition="right"
                        >
                          Перейти к модулю
                        </Button>
                      </div>
                    }
                    className="module-card"
                  />
                </AnimatedElement>
              ))}
            </div>
          )}
        </AdaptiveContainer>
      </section>
    </div>
  );
};

export default Modules; 