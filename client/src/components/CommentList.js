import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import Button from './Button';
import Avatar from './Avatar';
import '../styles/CommentList.css';

const CommentList = ({ 
  comments, 
  currentUser,
  onAddComment,
  onLike,
  onReply,
  onEdit,
  onDelete,
  onReport,
  emptyMessage = 'Нет комментариев. Будьте первым, кто оставит комментарий!'
}) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment('');
    }
  };
  
  return (
    <div className="comment-list">
      {currentUser && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment-form-avatar">
            {currentUser.avatar ? (
              <Avatar 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                size="medium"
              />
            ) : (
              <Avatar 
                initials={currentUser.name.charAt(0)} 
                size="medium"
              />
            )}
          </div>
          
          <div className="comment-form-content">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Напишите комментарий..."
              className="comment-form-textarea"
              rows={3}
            />
            
            <div className="comment-form-actions">
              <Button 
                type="submit" 
                variant="primary"
                size="small"
                disabled={!newComment.trim()}
              >
                Отправить
              </Button>
            </div>
          </div>
        </form>
      )}
      
      {comments && comments.length > 0 ? (
        <div className="comment-list-items">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              author={comment.author}
              content={comment.content}
              date={comment.date}
              likes={comment.likes}
              replies={comment.replies}
              isLiked={comment.isLiked}
              currentUser={currentUser && comment.author.id === currentUser.id}
              onLike={() => onLike && onLike(comment, index)}
              onReply={(content) => onReply && onReply(content, comment, index)}
              onEdit={(content) => onEdit && onEdit(content, comment, index)}
              onDelete={() => onDelete && onDelete(comment, index)}
              onReport={() => onReport && onReport(comment, index)}
            />
          ))}
        </div>
      ) : (
        <div className="comment-list-empty">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
      }).isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      likes: PropTypes.number,
      replies: PropTypes.array,
      isLiked: PropTypes.bool
    })
  ).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }),
  onAddComment: PropTypes.func,
  onLike: PropTypes.func,
  onReply: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onReport: PropTypes.func,
  emptyMessage: PropTypes.string
};

export default CommentList; 