import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({
  title,
  description,
  icon,
  footer,
  variant = 'default',
  size = 'medium',
  className = '',
  onClick,
  ...props
}) => {
  const cardClasses = `
    card 
    card-${variant} 
    card-${size} 
    ${onClick ? 'card-clickable' : ''} 
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {icon && <div className="card-icon">{icon}</div>}
      
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
      </div>
      
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card; 