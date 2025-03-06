import React from 'react';
import { Link } from 'react-router-dom';
import AdaptiveContainer from '../components/AdaptiveContainer';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <AdaptiveContainer>
        <h1>Страница не найдена</h1>
        <p>Извините, запрашиваемая страница не существует.</p>
        <Link to="/" className="button">
          Вернуться на главную
        </Link>
      </AdaptiveContainer>
    </div>
  );
};

export default NotFound; 