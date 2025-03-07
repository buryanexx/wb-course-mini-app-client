import React from 'react';
import { Book, Clock, Award, Users } from 'react-feather';
import '../styles/StatsBlock.css';

const StatsBlock = () => {
  const stats = [
    {
      icon: <Book size={32} />,
      value: '8+',
      label: 'Обучающих модулей',
      description: 'Структурированные материалы для эффективного обучения'
    },
    {
      icon: <Clock size={32} />,
      value: '40+',
      label: 'Часов контента',
      description: 'Подробные видеоуроки и практические задания'
    },
    {
      icon: <Award size={32} />,
      value: '100%',
      label: 'Практических знаний',
      description: 'Только проверенные методики и стратегии'
    },
    {
      icon: <Users size={32} />,
      value: '1000+',
      label: 'Успешных учеников',
      description: 'Которые уже зарабатывают на Wildberries'
    }
  ];
  
  return (
    <div className="stats-block">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBlock; 