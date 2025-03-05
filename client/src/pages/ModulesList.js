// client/src/pages/ModulesList.js
import React, { useState, useEffect } from 'react';
import { getModules } from '../utils/api';
import ModuleCard from '../components/ModuleCard';
import '../styles/ModulesList.css';

const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить модули. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка модулей...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="modules-list-page">
      <h1>Модули курса</h1>
      <p className="modules-description">
        Наш курс разделен на 8 последовательных модулей, каждый из которых 
        охватывает важный аспект бизнеса на Wildberries. Пройдите их все,
        чтобы освоить полный цикл от анализа ниши до масштабирования бизнеса.
      </p>

      <div className="modules-grid">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

export default ModulesList;