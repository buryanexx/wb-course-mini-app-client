import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'react-feather';
import '../styles/Rating.css';

const Rating = ({ 
  value, 
  max = 5,
  size = 'medium',
  readOnly = false,
  onChange,
  showValue = false,
  precision = 1
}) => {
  const roundedValue = Math.round(value * precision) / precision;
  
  const handleClick = (newValue) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= max; i++) {
      const filled = i <= Math.floor(roundedValue);
      const halfFilled = !filled && i <= Math.ceil(roundedValue) && (i - roundedValue) < 1;
      
      stars.push(
        <div 
          key={i}
          className={`rating-star ${filled ? 'rating-star-filled' : ''} ${halfFilled ? 'rating-star-half' : ''}`}
          onClick={() => handleClick(i)}
        >
          <Star size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} />
        </div>
      );
    }
    
    return stars;
  };
  
  return (
    <div className={`rating rating-${size} ${readOnly ? 'rating-readonly' : ''}`}>
      <div className="rating-stars">
        {renderStars()}
      </div>
      
      {showValue && (
        <div className="rating-value">
          {roundedValue.toFixed(precision === 1 ? 0 : 1)}
        </div>
      )}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  showValue: PropTypes.bool,
  precision: PropTypes.number
};

export default Rating; 