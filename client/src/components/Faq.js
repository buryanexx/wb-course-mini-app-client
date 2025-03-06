import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import AnimatedElement from './AnimatedElement';
import '../styles/Faq.css';

const FaqItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
      <div className="faq-question" onClick={toggleOpen}>
        <h3>{question}</h3>
        <button className="faq-toggle">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = ({ items, title = 'Часто задаваемые вопросы' }) => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <div className="faq-container">
      {title && (
        <h2 className="faq-title">{title}</h2>
      )}
      
      <div className="faq-items">
        {items.map((item, index) => (
          <AnimatedElement 
            key={index} 
            animation="fade-up"
            delay={index * 0.1}
          >
            <FaqItem 
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleItem(index)}
            />
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
};

export default Faq; 