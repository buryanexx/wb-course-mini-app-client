import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';

/**
 * Компонент карточки категории для базы знаний
 * @param {Object} props - Свойства компонента
 * @param {string} props.title - Заголовок категории
 * @param {string} props.description - Описание категории
 * @param {React.ReactNode} props.icon - Иконка категории
 * @param {string} props.color - Цвет категории
 * @param {string} props.to - Путь для перехода при клике
 */
const CategoryCard = ({ title, description, icon, color = '#7B68EE', to }) => {
  return (
    <Link to={to} className="category-card">
      <div className="category-icon" style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <h2 className="category-title">{title}</h2>
      <p className="category-description">{description}</p>
    </Link>
  );
};

export default CategoryCard; 