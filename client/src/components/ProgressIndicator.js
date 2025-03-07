import React from 'react';
import '../styles/ProgressIndicator.css';

const ProgressIndicator = ({ value, size = 'medium', showValue = false }) => {
  // Ограничиваем значение от 0 до 100
  const progress = Math.min(Math.max(0, value), 100);
  
  return (
    <div className={`progress-indicator progress-${size}`}>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {showValue && (
        <div className="progress-value">{progress}%</div>
      )}
    </div>
  );
};

export default ProgressIndicator; 