import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Play, Check, Lock, Clock } from 'react-feather';
import '../styles/LessonCard.css';

const LessonCard = ({ 
  id, 
  moduleId,
  title, 
  duration, 
  isCompleted, 
  isLocked,
  progress
}) => {
  return (
    <div className={`lesson-card ${isCompleted ? 'lesson-card-completed' : ''} ${isLocked ? 'lesson-card-locked' : ''}`}>
      <div className="lesson-card-status">
        {isCompleted ? (
          <div className="lesson-status-icon lesson-status-completed">
            <Check size={16} />
          </div>
        ) : isLocked ? (
          <div className="lesson-status-icon lesson-status-locked">
            <Lock size={16} />
          </div>
        ) : (
          <div className="lesson-status-icon lesson-status-available">
            <Play size={16} />
          </div>
        )}
      </div>
      
      <div className="lesson-card-content">
        <h3 className="lesson-card-title">{title}</h3>
        
        {duration && (
          <div className="lesson-card-duration">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        )}
        
        {progress !== undefined && !isCompleted && !isLocked && (
          <div className="lesson-card-progress-container">
            <div className="lesson-card-progress-bar">
              <div 
                className="lesson-card-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="lesson-card-progress-text">
              {progress}% завершено
            </div>
          </div>
        )}
      </div>
      
      <div className="lesson-card-action">
        {isLocked ? (
          <span className="lesson-card-locked-text">Недоступно</span>
        ) : (
          <Link 
            to={`/modules/${moduleId}/lessons/${id}`} 
            className="lesson-card-link"
          >
            {isCompleted ? 'Повторить' : 'Начать'}
          </Link>
        )}
      </div>
    </div>
  );
};

LessonCard.propTypes = {
  id: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string,
  isCompleted: PropTypes.bool,
  isLocked: PropTypes.bool,
  progress: PropTypes.number
};

export default LessonCard; 