import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, ArrowRight } from 'react-feather';
import '../styles/LessonCard.css';

const LessonCard = ({ lesson, moduleId, index }) => {
  const { id, title, description, duration, isCompleted } = lesson;
  
  return (
    <div className={`lesson-card ${isCompleted ? 'lesson-completed' : ''}`}>
      <div className="lesson-card-index">
        {isCompleted ? (
          <div className="lesson-completed-icon">
            <CheckCircle size={20} />
          </div>
        ) : (
          <span>{index}</span>
        )}
      </div>
      
      <div className="lesson-card-content">
        <h3 className="lesson-card-title">{title}</h3>
        <p className="lesson-card-description">{description}</p>
        
        <div className="lesson-card-meta">
          <div className="lesson-card-duration">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          
          {isCompleted && (
            <div className="lesson-card-status">
              Завершено
            </div>
          )}
        </div>
      </div>
      
      <Link to={`/modules/${moduleId}/lessons/${id}`} className="lesson-card-link">
        <ArrowRight size={20} />
      </Link>
    </div>
  );
};

LessonCard.propTypes = {
  lesson: PropTypes.object.isRequired,
  moduleId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default LessonCard; 