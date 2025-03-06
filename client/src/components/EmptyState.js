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
  actionVariant = 'primary',
  className = '',
  ...props
}) => {
  const emptyStateClasses = `
    empty-state 
    ${className}
  `;

  return (
    <div className={emptyStateClasses} {...props}>
      {icon && <div className="empty-state-icon">{icon}</div>}
      
      <div className="empty-state-content">
        {title && <h3 className="empty-state-title">{title}</h3>}
        {description && <p className="empty-state-description">{description}</p>}
      </div>
      
      {action && actionText && (
        <div className="empty-state-action">
          <Button 
            variant={actionVariant} 
            onClick={action}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.node,
  action: PropTypes.func,
  actionText: PropTypes.string,
  actionVariant: PropTypes.string,
  className: PropTypes.string
};

export default EmptyState; 