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
  size = 'medium'
}) => {
  const renderChangeIcon = () => {
    if (changeType === 'positive') {
      return <TrendingUp size={16} />;
    } else if (changeType === 'negative') {
      return <TrendingDown size={16} />;
    }
    return null;
  };
  
  return (
    <div className={`stat stat-${variant} stat-${size}`}>
      {icon && (
        <div className="stat-icon">
          {icon}
        </div>
      )}
      
      <div className="stat-content">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        
        {change && (
          <div className={`stat-change stat-change-${changeType}`}>
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
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Stat; 