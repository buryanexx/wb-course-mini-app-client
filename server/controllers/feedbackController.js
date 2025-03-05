const fs = require('fs');
const path = require('path');

// @desc    Отправить обратную связь
// @route   POST /api/feedback
// @access  Public
const submitFeedback = (req, res) => {
  const { name, email, message, moduleId } = req.body;
  
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Пожалуйста, заполните все обязательные поля');
  }
  
  // В реальном приложении здесь был бы код для сохранения в БД
  // Для демонстрации просто возвращаем успешный ответ
  
  res.status(201).json({
    success: true,
    data: {
      name,
      email,
      message,
      moduleId: moduleId || null,
      date: new Date().toISOString()
    }
  });
};

module.exports = {
  submitFeedback
};