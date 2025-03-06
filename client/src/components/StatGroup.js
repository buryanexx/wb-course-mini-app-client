import React from 'react';
import PropTypes from 'prop-types';
import Stat from './Stat';
import '../styles/StatGroup.css';

const StatGroup = ({ 
  stats, 
  columns = 3,
  variant = 'default',
  size = 'medium',
  gap = 'medium'
}) => {
  return (
    <div className={`stat-group stat-group-columns-${columns} stat-group-gap-${gap}`}>
      {stats.map((stat, index) => (
        <Stat
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType || 'neutral'}
          variant={stat.variant || variant}
          size={stat.size || size}
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
      change: PropTypes.string,
      changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
      variant: PropTypes.string,
      size: PropTypes.string
    })
  ).isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  variant: PropTypes.string,
  size: PropTypes.string,
  gap: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default StatGroup; 