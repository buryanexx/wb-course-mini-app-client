import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CircleNumber.css';

const CircleNumber = ({ number, size = 'medium', variant = 'primary' }) => {
  return (
    <div className={`circle-number circle-number-${size} circle-number-${variant}`}>
      {number}
    </div>
  );
};

CircleNumber.propTypes = {
  number: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'gradient'])
};

export default CircleNumber; 