import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/AnimatedElement.css';

const AnimatedElement = ({ 
  children, 
  animation = 'fade-in', 
  delay = 0, 
  duration = 0.5,
  threshold = 0.1,
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    const currentElement = elementRef.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);
  
  const animationStyle = {
    '--animation-delay': `${delay}s`,
    '--animation-duration': `${duration}s`
  };
  
  const animationClasses = [
    'animated-element',
    `animation-${animation}`,
    isVisible ? 'is-visible' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      ref={elementRef} 
      className={animationClasses} 
      style={animationStyle}
      {...props}
    >
      {children}
    </div>
  );
};

AnimatedElement.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf([
    'fade-in', 
    'fade-up', 
    'fade-down', 
    'fade-left', 
    'fade-right',
    'zoom-in',
    'zoom-out'
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  className: PropTypes.string,
  ...PropTypes.object
};

export default AnimatedElement; 