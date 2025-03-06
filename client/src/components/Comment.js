import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, Heart, Flag, MoreVertical, Edit2, Trash2 } from 'react-feather';
import Avatar from './Avatar';
import Button from './Button';
import Dropdown from './Dropdown';
import '../styles/Comment.css';

const Comment = ({ 
  author, 
  content, 
  date, 
  likes = 0,
  replies = [],
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReport,
  isLiked = false,
  currentUser = false
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [replyContent, setReplyContent] = useState('');
  
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim() && onReply) {
      onReply(replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedContent.trim() && onEdit) {
      onEdit(editedContent);
      setIsEditing(false);
    }
  };
  
  const dropdownItems = [
    ...(currentUser ? [
      { 
        label: 'Редактировать', 
        icon: <Edit2 size={14} />, 
        onClick: () => setIsEditing(true) 
      },
      { 
        label: 'Удалить', 
        icon: <Trash2 size={14} />, 
        onClick: onDelete 
      }
    ] : [
      { 
        label: 'Пожаловаться', 
        icon: <Flag size={14} />, 
        onClick: onReport 
      }
    ])
  ];
  
  return (
    <div className="comment">
      <div className="comment-avatar">
        <Avatar 
          src={author.avatar} 
          alt={author.name} 
          size="medium"
        />
      </div>
      
      <div className="comment-content">
        <div className="comment-header">
          <div className="comment-author">{author.name}</div>
          <div className="comment-date">{date}</div>
          
          {(currentUser || onReport) && (
            <Dropdown 
              trigger={
                <button className="comment-more-btn">
                  <MoreVertical size={16} />
                </button>
              }
              items={dropdownItems}
              position="bottom-right"
            />
          )}
        </div>
        
        {isEditing ? (
          <form className="comment-edit-form" onSubmit={handleEditSubmit}>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="comment-edit-textarea"
              rows={3}
            />
            <div className="comment-edit-actions">
              <Button 
                type="submit" 
                size="small" 
                variant="primary"
              >
                Сохранить
              </Button>
              <Button 
                type="button" 
                size="small" 
                variant="text"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(content);
                }}
              >
                Отмена
              </Button>
            </div>
          </form>
        ) : (
          <div className="comment-text">{content}</div>
        )}
        
        <div className="comment-actions">
          <button 
            className={`comment-action comment-like ${isLiked ? 'comment-liked' : ''}`}
            onClick={onLike}
          >
            <Heart size={14} />
            {likes > 0 && <span>{likes}</span>}
          </button>
          
          <button 
            className="comment-action comment-reply"
            onClick={() => setIsReplying(!isReplying)}
          >
            <MessageSquare size={14} />
            <span>Ответить</span>
          </button>
        </div>
        
        {isReplying && (
          <form className="comment-reply-form" onSubmit={handleReplySubmit}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Напишите ответ..."
              className="comment-reply-textarea"
              rows={2}
            />
            <div className="comment-reply-actions">
              <Button 
                type="submit" 
                size="small" 
                variant="primary"
                disabled={!replyContent.trim()}
              >
                Ответить
              </Button>
              <Button 
                type="button" 
                size="small" 
                variant="text"
                onClick={() => {
                  setIsReplying(false);
                  setReplyContent('');
                }}
              >
                Отмена
              </Button>
            </div>
          </form>
        )}
        
        {replies.length > 0 && (
          <div className="comment-replies">
            {replies.map((reply, index) => (
              <Comment
                key={index}
                author={reply.author}
                content={reply.content}
                date={reply.date}
                likes={reply.likes}
                isLiked={reply.isLiked}
                currentUser={reply.currentUser}
                onLike={() => reply.onLike && reply.onLike(reply, index)}
                onEdit={(content) => reply.onEdit && reply.onEdit(content, reply, index)}
                onDelete={() => reply.onDelete && reply.onDelete(reply, index)}
                onReport={() => reply.onReport && reply.onReport(reply, index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number,
  replies: PropTypes.array,
  onLike: PropTypes.func,
  onReply: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onReport: PropTypes.func,
  isLiked: PropTypes.bool,
  currentUser: PropTypes.bool
};

export default Comment; 