import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon } from 'react-feather';
import EmptyState from '../components/EmptyState';
import '../styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="not-found-page">
      <EmptyState
        icon={<AlertOctagon size={64} />}
        title="Страница не найдена"
        description="Извините, запрашиваемая страница не существует или была перемещена."
        action={() => navigate('/')}
        actionText="Вернуться на главную"
      />
    </div>
  );
};

export default NotFound; 