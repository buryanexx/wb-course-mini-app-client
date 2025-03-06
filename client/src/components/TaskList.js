import React from 'react';
import PropTypes from 'prop-types';
import { Check, Clock, AlertCircle, MoreVertical, Edit2, Trash2 } from 'react-feather';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';
import '../styles/TaskList.css';

const TaskItem = ({ 
  task, 
  onToggle,
  onEdit,
  onDelete,
  onPrioritize
}) => {
  const statusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <Check size={16} className="task-status-icon task-status-completed" />;
      case 'pending':
        return <Clock size={16} className="task-status-icon task-status-pending" />;
      case 'overdue':
        return <AlertCircle size={16} className="task-status-icon task-status-overdue" />;
      default:
        return null;
    }
  };
  
  const dropdownItems = [
    { 
      label: 'Редактировать', 
      icon: <Edit2 size={14} />, 
      onClick: () => onEdit && onEdit(task) 
    },
    { 
      label: 'Удалить', 
      icon: <Trash2 size={14} />, 
      onClick: () => onDelete && onDelete(task) 
    },
    { 
      label: task.priority === 'high' ? 'Снять приоритет' : 'Сделать приоритетным', 
      icon: <AlertCircle size={14} />, 
      onClick: () => onPrioritize && onPrioritize(task) 
    }
  ];
  
  return (
    <div className={`task-item task-${task.status} ${task.priority === 'high' ? 'task-priority-high' : ''}`}>
      <div className="task-checkbox">
        <Checkbox 
          checked={task.status === 'completed'} 
          onChange={() => onToggle && onToggle(task)}
        />
      </div>
      
      <div className="task-content">
        <div className="task-title">
          {task.title}
          {statusIcon()}
        </div>
        
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        
        {task.dueDate && (
          <div className="task-due-date">
            Срок: {task.dueDate}
          </div>
        )}
      </div>
      
      <div className="task-actions">
        <Dropdown 
          trigger={
            <button className="task-more-btn">
              <MoreVertical size={16} />
            </button>
          }
          items={dropdownItems}
          position="bottom-right"
        />
      </div>
    </div>
  );
};

const TaskList = ({ 
  tasks, 
  onToggle,
  onEdit,
  onDelete,
  onPrioritize,
  emptyMessage = 'Нет задач для отображения'
}) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        {emptyMessage}
      </div>
    );
  }
  
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onPrioritize={onPrioritize}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'completed', 'overdue']),
      priority: PropTypes.oneOf(['low', 'medium', 'high']),
      dueDate: PropTypes.string
    })
  ).isRequired,
  onToggle: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPrioritize: PropTypes.func,
  emptyMessage: PropTypes.string
};

export default TaskList; 