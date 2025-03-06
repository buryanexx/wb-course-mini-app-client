import React from 'react';
import '../styles/Loader.css';

const Loader = ({ size = 'medium', color = 'primary', fullPage = false }) => {
  const loaderClasses = `loader loader-${size} loader-${color} ${fullPage ? 'loader-fullpage' : ''}`;
  
  return (
    <div className={loaderClasses}>
      <div className="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {fullPage && <p className="loader-text">Загрузка...</p>}
    </div>
  );
};

export default Loader; 