import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PremiumFeature.css';

const PremiumFeature = ({ 
  icon, 
  title, 
  description, 
  variant = 'default',
  onClick
}) => {
  return (
    <div 
      className={`premium-feature premium-feature-${variant}`}
      onClick={onClick}
    >
      {icon && <div className="premium-feature-icon">{icon}</div>}
      <div className="premium-feature-content">
        {title && <h3 className="premium-feature-title">{title}</h3>}
        {description && <p className="premium-feature-description">{description}</p>}
      </div>
    </div>
  );
};

PremiumFeature.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outlined']),
  onClick: PropTypes.func
};

export default PremiumFeature; 