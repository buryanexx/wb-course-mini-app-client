import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen, Award } from 'react-feather';
import PriceTag from './PriceTag';
import PremiumButton from './PremiumButton';
import '../styles/ModuleCard.css';

const ModuleCard = ({ 
  id,
  title, 
  description, 
  image, 
  lessonsCount, 
  duration, 
  level,
  price,
  oldPrice,
  discount,
  isCompleted,
  progress
}) => {
  return (
    <div className={`module-card ${isCompleted ? 'module-card-completed' : ''}`}>
      <div className="module-card-image-container">
        <img src={image} alt={title} className="module-card-image" />
        {level && (
          <div className={`module-card-level module-card-level-${level.toLowerCase()}`}>
            {level}
          </div>
        )}
        {isCompleted && (
          <div className="module-card-completed-badge">
            <Award size={16} />
            Завершено
          </div>
        )}
      </div>
      
      <div className="module-card-content">
        <h3 className="module-card-title">{title}</h3>
        <p className="module-card-description">{description}</p>
        
        <div className="module-card-meta">
          {lessonsCount && (
            <div className="module-card-meta-item">
              <BookOpen size={16} />
              <span>{lessonsCount} уроков</span>
            </div>
          )}
          
          {duration && (
            <div className="module-card-meta-item">
              <Clock size={16} />
              <span>{duration}</span>
            </div>
          )}
        </div>
        
        {progress !== undefined && (
          <div className="module-card-progress-container">
            <div className="module-card-progress-bar">
              <div 
                className="module-card-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="module-card-progress-text">
              {progress}% завершено
            </div>
          </div>
        )}
        
        <div className="module-card-footer">
          {price !== undefined && (
            <PriceTag 
              price={price} 
              oldPrice={oldPrice} 
              discount={discount}
              variant="primary"
            />
          )}
          
          <PremiumButton 
            to={`/modules/${id}`} 
            variant="outlined"
            size="small"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Подробнее
          </PremiumButton>
        </div>
      </div>
    </div>
  );
};

ModuleCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  lessonsCount: PropTypes.number,
  duration: PropTypes.string,
  level: PropTypes.string,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  discount: PropTypes.number,
  isCompleted: PropTypes.bool,
  progress: PropTypes.number
};

export default ModuleCard;