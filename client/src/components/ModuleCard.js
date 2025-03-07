import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'react-feather';
import ProgressIndicator from './ProgressIndicator';
import '../styles/ModuleCard.css';

const ModuleCard = ({ module }) => {
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
  
  return (
    <div className="module-card">
      <div className="module-card-image-container">
        <img 
          src={image} 
          alt={title} 
          className="module-card-image" 
          loading="lazy"
        />
        <div className={`module-card-level ${getLevelClass()}`}>
          {level}
        </div>
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
        
        <Link to={`/modules/${id}`} className="module-card-link">
          <BookOpen size={16} />
          <span>Перейти к модулю</span>
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;