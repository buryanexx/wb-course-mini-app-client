import React from 'react';
import '../styles/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'button',
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? 'button-full-width' : '',
    disabled ? 'button-disabled' : '',
    icon ? 'button-with-icon' : '',
    icon && iconPosition === 'right' ? 'button-icon-right' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="button-icon">{icon}</span>
      )}
      
      <span className="button-text">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="button-icon">{icon}</span>
      )}
    </button>
  );
};

export default Button; 