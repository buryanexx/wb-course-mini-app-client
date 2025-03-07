import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Tag } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import ArticleCard from '../components/ArticleCard';
import Skeleton from '../components/Skeleton';
import '../styles/KnowledgeCategory.css';
import { getCategoryArticles } from '../utils/api';

const KnowledgeCategory = ({ addToast }) => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const articlesData = await getCategoryArticles(categoryId);
        setArticles(articlesData);
        
        if (articlesData.length > 0 && articlesData[0].category) {
          setCategory(articlesData[0].category);
        } else {
          setCategory({
            id: categoryId,
            title: 'Категория',
            description: 'Статьи и материалы по данной теме'
          });
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить статьи для данной категории'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [categoryId, addToast]);
  
  return (
    <div className="knowledge-category-page">
      <AdaptiveContainer>
        <div className="page-header">
          <Link to="/knowledge" className="back-link">
            <ArrowLeft size={20} />
            <span>К базе знаний</span>
          </Link>
          
          {loading ? (
            <Skeleton height={80} width="70%" />
          ) : (
            <>
              <h1 className="page-title">{category?.title}</h1>
              <p className="page-description">{category?.description}</p>
            </>
          )}
        </div>
        
        <div className="articles-list">
          {loading ? (
            Array(5).fill().map((_, index) => (
              <div key={index} className="article-skeleton">
                <Skeleton height={120} />
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map(article => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.description}
                to={`/knowledge/${categoryId}/article/${article.id}`}
                meta={[
                  {
                    icon: <Clock size={14} />,
                    text: article.readTime
                  },
                  {
                    icon: <Tag size={14} />,
                    text: article.tags?.join(', ')
                  }
                ]}
                isPremium={article.isPremium}
              />
            ))
          ) : (
            <div className="no-articles">
              <p>В данной категории пока нет статей</p>
            </div>
          )}
        </div>
      </AdaptiveContainer>
    </div>
  );
};

export default KnowledgeCategory; 