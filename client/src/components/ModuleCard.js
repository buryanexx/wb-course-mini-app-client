import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'react-feather';
import ProgressIndicator from './ProgressIndicator';
import '../styles/ModuleCard.css';

const ModuleCard = ({ module, variant = 'default' }) => {
  const { id, title, description, image, level, duration, studentsCount, progress } = module;
  
  // Определение класса для уровня сложности
  const getLevelClass = () => {
    switch (level.toLowerCase()) {
      case 'начальный':
        return 'level-beginner';
      case 'средний':
        return 'level-intermediate';
      case 'продвинутый':
        return 'level-advanced';
      default:
        return '';
    }
  };
  
  // Определяем уровень сложности для отображения метки
  const getLevelBadge = () => {
    if (id === 1) return "Начальный";
    if (id === 2) return "Средний";
    if (id === 3) return "Продвинутый";
    return null;
  };
  
  const levelBadge = getLevelBadge();
  
  return (
    <Link to={`/modules/${id}`} className={`module-card ${variant}`}>
      <div 
        className="module-card-image" 
        style={{ backgroundImage: `url(${image})` }}
      >
        {levelBadge && (
          <div className="module-level-badge">{levelBadge}</div>
        )}
      </div>
      <div className="module-card-content">
        <h3 className="module-card-title">{title}</h3>
        <p className="module-card-description">{description}</p>
        
        <div className="module-card-meta">
          <div className="module-card-meta-item">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <div className="module-card-meta-item">
            <Users size={16} />
            <span>{studentsCount} учеников</span>
          </div>
        </div>
        
        {progress > 0 && (
          <div className="module-card-progress">
            <ProgressIndicator value={progress} />
            <span className="module-card-progress-text">{progress}% завершено</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ModuleCard;