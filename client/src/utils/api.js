import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Получить все модули
export const getModules = async () => {
  try {
    const response = await axios.get(`${API_URL}/modules`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении модулей:', error);
    throw error;
  }
};

// Остальной код остается прежним

// Получить модуль по ID
export const getModuleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/modules/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении модуля с ID ${id}:`, error);
    throw error;
  }
};

// Отправить обратную связь
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке обратной связи:', error);
    throw error;
  }
};