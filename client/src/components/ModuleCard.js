import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ModuleCard.css';
import ModuleIcon from './ModuleIcon';

const ModuleCard = ({ module }) => {
  return (
    <div className="module-card">
      <div className="module-card-header">
        <div className="module-icon">
          <ModuleIcon iconName={module.icon} />
        </div>
        <h3 className="module-title">{module.title}</h3>
      </div>
      <p className="module-description">{module.shortDescription}</p>
      <div className="module-card-footer">
        <Link to={`/modules/${module.id}`} className="more-button">
          <span>Подробнее</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;