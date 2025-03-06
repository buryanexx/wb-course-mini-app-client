import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/ModuleCard.css';

// Иконки для модулей (если иконки приходят как строки)
const iconMap = {
  'rocket': '🚀',
  'search': '🔍',
  'handshake': '🤝',
  'file-text': '📄',
  'dollar-sign': '💰',
  'truck': '🚚',
  'trending-up': '📈',
  'bar-chart': '📊'
};

const ModuleCard = ({ module }) => {
  // Получаем иконку из карты или используем ту, что пришла с сервера
  const displayIcon = iconMap[module.icon] || module.icon || '📊';
  
  return (
    <Link to={`/modules/${module.id}`} className="module-card-link">
      <div className="module-card">
        <div className="module-card-header">
          <div className="module-icon">{displayIcon}</div>
          <h3 className="module-title">{module.title}</h3>
        </div>
        <p className="module-description">{module.shortDescription}</p>
        <div className="module-card-footer">
          <span className="module-more">Подробнее</span>
          <span className="module-badge">Модуль {module.id}</span>
        </div>
      </div>
    </Link>
  );
};

ModuleCard.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    icon: PropTypes.string
  }).isRequired
};

export default ModuleCard;