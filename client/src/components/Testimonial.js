import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'react-feather';
import '../styles/Testimonial.css';

const Testimonial = ({ 
  name, 
  position, 
  text, 
  rating = 5, 
  photoUrl,
  variant = 'default'
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={`star ${i < rating ? 'star-filled' : 'star-empty'}`} 
        />
      );
    }
    return stars;
  };
  
  return (
    <div className={`testimonial testimonial-${variant}`}>
      <div className="testimonial-content">
        <div className="testimonial-text">{text}</div>
        <div className="testimonial-rating">
          {renderStars()}
        </div>
      </div>
      
      <div className="testimonial-author">
        {photoUrl && (
          <div 
            className="testimonial-photo" 
            style={{ backgroundImage: `url(${photoUrl})` }}
          ></div>
        )}
        <div className="testimonial-info">
          <div className="testimonial-name">{name}</div>
          {position && <div className="testimonial-position">{position}</div>}
        </div>
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number,
  photoUrl: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outlined'])
};

export default Testimonial; 