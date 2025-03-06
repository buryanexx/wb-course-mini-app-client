import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'react-feather';
import '../styles/Stat.css';

const Stat = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  const statClasses = `
    stat 
    stat-${variant} 
    stat-${size} 
    ${className}
  `;

  const renderChangeIcon = () => {
    if (changeType === 'positive') {
      return <TrendingUp size={16} />;
    } else if (changeType === 'negative') {
      return <TrendingDown size={16} />;
    }
    return null;
  };

  const changeClasses = `stat-change stat-change-${changeType}`;

  return (
    <div className={statClasses} {...props}>
      {icon && <div className="stat-icon">{icon}</div>}
      
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        
        {change && (
          <div className={changeClasses}>
            {renderChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default Stat; 