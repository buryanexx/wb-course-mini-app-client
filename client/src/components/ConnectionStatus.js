import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'react-feather';
import '../styles/ConnectionStatus.css';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (!showStatus) return null;
  
  return (
    <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <>
          <Wifi size={16} />
          <span>Подключение восстановлено</span>
        </>
      ) : (
        <>
          <WifiOff size={16} />
          <span>Нет подключения к интернету</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus; 