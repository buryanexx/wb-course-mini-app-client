import React from 'react';

const AdaptiveContainer = ({ children, className = '' }) => {
  return (
    <div className={`adaptive-container ${className}`}>
      {children}
    </div>
  );
};

export default AdaptiveContainer; 