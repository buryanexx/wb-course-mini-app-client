import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import Button from '../components/Button';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <AdaptiveContainer>
        <div className="not-found-content">
          <div className="not-found-icon">404</div>
          <h1 className="not-found-title">Страница не найдена</h1>
          <p className="not-found-message">
            Извините, запрашиваемая страница не существует или была перемещена.
          </p>
          
          <div className="not-found-actions">
            <Link to="/">
              <Button 
                variant="primary"
                icon={<Home size={18} />}
                iconPosition="left"
              >
                На главную
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              icon={<ArrowLeft size={18} />}
              iconPosition="left"
              onClick={() => window.history.back()}
            >
              Назад
            </Button>
          </div>
          
          <div className="not-found-suggestions">
            <h3>Возможно, вас заинтересует:</h3>
            <ul>
              <li><Link to="/modules">Обучающие модули</Link></li>
              <li><Link to="/knowledge">База знаний</Link></li>
              <li><Link to="/tools">Инструменты</Link></li>
            </ul>
          </div>
        </div>
      </AdaptiveContainer>
    </div>
  );
};

export default NotFound; 