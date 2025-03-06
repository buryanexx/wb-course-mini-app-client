import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.css';

const ProgressBar = ({
  value = 0,
  max = 100,
  height = 8,
  variant = 'primary',
  showValue = false,
  valuePosition = 'right',
  label,
  animated = false,
  striped = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const progressBarClasses = `
    progress-bar-container 
    ${className}
  `;
  
  const barClasses = `
    progress-bar 
    progress-bar-${variant} 
    ${animated ? 'progress-bar-animated' : ''} 
    ${striped ? 'progress-bar-striped' : ''}
  `;
  
  return (
    <div className={progressBarClasses} {...props}>
      {label && <div className="progress-bar-label">{label}</div>}
      
      <div className="progress-bar-wrapper" style={{ height: `${height}px` }}>
        <div 
          className={barClasses} 
          style={{ width: `${percentage}%` }} 
          role="progressbar" 
          aria-valuenow={value} 
          aria-valuemin="0" 
          aria-valuemax={max}
        ></div>
      </div>
      
      {showValue && (
        <div className={`progress-bar-value progress-bar-value-${valuePosition}`}>
          {value}/{max}
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  height: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  showValue: PropTypes.bool,
  valuePosition: PropTypes.oneOf(['top', 'right', 'bottom']),
  label: PropTypes.node,
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  className: PropTypes.string
};

export default ProgressBar; 