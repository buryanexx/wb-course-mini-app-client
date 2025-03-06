import React from 'react';
import PropTypes from 'prop-types';
import { User } from 'react-feather';
import '../styles/Avatar.css';

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium',
  variant = 'circle',
  status,
  initials,
  icon,
  onClick
}) => {
  const getInitials = () => {
    if (initials) return initials;
    if (!alt) return '';
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div 
      className={`avatar avatar-${size} avatar-${variant} ${onClick ? 'avatar-clickable' : ''}`}
      onClick={onClick}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt || 'Avatar'} 
          className="avatar-image"
        />
      ) : icon ? (
        <div className="avatar-icon">
          {icon}
        </div>
      ) : (
        <div className="avatar-fallback">
          {getInitials() || <User size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} />}
        </div>
      )}
      
      {status && (
        <span className={`avatar-status avatar-status-${status}`}></span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['circle', 'rounded', 'square']),
  status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
  initials: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func
};

export default Avatar; 