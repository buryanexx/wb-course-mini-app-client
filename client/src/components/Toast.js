import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'react-feather';
import '../styles/Toast.css';

const Toast = ({ variant = 'info', title, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Анимация появления
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => {
      setIsVisible(false);
    };
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Время анимации исчезновения
  };
  
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };
  
  return (
    <div className={`toast toast-${variant} ${isVisible ? 'visible' : ''}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      
      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        {message && <div className="toast-message">{message}</div>}
      </div>
      
      <button className="toast-close" onClick={handleClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast; 