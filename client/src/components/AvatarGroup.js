import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import '../styles/AvatarGroup.css';

const AvatarGroup = ({ 
  users, 
  max = 5,
  size = 'medium',
  variant = 'circle',
  overlap = 'medium',
  onClick
}) => {
  const displayUsers = max ? users.slice(0, max) : users;
  const remainingCount = max && users.length > max ? users.length - max : 0;
  
  return (
    <div className={`avatar-group avatar-group-${overlap}`}>
      {displayUsers.map((user, index) => (
        <Avatar
          key={index}
          src={user.src}
          alt={user.alt || user.name}
          initials={user.initials}
          icon={user.icon}
          status={user.status}
          size={size}
          variant={variant}
          onClick={onClick ? () => onClick(user, index) : undefined}
        />
      ))}
      
      {remainingCount > 0 && (
        <div className={`avatar-more avatar-${size} avatar-${variant}`}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

AvatarGroup.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      name: PropTypes.string,
      initials: PropTypes.string,
      icon: PropTypes.node,
      status: PropTypes.string
    })
  ).isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['circle', 'rounded', 'square']),
  overlap: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func
};

export default AvatarGroup; 