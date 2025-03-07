import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';
import '../styles/Article.css';
import { getArticle } from '../utils/api';
import { shareViaTelegram } from '../utils/telegram';

const Article = ({ addToast }) => {
  const { categoryId, articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const data = await getArticle(categoryId, articleId);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить статью'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticleData();
  }, [categoryId, articleId, addToast]);
  
  const handleShare = () => {
    if (article) {
      const shareText = `${article.title}\n\nПрочитать статью: https://wb-reshenie.ru/knowledge/${categoryId}/article/${articleId}`;
      shareViaTelegram(shareText);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <div className="article-page">
      <AdaptiveContainer>
        <div className="page-header">
          <Link to={`/knowledge/${categoryId}`} className="back-link">
            <ArrowLeft size={20} />
            <span>Назад к категории</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="article-skeleton">
            <Skeleton height={50} width="80%" />
            <Skeleton height={20} width="40%" style={{ marginTop: '10px' }} />
            <Skeleton height={20} width="30%" style={{ marginTop: '10px' }} />
            <Skeleton height={300} style={{ marginTop: '20px' }} />
          </div>
        ) : article ? (
          <article className="article-content">
            <h1 className="article-title">{article.title}</h1>
            
            <div className="article-meta">
              {article.date && (
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{formatDate(article.date)}</span>
                </div>
              )}
              
              {article.readTime && (
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{article.readTime}</span>
                </div>
              )}
              
              {article.author && (
                <div className="meta-item">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
              )}
            </div>
            
            {article.isPremium && (
              <div className="premium-badge">
                Премиум контент
              </div>
            )}
            
            <div className="article-body">
              {/* Здесь будет содержимое статьи */}
              <p>{article.content || 'Содержимое статьи загружается...'}</p>
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags">
                <span className="tags-title">Теги:</span>
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            <div className="article-actions">
              <Button 
                variant="outline"
                icon={<Share2 size={18} />}
                iconPosition="left"
                onClick={handleShare}
              >
                Поделиться
              </Button>
            </div>
          </article>
        ) : (
          <div className="article-not-found">
            <h2>Статья не найдена</h2>
            <p>Запрашиваемая статья не существует или была удалена.</p>
            <Link to={`/knowledge/${categoryId}`}>
              <Button variant="primary">
                Вернуться к списку статей
              </Button>
            </Link>
          </div>
        )}
      </AdaptiveContainer>
    </div>
  );
};

export default Article; 