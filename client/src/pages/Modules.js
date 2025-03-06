import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import ModuleCard from '../components/ModuleCard';
import AnimatedElement from '../components/AnimatedElement';
import '../styles/Modules.css';
import { getModules } from '../utils/api';

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  
  // Имитация прогресса обучения
  const completedModules = 2;
  const totalModules = 8;
  
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const data = await getModules();
        setModules(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить модули. Пожалуйста, попробуйте позже.');
        console.error('Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, []);
  
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
  
  return (
    <div className="modules-page">
      <section className="modules-hero">
        <AdaptiveContainer>
          <AnimatedElement animation="fade-up">
            <h1 className="modules-title">Модули обучения</h1>
            <p className="modules-subtitle">
              Выберите интересующий вас модуль и начните обучение прямо сейчас
            </p>
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
          
          {loading ? (
            <div className="modules-loading">
              <div className="loader"></div>
              <p>Загрузка модулей...</p>
            </div>
          ) : error ? (
            <div className="modules-error">
              <p>{error}</p>
            </div>
          ) : filteredModules.length === 0 ? (
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
                  <ModuleCard {...module} />
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