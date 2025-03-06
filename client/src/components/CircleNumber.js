import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CircleNumber.css';

const CircleNumber = ({ number }) => {
  return (
    <div className="circle-number">
      {number}
    </div>
  );
};

CircleNumber.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default CircleNumber; 