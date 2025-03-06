import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import '../styles/EmptyState.css';

const EmptyState = ({ 
  title, 
  description,
  icon,
  action,
  actionText,
  variant = 'default',
  size = 'medium'
}) => {
  return (
    <div className={`empty-state empty-state-${variant} empty-state-${size}`}>
      {icon && (
        <div className="empty-state-icon">
          {icon}
        </div>
      )}
      
      <div className="empty-state-content">
        {title && <h3 className="empty-state-title">{title}</h3>}
        {description && <p className="empty-state-description">{description}</p>}
      </div>
      
      {action && actionText && (
        <div className="empty-state-action">
          <Button 
            variant="primary" 
            onClick={action}
            size={size === 'small' ? 'small' : 'medium'}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.func,
  actionText: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default EmptyState; 