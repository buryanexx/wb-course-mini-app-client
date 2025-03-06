import React, { useState } from 'react';
import { Send, Check } from 'react-feather';
import PremiumButton from './PremiumButton';
import '../styles/FeedbackForm.css';
import { sendFeedback } from '../utils/api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите ваш email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, введите ваше сообщение';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await sendFeedback(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setSubmitError('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
      console.error('Error sending feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="feedback-form-container">
      {isSubmitted ? (
        <div className="feedback-success">
          <div className="feedback-success-icon">
            <Check size={32} />
          </div>
          <h3 className="feedback-success-title">Сообщение отправлено!</h3>
          <p className="feedback-success-message">
            Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.
          </p>
          <PremiumButton 
            onClick={() => setIsSubmitted(false)}
            variant="outlined"
          >
            Отправить еще одно сообщение
          </PremiumButton>
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          {submitError && (
            <div className="feedback-error">
              {submitError}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              disabled={isSubmitting}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите ваш email"
              disabled={isSubmitting}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">Сообщение</label>
            <textarea
              id="message"
              name="message"
              className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
              value={formData.message}
              onChange={handleChange}
              placeholder="Введите ваше сообщение"
              rows="5"
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <div className="form-error">{errors.message}</div>}
          </div>
          
          <div className="form-actions">
            <PremiumButton 
              type="submit"
              variant="gradient"
              disabled={isSubmitting}
              icon={<Send size={16} />}
              iconPosition="right"
              fullWidth
            >
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </PremiumButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;