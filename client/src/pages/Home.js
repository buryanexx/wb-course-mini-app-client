// client/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, TrendingUp, Users, Star } from 'react-feather';
import Card from '../components/Card';
import Button from '../components/Button';
import StatGroup from '../components/StatGroup';
import EmptyState from '../components/EmptyState';
import ProgressBar from '../components/ProgressBar';
import { fetchModules } from '../utils/api';
import '../styles/Home.css';

const Home = ({ addToast }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadModules = async () => {
      try {
        setLoading(true);
        const data = await fetchModules();
        setModules(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить модули. Пожалуйста, попробуйте позже.');
        setLoading(false);
        addToast({
          title: 'Ошибка',
          message: 'Не удалось загрузить данные курса',
          variant: 'error'
        });
      }
    };
    
    loadModules();
  }, [addToast]);
  
  const stats = [
    {
      title: 'Модулей',
      value: '8',
      icon: <BookOpen size={24} />,
      variant: 'primary'
    },
    {
      title: 'Уроков',
      value: '42',
      icon: <Award size={24} />,
      variant: 'secondary'
    },
    {
      title: 'Средний доход выпускников',
      value: '300 000 ₽',
      icon: <TrendingUp size={24} />,
      change: '+15% к прошлому году',
      changeType: 'positive',
      variant: 'success'
    },
    {
      title: 'Учеников',
      value: '1200+',
      icon: <Users size={24} />,
      variant: 'info'
    }
  ];
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="home-loading">
          <ProgressBar 
            value={70} 
            max={100} 
            variant="primary" 
            animated={true} 
            striped={true}
            height={8}
          />
          <p>Загрузка данных курса...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <EmptyState
          title="Не удалось загрузить данные"
          description={error}
          icon={<TrendingUp size={64} />}
          action={() => window.location.reload()}
          actionText="Попробовать снова"
          variant="error"
        />
      );
    }
    
    return (
      <>
        <div className="home-stats">
          <StatGroup stats={stats} columns={4} gap="medium" />
        </div>
        
        <div className="home-modules">
          <h2 className="section-title">Модули курса</h2>
          <div className="modules-grid">
            {modules.map((module) => (
              <Card
                key={module.id}
                title={module.title}
                description={module.shortDescription}
                icon={module.icon}
                footer={
                  <Button 
                    variant="primary" 
                    size="small"
                    as={Link}
                    to={`/modules/${module.id}`}
                  >
                    Подробнее
                  </Button>
                }
              />
            ))}
          </div>
        </div>
        
        <div className="home-cta">
          <Card
            variant="primary"
            title="Готовы начать свой путь к успеху на Wildberries?"
            description="Присоединяйтесь к нашему курсу и узнайте, как зарабатывать от 300 000 рублей в месяц на маркетплейсе."
            footer={
              <Button 
                variant="secondary" 
                size="large"
                fullWidth
              >
                Записаться на курс
              </Button>
            }
          />
        </div>
      </>
    );
  };
  
  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Курс по выходу на Wildberries</h1>
        <p className="home-subtitle">
          От нуля до прибыли в 300 000 рублей
        </p>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Home;