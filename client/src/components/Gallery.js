import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, ChevronLeft, ChevronRight } from 'react-feather';
import AnimatedElement from './AnimatedElement';
import '../styles/Gallery.css';

const Gallery = ({ 
  images, 
  columns = 3, 
  gap = 'md',
  rounded = true
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };
  
  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="gallery-container">
      <div 
        className={`gallery-grid gallery-columns-${columns} gallery-gap-${gap} ${rounded ? 'gallery-rounded' : ''}`}
      >
        {images.map((image, index) => (
          <AnimatedElement 
            key={index} 
            animation="fade-up"
            delay={index * 0.1}
          >
            <div 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.thumbnail || image.src} 
                alt={image.alt || `Gallery image ${index + 1}`} 
                className="gallery-image"
              />
              {image.caption && (
                <div className="gallery-caption">
                  {image.caption}
                </div>
              )}
            </div>
          </AnimatedElement>
        ))}
      </div>
      
      {lightboxOpen && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={24} />
          </button>
          
          <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
            <ChevronLeft size={36} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[currentImageIndex].src} 
              alt={images[currentImageIndex].alt || `Gallery image ${currentImageIndex + 1}`} 
              className="lightbox-image"
            />
            
            {images[currentImageIndex].caption && (
              <div className="lightbox-caption">
                {images[currentImageIndex].caption}
              </div>
            )}
          </div>
          
          <button className="lightbox-nav lightbox-next" onClick={goToNext}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string
    })
  ).isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  gap: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.bool
};

export default Gallery; 