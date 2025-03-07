import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, TrendingUp, Award } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import { fetchKnowledgeCategories } from '../utils/api';
import '../styles/KnowledgeBase.css';

const KnowledgeBase = ({ addToast }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchKnowledgeCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading knowledge categories:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить категории базы знаний'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, [addToast]);
  
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'book-open':
        return <Book size={32} />;
      case 'trending-up':
        return <TrendingUp size={32} />;
      case 'award':
        return <Award size={32} />;
      default:
        return <Book size={32} />;
    }
  };
  
  return (
    <div className="knowledge-base-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <h1 className="page-title">База знаний Wildberries</h1>
          <p className="page-description">
            Выберите уровень сложности, соответствующий вашему опыту работы с маркетплейсом
          </p>
          
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p className="loading-text">Загрузка категорий...</p>
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map((category, index) => (
                <AnimatedElement 
                  key={category.id} 
                  animation="fade-up" 
                  delay={index * 0.1}
                >
                  <Link to={`/knowledge/${category.id}`} className="category-card">
                    <div className="category-icon" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                      {getCategoryIcon(category.icon)}
                    </div>
                    <h2 className="category-title">{category.title}</h2>
                    <p className="category-description">{category.description}</p>
                  </Link>
                </AnimatedElement>
              ))}
            </div>
          )}
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default KnowledgeBase; 