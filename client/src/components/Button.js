import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({
  children,
  variant = 'default',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  as = 'button',
  className = '',
  onClick,
  ...props
}) => {
  const Component = as;
  
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size} 
    ${fullWidth ? 'button-full-width' : ''} 
    ${icon && !children ? 'button-icon-only' : ''} 
    ${className}
  `;
  
  return (
    <Component 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="button-icon button-icon-left">{icon}</span>
      )}
      
      {children && <span className="button-text">{children}</span>}
      
      {icon && iconPosition === 'right' && (
        <span className="button-icon button-icon-right">{icon}</span>
      )}
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button; 