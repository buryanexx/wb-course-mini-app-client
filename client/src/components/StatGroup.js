import React from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';
import '../styles/StatGroup.css';

const StatGroup = ({
  stats = [],
  columns = 2,
  variant = 'default',
  size = 'medium',
  gap = 'medium',
  className = '',
  ...props
}) => {
  const statGroupClasses = `
    stat-group 
    stat-group-columns-${columns} 
    stat-group-gap-${gap}
    ${className}
  `;

  return (
    <div className={statGroupClasses} {...props}>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
          variant={stat.variant || variant}
          size={size}
        />
      ))}
    </div>
  );
};

StatGroup.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.node,
      change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
      variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'])
    })
  ),
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  gap: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default StatGroup; 