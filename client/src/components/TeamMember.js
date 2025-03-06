import React from 'react';
import PropTypes from 'prop-types';
import { GitHub, Linkedin, Twitter, Globe } from 'react-feather';
import AnimatedElement from './AnimatedElement';
import '../styles/TeamMember.css';

const TeamMember = ({ 
  name, 
  position, 
  photo, 
  bio,
  social = {},
  variant = 'default',
  animation = 'fade-up'
}) => {
  const getSocialIcon = (type) => {
    switch (type) {
      case 'github':
        return <GitHub size={16} />;
      case 'linkedin':
        return <Linkedin size={16} />;
      case 'twitter':
        return <Twitter size={16} />;
      case 'website':
        return <Globe size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <AnimatedElement animation={animation}>
      <div className={`team-member team-member-${variant}`}>
        <div className="team-member-photo-container">
          <img 
            src={photo} 
            alt={name} 
            className="team-member-photo" 
          />
        </div>
        
        <div className="team-member-content">
          <h3 className="team-member-name">{name}</h3>
          {position && <div className="team-member-position">{position}</div>}
          
          {bio && <p className="team-member-bio">{bio}</p>}
          
          {Object.keys(social).length > 0 && (
            <div className="team-member-social">
              {Object.entries(social).map(([type, url]) => (
                <a 
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-member-social-link"
                  aria-label={`${name} on ${type}`}
                >
                  {getSocialIcon(type)}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedElement>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  photo: PropTypes.string.isRequired,
  bio: PropTypes.string,
  social: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outlined']),
  animation: PropTypes.string
};

export default TeamMember; 