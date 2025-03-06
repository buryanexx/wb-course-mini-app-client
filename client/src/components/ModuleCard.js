import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ModuleCard.css';

const ModuleCard = ({ module }) => {
  return (
    <Link to={`/modules/${module.id}`} className="module-card-link">
      <div className="module-card">
        <div className="module-card-header">
          <div className="module-icon">{module.icon}</div>
          <h3 className="module-title">{module.title}</h3>
        </div>
        <p className="module-description">{module.shortDescription}</p>
        <div className="module-card-footer">
          <span className="module-more">Подробнее →</span>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;