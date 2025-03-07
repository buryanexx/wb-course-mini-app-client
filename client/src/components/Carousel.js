import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import '../styles/Carousel.css';

const Carousel = ({ items, renderItem, autoplay = true, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const autoplayTimerRef = useRef(null);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToSlide = (index) => {
    setActiveIndex(index);
  };
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsTouching(true);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsTouching(false);
    
    if (touchStart - touchEnd > 75) {
      // Свайп влево
      handleNext();
    } else if (touchStart - touchEnd < -75) {
      // Свайп вправо
      handlePrev();
    }
  };
  
  // Автоматическое переключение слайдов
  useEffect(() => {
    if (autoplay && !isTouching) {
      autoplayTimerRef.current = setTimeout(() => {
        handleNext();
      }, interval);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [activeIndex, autoplay, interval, isTouching]);
  
  return (
    <div 
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="carousel-slide">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-arrow carousel-arrow-prev"
          onClick={handlePrev}
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-next"
          onClick={handleNext}
          aria-label="Следующий слайд"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 