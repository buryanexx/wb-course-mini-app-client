import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PremiumCard.css';

const PremiumCard = ({ 
  children, 
  title, 
  icon, 
  variant = 'default', 
  onClick,
  className = '',
  badge
}) => {
  return (
    <div 
      className={`premium-card premium-card-${variant} ${className}`}
      onClick={onClick}
    >
      {badge && <span className="premium-card-badge">{badge}</span>}
      
      {(title || icon) && (
        <div className="premium-card-header">
          {icon && <div className="premium-card-icon">{icon}</div>}
          {title && <h3 className="premium-card-title">{title}</h3>}
        </div>
      )}
      
      <div className="premium-card-content">
        {children}
      </div>
      
      <div className="premium-card-shine"></div>
    </div>
  );
};

PremiumCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outlined']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  badge: PropTypes.string
};

export default PremiumCard; 