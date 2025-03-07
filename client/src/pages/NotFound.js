import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <div className="not-found-content">
            <div className="not-found-code">404</div>
            <h1 className="not-found-title">Страница не найдена</h1>
            <p className="not-found-description">
              Извините, но страница, которую вы ищете, не существует или была перемещена.
            </p>
            
            <div className="not-found-actions">
              <Link to="/">
                <Button 
                  variant="primary" 
                  size="large"
                  icon={<Home size={20} />}
                  iconPosition="left"
                >
                  На главную
                </Button>
              </Link>
              
              <Link to="/modules">
                <Button 
                  variant="outline" 
                  size="large"
                  icon={<Search size={20} />}
                  iconPosition="left"
                >
                  Просмотреть модули
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default NotFound; 