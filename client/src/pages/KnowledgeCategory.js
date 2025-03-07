import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Star } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import { fetchArticlesByCategory } from '../utils/api';
import '../styles/KnowledgeCategory.css';

const KnowledgeCategory = ({ addToast }) => {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticlesByCategory(parseInt(categoryId));
        setArticles(data);
        
        // Извлекаем все уникальные теги
        const tags = new Set();
        data.forEach(article => {
          article.tags.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } catch (error) {
        console.error('Error loading articles:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить статьи'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, [categoryId, addToast]);
  
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const filteredArticles = articles.filter(article => {
    // Фильтрация по поисковому запросу
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтрация по тегам
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  const getCategoryTitle = () => {
    switch (parseInt(categoryId)) {
      case 1: return "Базовый уровень";
      case 2: return "Продвинутый уровень";
      case 3: return "Экспертный уровень";
      default: return "База знаний";
    }
  };
  
  return (
    <div className="knowledge-category-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <div className="category-header">
            <Link to="/knowledge" className="back-link">
              <ArrowLeft size={20} />
              <span>Назад к категориям</span>
            </Link>
            <h1 className="category-title">{getCategoryTitle()}</h1>
          </div>
          
          <div className="search-filter-container">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="tags-container">
              <div className="tags-header">
                <Filter size={16} />
                <span>Фильтр по тегам:</span>
              </div>
              <div className="tags-list">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p className="loading-text">Загрузка статей...</p>
            </div>
          ) : (
            <>
              {filteredArticles.length === 0 ? (
                <div className="no-results">
                  <p>Статьи не найдены. Попробуйте изменить параметры поиска.</p>
                </div>
              ) : (
                <div className="articles-list">
                  {filteredArticles.map((article, index) => (
                    <AnimatedElement 
                      key={article.id} 
                      animation="fade-up" 
                      delay={index * 0.05}
                    >
                      <Link to={`/knowledge/${categoryId}/article/${article.id}`} className="article-card">
                        {article.isPremium && (
                          <div className="premium-badge">
                            <Star size={14} />
                            <span>Premium</span>
                          </div>
                        )}
                        <h3 className="article-title">{article.title}</h3>
                        <p className="article-description">{article.description}</p>
                        <div className="article-meta">
                          <span className="read-time">{article.readTime}</span>
                          <div className="article-tags">
                            {article.tags.map(tag => (
                              <span key={tag} className="article-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    </AnimatedElement>
                  ))}
                </div>
              )}
            </>
          )}
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default KnowledgeCategory; 