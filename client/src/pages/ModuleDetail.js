// client/src/pages/ModuleDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getModuleById } from '../utils/api';
import { ChevronLeft, Clock, Award } from 'react-feather';
import Section from '../components/Section';
import ModuleIcon from '../components/ModuleIcon';
import FeedbackForm from '../components/FeedbackForm';
import '../styles/ModuleDetail.css';

const ModuleDetail = () => {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const data = await getModuleById(parseInt(id));
        setModule(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить информацию о модуле. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  if (loading) {
    return <div className="loading">Загрузка модуля...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!module) {
    return <div className="error-message">Модуль не найден.</div>;
  }

  return (
    <div className="module-detail-page">
      <div className="module-nav">
        <Link to="/modules" className="back-button">
          <ChevronLeft size={18} />
          <span>К списку модулей</span>
        </Link>
      </div>

      <div className="module-header">
        <div className="module-icon-large">
          <ModuleIcon iconName={module.icon} />
        </div>
        <h1 className="module-title">{module.title}</h1>
      </div>

      <div className="module-meta">
        <div className="meta-item">
          <Clock size={16} />
          <span>{module.duration}</span>
        </div>
        <div className="meta-item">
          <Award size={16} />
          <span>{module.difficulty}</span>
        </div>
      </div>

      <div className="module-content">
        {module.sections.map((section, index) => (
          <Section 
            key={index} 
            title={section.title} 
            content={section.content} 
          />
        ))}
      </div>

      <div className="module-feedback">
        <FeedbackForm moduleId={module.id} />
      </div>
    </div>
  );
};

export default ModuleDetail;