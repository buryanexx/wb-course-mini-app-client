import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CheckSquare, FileText, TrendingUp } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import '../styles/Tools.css';

const Tools = () => {
  const tools = [
    {
      id: 1,
      title: "Калькулятор маржинальности",
      description: "Рассчитайте прибыльность вашего товара с учетом всех комиссий и затрат",
      icon: <Calculator size={32} />,
      path: "/tools/margin-calculator",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Планировщик рекламного бюджета",
      description: "Оптимизируйте распределение рекламного бюджета для максимальной эффективности",
      icon: <TrendingUp size={32} />,
      path: "/tools/ad-budget-planner",
      color: "#2196F3"
    },
    {
      id: 3,
      title: "Чек-листы для продавцов",
      description: "Готовые чек-листы для проверки карточек товаров и оптимизации продаж",
      icon: <CheckSquare size={32} />,
      path: "/tools/checklists",
      color: "#FF9800"
    },
    {
      id: 4,
      title: "Шаблоны документов",
      description: "Шаблоны договоров, актов и других документов для работы с поставщиками",
      icon: <FileText size={32} />,
      path: "/tools/templates",
      color: "#9C27B0"
    }
  ];
  
  return (
    <div className="tools-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <h1 className="page-title">Инструменты</h1>
          <p className="page-description">
            Полезные инструменты для оптимизации вашего бизнеса на Wildberries
          </p>
          
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <AnimatedElement 
                key={tool.id} 
                animation="fade-up" 
                delay={index * 0.1}
              >
                <Link to={tool.path} className="tool-card">
                  <div className="tool-icon" style={{ backgroundColor: `${tool.color}20`, color: tool.color }}>
                    {tool.icon}
                  </div>
                  <h2 className="tool-title">{tool.title}</h2>
                  <p className="tool-description">{tool.description}</p>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default Tools; 