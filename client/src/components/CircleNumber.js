import React from 'react';
import '../styles/CircleNumber.css';

const CircleNumber = ({ number }) => {
  return (
    <div className="circle-number">
      {number}
    </div>
  );
};

export default CircleNumber; 