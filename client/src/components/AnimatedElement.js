import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/AnimatedElement.css';

const AnimatedElement = ({ 
  children, 
  animation = 'fade-in', 
  delay = 0, 
  duration = 0.5,
  threshold = 0.1,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold
      }
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
  }, [once, threshold]);

  const animationStyle = {
    '--animation-delay': `${delay}s`,
    '--animation-duration': `${duration}s`
  };

  return (
    <div 
      ref={elementRef} 
      className={`animated-element ${animation} ${isVisible ? 'visible' : ''}`}
      style={animationStyle}
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
  once: PropTypes.bool
};

export default AnimatedElement; 