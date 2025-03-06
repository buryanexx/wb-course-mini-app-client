import React from 'react';
import PropTypes from 'prop-types';
import FileItem from './FileItem';
import '../styles/FileList.css';

const FileList = ({ 
  files, 
  onDownload,
  onDelete,
  onPreview,
  emptyMessage = 'Нет файлов для отображения'
}) => {
  if (!files || files.length === 0) {
    return (
      <div className="file-list-empty">
        {emptyMessage}
      </div>
    );
  }
  
  return (
    <div className="file-list">
      {files.map((file, index) => (
        <FileItem
          key={index}
          name={file.name}
          type={file.type}
          size={file.size}
          preview={file.preview}
          date={file.date}
          onDownload={onDownload ? () => onDownload(file, index) : undefined}
          onDelete={onDelete ? () => onDelete(file, index) : undefined}
          onPreview={onPreview ? () => onPreview(file, index) : undefined}
        />
      ))}
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      size: PropTypes.string.isRequired,
      preview: PropTypes.string,
      date: PropTypes.string
    })
  ).isRequired,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  onPreview: PropTypes.func,
  emptyMessage: PropTypes.string
};

export default FileList; 