import React from 'react';
import PropTypes from 'prop-types';
import { X, Check, AlertCircle } from 'react-feather';
import ProgressIndicator from './ProgressIndicator';
import '../styles/UploadProgress.css';

const UploadProgress = ({ 
  files, 
  onCancel,
  onRetry,
  onRemove
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="upload-progress">
      {files.map((file, index) => (
        <div 
          key={index} 
          className={`upload-item upload-item-${file.status || 'uploading'}`}
        >
          <div className="upload-item-info">
            <div className="upload-item-name">{file.name}</div>
            <div className="upload-item-size">{file.size}</div>
          </div>
          
          <div className="upload-item-progress">
            {file.status !== 'completed' && file.status !== 'error' && (
              <ProgressIndicator 
                progress={file.progress} 
                height={4}
                variant={file.status === 'paused' ? 'warning' : 'default'}
                animated={file.status !== 'paused'}
              />
            )}
            
            {file.status === 'error' && file.error && (
              <div className="upload-item-error">{file.error}</div>
            )}
          </div>
          
          <div className="upload-item-actions">
            {file.status === 'completed' || file.status === 'error' ? (
              <button 
                className="upload-item-status-icon"
                aria-label={file.status}
              >
                {getStatusIcon(file.status)}
              </button>
            ) : null}
            
            {file.status === 'error' && onRetry && (
              <button 
                className="upload-item-action upload-item-retry"
                onClick={() => onRetry(file, index)}
                aria-label="Повторить"
              >
                Повторить
              </button>
            )}
            
            {(file.status === 'uploading' || file.status === 'paused') && onCancel && (
              <button 
                className="upload-item-action upload-item-cancel"
                onClick={() => onCancel(file, index)}
                aria-label="Отменить"
              >
                <X size={16} />
              </button>
            )}
            
            {(file.status === 'completed' || file.status === 'error') && onRemove && (
              <button 
                className="upload-item-action upload-item-remove"
                onClick={() => onRemove(file, index)}
                aria-label="Удалить"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

UploadProgress.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      progress: PropTypes.number,
      status: PropTypes.oneOf(['uploading', 'paused', 'completed', 'error']),
      error: PropTypes.string
    })
  ).isRequired,
  onCancel: PropTypes.func,
  onRetry: PropTypes.func,
  onRemove: PropTypes.func
};

export default UploadProgress; 