import React from 'react';

const TestPage = () => {
  return (
    <div style={{padding: '20px'}}>
      <h1>Тестовая страница React</h1>
      <p>Если вы видите этот текст, значит React-компоненты рендерятся правильно.</p>
      <p>Время загрузки: {new Date().toLocaleTimeString()}</p>
      <button 
        style={{
          background: 'var(--button-color, #0088cc)',
          color: 'var(--button-text-color, white)',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Кнопка работает!')}
      >
        Нажми меня
      </button>
    </div>
  );
};

export default TestPage; 