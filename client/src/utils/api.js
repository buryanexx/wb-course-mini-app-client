// Реэкспортируем функции из api.js для обратной совместимости
import { getModules, getModuleById, submitFeedback } from '../api/api';
import axios from 'axios';

// Базовый URL API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Создание экземпляра axios с базовым URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик для добавления Telegram данных в запросы
api.interceptors.request.use(config => {
  // Получение данных из Telegram WebApp
  if (window.Telegram && window.Telegram.WebApp) {
    const initData = window.Telegram.WebApp.initData;
    if (initData) {
      config.headers['X-Telegram-Init-Data'] = initData;
    }
  }
  return config;
});

// Функции для работы с API

/**
 * Получение списка всех модулей
 * @returns {Promise<Array>} Массив модулей
 */
export const fetchModules = async () => {
  try {
    const response = await api.get('/modules');
    return response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};

/**
 * Получение информации о конкретном модуле
 * @param {number|string} moduleId ID модуля
 * @returns {Promise<Object>} Данные модуля
 */
export const fetchModuleById = async (moduleId) => {
  try {
    const response = await api.get(`/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching module ${moduleId}:`, error);
    throw error;
  }
};

/**
 * Получение списка уроков для модуля
 * @param {number|string} moduleId ID модуля
 * @returns {Promise<Array>} Массив уроков
 */
export const fetchLessons = async (moduleId) => {
  try {
    const response = await api.get(`/modules/${moduleId}/lessons`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lessons for module ${moduleId}:`, error);
    throw error;
  }
};

/**
 * Получение информации о конкретном уроке
 * @param {number|string} moduleId ID модуля
 * @param {number|string} lessonId ID урока
 * @returns {Promise<Object>} Данные урока
 */
export const fetchLessonById = async (moduleId, lessonId) => {
  try {
    const response = await api.get(`/modules/${moduleId}/lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId} from module ${moduleId}:`, error);
    throw error;
  }
};

/**
 * Отправка обратной связи
 * @param {Object} feedbackData Данные обратной связи
 * @returns {Promise<Object>} Результат отправки
 */
export const sendFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
};

/**
 * Отметка урока как просмотренного
 * @param {number|string} moduleId ID модуля
 * @param {number|string} lessonId ID урока
 * @returns {Promise<Object>} Результат операции
 */
export const markLessonAsViewed = async (moduleId, lessonId) => {
  try {
    const response = await api.post(`/modules/${moduleId}/lessons/${lessonId}/view`);
    return response.data;
  } catch (error) {
    console.error(`Error marking lesson ${lessonId} as viewed:`, error);
    throw error;
  }
};

/**
 * Завершение урока
 * @param {number|string} moduleId ID модуля
 * @param {number|string} lessonId ID урока
 * @returns {Promise<Object>} Результат операции
 */
export const completeLesson = async (moduleId, lessonId) => {
  try {
    const response = await api.post(`/modules/${moduleId}/lessons/${lessonId}/complete`);
    return response.data;
  } catch (error) {
    console.error(`Error completing lesson ${lessonId}:`, error);
    throw error;
  }
};

// Алиасы для обратной совместимости
export { fetchModules as getModules };
export { fetchModuleById as getModuleById };
export { fetchModuleById as getModule };
export { fetchLessonById as getLesson };
export { fetchLessons as getLessons };
export { sendFeedback as submitFeedback };

export default api;