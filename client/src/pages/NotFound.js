import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion } from 'react-feather';
import EmptyState from '../components/EmptyState';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="not-found-page">
      <EmptyState
        title="Страница не найдена"
        description="Извините, запрашиваемая страница не существует или была перемещена."
        icon={<FileQuestion size={64} />}
        action={() => navigate('/')}
        actionText="Вернуться на главную"
        variant="info"
        size="large"
      />
    </div>
  );
};

export default NotFound; 