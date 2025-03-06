import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.css';

const ProgressBar = ({ 
  value, 
  max = 100,
  height = 8,
  variant = 'default',
  showValue = false,
  valuePosition = 'right',
  label,
  animated = false,
  striped = false
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  return (
    <div className="progress-container">
      {label && (
        <div className="progress-header">
          <div className="progress-label">{label}</div>
          {showValue && valuePosition === 'top' && (
            <div className="progress-value">{value}/{max}</div>
          )}
        </div>
      )}
      
      <div 
        className="progress-bar-container"
        style={{ height: `${height}px` }}
      >
        <div 
          className={`progress-bar progress-bar-${variant} ${animated ? 'progress-bar-animated' : ''} ${striped ? 'progress-bar-striped' : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {showValue && valuePosition === 'bottom' && (
        <div className="progress-footer">
          <div className="progress-value">{value}/{max}</div>
        </div>
      )}
      
      {showValue && valuePosition === 'right' && !label && (
        <div className="progress-value progress-value-right">{value}/{max}</div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  height: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  showValue: PropTypes.bool,
  valuePosition: PropTypes.oneOf(['top', 'right', 'bottom']),
  label: PropTypes.string,
  animated: PropTypes.bool,
  striped: PropTypes.bool
};

export default ProgressBar; 