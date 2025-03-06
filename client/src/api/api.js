import axios from 'axios';

// Проверьте, что URL API настроен правильно
const API_URL = process.env.REACT_APP_API_URL || 'https://wb-course-mini-app-server.vercel.app/api';

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Функции для работы с API
export const getModules = async () => {
  try {
    const response = await apiClient.get('/modules');
    return response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};

export const getModuleById = async (id) => {
  try {
    const response = await apiClient.get(`/modules/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching module with id ${id}:`, error);
    throw error;
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export default {
  getModules,
  getModuleById,
  submitFeedback
}; 