import React from 'react';
import PropTypes from 'prop-types';
import '../styles/IconList.css';

const IconListItem = ({ 
  icon, 
  title, 
  description,
  variant = 'default',
  onClick
}) => {
  return (
    <div 
      className={`icon-list-item icon-list-item-${variant} ${onClick ? 'icon-list-item-clickable' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <div className="icon-list-icon">
          {icon}
        </div>
      )}
      
      <div className="icon-list-content">
        {title && <div className="icon-list-title">{title}</div>}
        {description && <div className="icon-list-description">{description}</div>}
      </div>
    </div>
  );
};

const IconList = ({ 
  items, 
  variant = 'default',
  gap = 'medium',
  dividers = false
}) => {
  return (
    <div className={`icon-list icon-list-gap-${gap} ${dividers ? 'icon-list-dividers' : ''}`}>
      {items.map((item, index) => (
        <IconListItem
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          variant={item.variant || variant}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

IconList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.node,
      description: PropTypes.node,
      variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
      onClick: PropTypes.func
    })
  ).isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  gap: PropTypes.oneOf(['small', 'medium', 'large']),
  dividers: PropTypes.bool
};

export default IconList; 