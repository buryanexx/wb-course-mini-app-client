import React from 'react';
import PropTypes from 'prop-types';
import { 
  File, 
  FileText, 
  Image, 
  Film, 
  Music, 
  Archive, 
  Code, 
  Download, 
  Trash2, 
  Eye 
} from 'react-feather';
import '../styles/FileItem.css';

const FileItem = ({ 
  name, 
  type, 
  size, 
  preview, 
  date,
  onDownload,
  onDelete,
  onPreview
}) => {
  const getFileIcon = () => {
    const extension = name.split('.').pop().toLowerCase();
    
    if (type === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <Image size={24} />;
    } else if (type === 'video' || ['mp4', 'webm', 'avi', 'mov', 'wmv'].includes(extension)) {
      return <Film size={24} />;
    } else if (type === 'audio' || ['mp3', 'wav', 'ogg', 'flac'].includes(extension)) {
      return <Music size={24} />;
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return <Archive size={24} />;
    } else if (['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'php', 'py', 'java', 'c', 'cpp'].includes(extension)) {
      return <Code size={24} />;
    } else if (['doc', 'docx', 'txt', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
      return <FileText size={24} />;
    } else {
      return <File size={24} />;
    }
  };
  
  return (
    <div className="file-item">
      <div className="file-item-icon">
        {preview ? (
          <img src={preview} alt={name} className="file-item-preview" />
        ) : (
          getFileIcon()
        )}
      </div>
      
      <div className="file-item-info">
        <div className="file-item-name">{name}</div>
        <div className="file-item-details">
          <span className="file-item-size">{size}</span>
          {date && <span className="file-item-date">{date}</span>}
        </div>
      </div>
      
      <div className="file-item-actions">
        {onPreview && (
          <button 
            className="file-item-action file-item-preview-btn"
            onClick={onPreview}
            aria-label="Просмотр"
          >
            <Eye size={16} />
          </button>
        )}
        
        {onDownload && (
          <button 
            className="file-item-action file-item-download"
            onClick={onDownload}
            aria-label="Скачать"
          >
            <Download size={16} />
          </button>
        )}
        
        {onDelete && (
          <button 
            className="file-item-action file-item-delete"
            onClick={onDelete}
            aria-label="Удалить"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

FileItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string.isRequired,
  preview: PropTypes.string,
  date: PropTypes.string,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  onPreview: PropTypes.func
};

export default FileItem; 