import React from 'react';
import '../styles/Skeleton.css';

/**
 * Компонент для отображения скелетона загрузки
 * @param {Object} props - Свойства компонента
 * @param {string|number} props.width - Ширина скелетона (px или %)
 * @param {string|number} props.height - Высота скелетона (px или %)
 * @param {string} props.borderRadius - Радиус скругления углов
 * @param {string} props.className - Дополнительные CSS классы
 */
const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = ''
}) => {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  };
  
  return (
    <div className={`skeleton-loader ${className}`} style={style}></div>
  );
};

export default Skeleton; 