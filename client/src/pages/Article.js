import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share2, Lock } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import { fetchArticleById, markArticleAsRead } from '../utils/api';
import '../styles/Article.css';

const Article = ({ addToast }) => {
  const { categoryId, articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userHasAccess, setUserHasAccess] = useState(true); // В реальном приложении проверяйте доступ
  
  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await fetchArticleById(parseInt(articleId));
        setArticle(data);
        
        // Проверка, есть ли у пользователя доступ к премиум-контенту
        if (data.isPremium) {
          // В реальном приложении здесь будет проверка подписки
          // Для демонстрации считаем, что у пользователя нет доступа к премиум-контенту
          setUserHasAccess(false);
        }
        
        // Отмечаем статью как прочитанную
        if (!data.isPremium || userHasAccess) {
          await markArticleAsRead(parseInt(articleId));
        }
        
        // Проверяем, добавлена ли статья в закладки
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(parseInt(articleId)));
      } catch (error) {
        console.error('Error loading article:', error);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось загрузить статью'
        });
        navigate(`/knowledge/${categoryId}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticle();
  }, [articleId, categoryId, navigate, addToast, userHasAccess]);
  
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(id => id !== parseInt(articleId));
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
      addToast({
        variant: 'info',
        title: 'Закладки',
        message: 'Статья удалена из закладок'
      });
    } else {
      const updatedBookmarks = [...bookmarks, parseInt(articleId)];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
      addToast({
        variant: 'success',
        title: 'Закладки',
        message: 'Статья добавлена в закладки'
      });
    }
  };
  
  const shareArticle = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${window.location.href}&text=Интересная статья: ${article.title}`);
    } else {
      // Запасной вариант для браузеров
      navigator.clipboard.writeText(window.location.href);
      addToast({
        variant: 'success',
        title: 'Поделиться',
        message: 'Ссылка скопирована в буфер обмена'
      });
    }
  };
  
  const getCategoryTitle = () => {
    switch (parseInt(categoryId)) {
      case 1: return "Базовый уровень";
      case 2: return "Продвинутый уровень";
      case 3: return "Экспертный уровень";
      default: return "База знаний";
    }
  };
  
  if (loading) {
    return (
      <div className="article-page">
        <AdaptiveContainer>
          <div className="loading-container">
            <div className="loader"></div>
            <p className="loading-text">Загрузка статьи...</p>
          </div>
        </AdaptiveContainer>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="article-page">
        <AdaptiveContainer>
          <div className="error-container">
            <h2>Статья не найдена</h2>
            <Link to={`/knowledge/${categoryId}`}>
              <Button variant="primary">Вернуться к списку статей</Button>
            </Link>
          </div>
        </AdaptiveContainer>
      </div>
    );
  }
  
  return (
    <div className="article-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <div className="article-header">
            <Link to={`/knowledge/${categoryId}`} className="back-link">
              <ArrowLeft size={20} />
              <span>Назад к {getCategoryTitle()}</span>
            </Link>
            
            <div className="article-actions">
              <button 
                className={`action-button ${isBookmarked ? 'active' : ''}`} 
                onClick={toggleBookmark}
                aria-label="Добавить в закладки"
              >
                <Bookmark size={20} />
              </button>
              <button 
                className="action-button" 
                onClick={shareArticle}
                aria-label="Поделиться"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="article-content">
            <h1 className="article-title">{article.title}</h1>
            
            <div className="article-meta">
              <span className="read-time">{article.readTime}</span>
              <div className="article-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            {article.isPremium && !userHasAccess ? (
              <div className="premium-content-lock">
                <div className="lock-icon">
                  <Lock size={48} />
                </div>
                <h3>Премиум-контент</h3>
                <p>Этот материал доступен только для пользователей с премиум-подпиской</p>
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => navigate('/subscription')}
                >
                  Получить доступ
                </Button>
              </div>
            ) : (
              <div className="article-body">
                {/* Здесь будет содержимое статьи */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
                  nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
                  nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
                <h2>Подзаголовок статьи</h2>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero 
                  sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                </p>
                <ul>
                  <li>Пункт 1 - важная информация</li>
                  <li>Пункт 2 - еще более важная информация</li>
                  <li>Пункт 3 - самая важная информация</li>
                </ul>
                <p>
                  Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, 
                  commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, 
                  eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
                </p>
              </div>
            )}
          </div>
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default Article; 