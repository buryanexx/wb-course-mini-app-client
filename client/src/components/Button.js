import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  disabled = false, 
  onClick, 
  type = 'button',
  icon = null,
  iconPosition = 'left'
}) => {
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size} 
    ${fullWidth ? 'button-full-width' : ''} 
    ${disabled ? 'button-disabled' : ''}
    ${icon ? 'button-with-icon' : ''}
    ${icon && iconPosition === 'right' ? 'button-icon-right' : ''}
  `;
  
  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
    >
      {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
      {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right'])
};

export default Button; 