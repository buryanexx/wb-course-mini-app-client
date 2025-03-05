import React from 'react';

const ModuleIcon = ({ iconName }) => {
  const iconMap = {
    'rocket': '🚀',
    'search': '🔍',
    'handshake': '🤝',
    'file-text': '📄',
    'dollar-sign': '💰',
    'truck': '🚚',
    'trending-up': '📈',
    'bar-chart': '📊',
    'tool': '🔧',
    'gift': '🎁',
    'globe': '🌐',
    'shield': '🛡️'
  };

  const icon = iconMap[iconName] || '📦';

  return (
    <div className="module-icon-wrapper">
      <span style={{ fontSize: '24px' }}>{icon}</span>
    </div>
  );
};

export default ModuleIcon;