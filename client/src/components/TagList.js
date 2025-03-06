import React from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import '../styles/TagList.css';

const TagList = ({ 
  tags, 
  variant = 'default',
  size = 'medium',
  onClick,
  removable = false,
  onRemove,
  wrap = true,
  maxTags
}) => {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;
  const hiddenCount = maxTags && tags.length > maxTags ? tags.length - maxTags : 0;
  
  return (
    <div className={`tag-list ${wrap ? 'tag-list-wrap' : ''}`}>
      {displayTags.map((tag, index) => (
        <Tag
          key={index}
          label={tag.label || tag}
          variant={tag.variant || variant}
          size={tag.size || size}
          icon={tag.icon}
          count={tag.count}
          onClick={onClick ? () => onClick(tag, index) : undefined}
          removable={removable}
          onRemove={onRemove ? () => onRemove(tag, index) : undefined}
        />
      ))}
      
      {hiddenCount > 0 && (
        <Tag
          label={`+${hiddenCount}`}
          variant="outlined"
          size={size}
        />
      )}
    </div>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        variant: PropTypes.string,
        size: PropTypes.string,
        icon: PropTypes.node,
        count: PropTypes.number
      })
    ])
  ).isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  wrap: PropTypes.bool,
  maxTags: PropTypes.number
};

export default TagList; 