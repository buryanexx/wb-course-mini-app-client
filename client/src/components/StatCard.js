import React from 'react';
import PropTypes from 'prop-types';
import AnimatedElement from './AnimatedElement';
import '../styles/StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description,
  variant = 'default',
  animation = 'fade-up'
}) => {
  return (
    <AnimatedElement animation={animation}>
      <div className={`stat-card stat-card-${variant}`}>
        {icon && (
          <div className="stat-card-icon">
            {icon}
          </div>
        )}
        
        <div className="stat-card-content">
          <h3 className="stat-card-value">{value}</h3>
          <div className="stat-card-title">{title}</div>
          
          {description && (
            <div className="stat-card-description">
              {description}
            </div>
          )}
        </div>
      </div>
    </AnimatedElement>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outlined', 'gradient']),
  animation: PropTypes.string
};

export default StatCard; 