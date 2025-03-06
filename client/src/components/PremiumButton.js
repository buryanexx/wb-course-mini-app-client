import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/PremiumButton.css';

const PremiumButton = ({
  children,
  onClick,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClasses = `
    premium-button 
    premium-button-${variant} 
    premium-button-${size} 
    ${fullWidth ? 'premium-button-full-width' : ''} 
    ${disabled ? 'premium-button-disabled' : ''}
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="premium-button-icon premium-button-icon-left">{icon}</span>
      )}
      <span className="premium-button-text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="premium-button-icon premium-button-icon-right">{icon}</span>
      )}
      <span className="premium-button-shine"></span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

PremiumButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined', 'text', 'gradient']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default PremiumButton; 