import React from 'react';
import '../styles/AdaptiveContainer.css';

const AdaptiveContainer = ({ children, className = '', maxWidth = 'default', ...props }) => {
  const containerClasses = [
    'adaptive-container',
    `max-width-${maxWidth}`,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

export default AdaptiveContainer; 