import React, { useState } from 'react';
import { submitFeedback } from '../utils/api';
import '../styles/FeedbackForm.css';

const FeedbackForm = ({ moduleId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    moduleId: moduleId || null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitFeedback(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        moduleId: moduleId || null
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Ошибка при отправке формы:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <h3>Обратная связь</h3>
      {submitStatus === 'success' && (
        <div className="success-message">
          Спасибо! Ваше сообщение успешно отправлено.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="error-message">
          Произошла ошибка при отправке. Пожалуйста, попробуйте позже.
        </div>
      )}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Сообщение*</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>
        </div>
        <button 
          className="submit-button"
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;