import React from 'react';
import '../styles/SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'article':
        return (
          <div className="skeleton-article">
            <div className="skeleton-item skeleton-title"></div>
            <div className="skeleton-item skeleton-text"></div>
            <div className="skeleton-item skeleton-text"></div>
            <div className="skeleton-item skeleton-text-short"></div>
            <div className="skeleton-item skeleton-tags"></div>
          </div>
        );
      case 'module':
        return (
          <div className="skeleton-module">
            <div className="skeleton-item skeleton-icon"></div>
            <div className="skeleton-item skeleton-title"></div>
            <div className="skeleton-item skeleton-text"></div>
            <div className="skeleton-item skeleton-progress"></div>
          </div>
        );
      default:
        return (
          <div className="skeleton-card">
            <div className="skeleton-item skeleton-title"></div>
            <div className="skeleton-item skeleton-text"></div>
            <div className="skeleton-item skeleton-text"></div>
          </div>
        );
    }
  };
  
  return (
    <div className="skeleton-container">
      {Array(count).fill().map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader; 