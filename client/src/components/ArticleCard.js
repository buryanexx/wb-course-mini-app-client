import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'react-feather';
import '../styles/ArticleCard.css';

/**
 * Компонент карточки статьи
 * @param {Object} props - Свойства компонента
 * @param {string} props.title - Заголовок статьи
 * @param {string} props.description - Описание статьи
 * @param {string} props.to - Путь для перехода при клике
 * @param {Array} props.meta - Метаданные статьи (иконка и текст)
 * @param {boolean} props.isPremium - Флаг премиум-статьи
 */
const ArticleCard = ({ title, description, to, meta = [], isPremium = false }) => {
  return (
    <Link to={to} className="article-card">
      <div className="article-card-content">
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-description">{description}</p>
        
        {meta.length > 0 && (
          <div className="article-card-meta">
            {meta.map((item, index) => (
              item.text && (
                <div key={index} className="meta-item">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      
      {isPremium && (
        <div className="article-card-premium">
          <Star size={14} />
          <span>Премиум</span>
        </div>
      )}
    </Link>
  );
};

export default ArticleCard; 