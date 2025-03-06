import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tag.css';

const Tag = ({ 
  label, 
  variant = 'default',
  size = 'medium',
  icon,
  onClick,
  count,
  removable = false,
  onRemove
}) => {
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };
  
  return (
    <div 
      className={`tag tag-${variant} tag-${size} ${onClick ? 'tag-clickable' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <span className="tag-icon">
          {icon}
        </span>
      )}
      
      <span className="tag-label">{label}</span>
      
      {count !== undefined && (
        <span className="tag-count">{count}</span>
      )}
      
      {removable && (
        <button 
          className="tag-remove" 
          onClick={handleRemove}
          aria-label="Удалить тег"
        >
          &times;
        </button>
      )}
    </div>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  onClick: PropTypes.func,
  count: PropTypes.number,
  removable: PropTypes.bool,
  onRemove: PropTypes.func
};

export default Tag; 