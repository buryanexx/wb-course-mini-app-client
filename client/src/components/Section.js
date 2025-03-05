import React from 'react';
import '../styles/Section.css';

const Section = ({ title, content }) => {
  return (
    <div className="module-section">
      <h3 className="section-title">{title}</h3>
      <div className="section-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Section;