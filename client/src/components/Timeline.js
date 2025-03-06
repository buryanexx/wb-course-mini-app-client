import React from 'react';
import PropTypes from 'prop-types';
import AnimatedElement from './AnimatedElement';
import '../styles/Timeline.css';

const TimelineItem = ({ 
  title, 
  date, 
  content, 
  icon,
  isActive = false
}) => {
  return (
    <div className={`timeline-item ${isActive ? 'timeline-item-active' : ''}`}>
      <div className="timeline-marker">
        {icon ? (
          <div className="timeline-icon">
            {icon}
          </div>
        ) : (
          <div className="timeline-dot"></div>
        )}
      </div>
      
      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="timeline-title">{title}</h3>
          {date && <div className="timeline-date">{date}</div>}
        </div>
        
        <div className="timeline-body">
          {content}
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ items, animated = true }) => {
  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        animated ? (
          <AnimatedElement 
            key={index} 
            animation="fade-up"
            delay={index * 0.1}
          >
            <TimelineItem 
              title={item.title}
              date={item.date}
              content={item.content}
              icon={item.icon}
              isActive={item.isActive}
            />
          </AnimatedElement>
        ) : (
          <TimelineItem 
            key={index}
            title={item.title}
            date={item.date}
            content={item.content}
            icon={item.icon}
            isActive={item.isActive}
          />
        )
      ))}
    </div>
  );
};

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
      isActive: PropTypes.bool
    })
  ).isRequired,
  animated: PropTypes.bool
};

export default Timeline; 