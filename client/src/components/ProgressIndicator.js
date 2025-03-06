import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressIndicator.css';

const ProgressIndicator = ({ 
  progress, 
  height = 8, 
  variant = 'default',
  showPercentage = false,
  animated = true
}) => {
  return (
    <div className={`progress-indicator progress-indicator-${variant}`}>
      <div 
        className={`progress-bar ${animated ? 'progress-bar-animated' : ''}`}
        style={{ 
          height: `${height}px`,
          width: `${progress}%` 
        }}
      ></div>
      
      {showPercentage && (
        <div className="progress-percentage">
          {progress}%
        </div>
      )}
    </div>
  );
};

ProgressIndicator.propTypes = {
  progress: PropTypes.number.isRequired,
  height: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  showPercentage: PropTypes.bool,
  animated: PropTypes.bool
};

export default ProgressIndicator; 