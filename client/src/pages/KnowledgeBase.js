import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, TrendingUp } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import CategoryCard from '../components/CategoryCard';
import Skeleton from '../components/Skeleton';
import '../styles/KnowledgeBase.css';
import { getKnowledgeCategories } from '../utils/api';

const KnowledgeBase = ({ addToast }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getKnowledgeCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить категории базы знаний'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [addToast]);
  
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen size={24} />;
      case 'award':
        return <Award size={24} />;
      case 'trending-up':
        return <TrendingUp size={24} />;
      default:
        return <BookOpen size={24} />;
    }
  };
  
  return (
    <div className="knowledge-base-page">
      <AdaptiveContainer>
        <div className="page-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Назад</span>
          </Link>
          <h1 className="page-title">База знаний</h1>
          <p className="page-description">
            Полезные материалы и статьи о работе с маркетплейсом Wildberries
          </p>
        </div>
        
        <div className="categories-grid">
          {loading ? (
            Array(3).fill().map((_, index) => (
              <div key={index} className="category-skeleton">
                <Skeleton height={200} />
              </div>
            ))
          ) : (
            categories.map(category => (
              <AnimatedElement key={category.id} animation="fade-up">
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={getIconComponent(category.icon)}
                  color={category.color}
                  to={`/knowledge/${category.id}`}
                />
              </AnimatedElement>
            ))
          )}
        </div>
      </AdaptiveContainer>
    </div>
  );
};

export default KnowledgeBase; 