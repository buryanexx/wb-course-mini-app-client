// Реэкспортируем функции из api.js для обратной совместимости
// import { getModules, getModuleById, submitFeedback } from '../api/api';
import axios from 'axios';
import { modules } from '../data/mockData';

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

// Имитация задержки сетевого запроса
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Функции для работы с API

/**
 * Получение списка всех модулей
 * @returns {Promise<Array>} Массив модулей
 */
export const fetchModules = async () => {
  try {
    // Имитация задержки сетевого запроса
    await delay(800);
    
    // Возвращаем копию данных, чтобы избежать мутаций
    return JSON.parse(JSON.stringify(modules));
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
    await delay(600);
    
    const module = modules.find(m => m.id === parseInt(moduleId));
    
    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }
    
    return JSON.parse(JSON.stringify(module));
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
    await delay(500);
    
    const module = modules.find(m => m.id === parseInt(moduleId));
    
    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }
    
    return JSON.parse(JSON.stringify(module.lessons));
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
    await delay(400);
    
    const module = modules.find(m => m.id === parseInt(moduleId));
    
    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }
    
    const lesson = module.lessons.find(l => l.id === parseInt(lessonId));
    
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found in module ${moduleId}`);
    }
    
    return JSON.parse(JSON.stringify(lesson));
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
    await delay(300);
    
    // Находим модуль и урок в мок-данных
    const moduleIndex = modules.findIndex(m => m.id === parseInt(moduleId));
    
    if (moduleIndex === -1) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }
    
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === parseInt(lessonId));
    
    if (lessonIndex === -1) {
      throw new Error(`Lesson with ID ${lessonId} not found in module ${moduleId}`);
    }
    
    // Отмечаем урок как просмотренный
    modules[moduleIndex].lessons[lessonIndex].isCompleted = true;
    
    // Обновляем прогресс модуля
    const completedLessons = modules[moduleIndex].lessons.filter(l => l.isCompleted).length;
    const totalLessons = modules[moduleIndex].lessons.length;
    modules[moduleIndex].progress = Math.round((completedLessons / totalLessons) * 100);
    
    return {
      success: true,
      message: 'Урок успешно отмечен как просмотренный',
      lesson: JSON.parse(JSON.stringify(modules[moduleIndex].lessons[lessonIndex]))
    };
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

/**
 * Получение списка всех категорий знаний
 * @returns {Promise<Array>} Массив категорий
 */
export const fetchKnowledgeCategories = async () => {
  try {
    // Имитация задержки сетевого запроса
    await delay(600);
    
    // Возвращаем категории знаний
    return [
      {
        id: 1,
        title: "Базовый уровень",
        description: "Для новичков на Wildberries",
        icon: "book-open",
        color: "#4CAF50"
      },
      {
        id: 2,
        title: "Продвинутый уровень",
        description: "Для действующих продавцов",
        icon: "trending-up",
        color: "#2196F3"
      },
      {
        id: 3,
        title: "Экспертный уровень",
        description: "Фокус на рекламных инструментах",
        icon: "award",
        color: "#9C27B0"
      }
    ];
  } catch (error) {
    console.error('Error fetching knowledge categories:', error);
    throw error;
  }
};

/**
 * Получение статей для определенной категории
 * @param {number} categoryId ID категории
 * @returns {Promise<Array>} Массив статей
 */
export const fetchArticlesByCategory = async (categoryId) => {
  try {
    await delay(700);
    
    // Здесь будет запрос к API
    // Пока возвращаем моковые данные
    const allArticles = {
      1: [
        {
          id: 101,
          title: "Регистрация на Wildberries",
          description: "Пошаговая инструкция по регистрации на маркетплейсе",
          readTime: "5 мин",
          isPremium: false,
          tags: ["регистрация", "начало работы"]
        },
        // ... другие статьи базового уровня
      ],
      2: [
        {
          id: 201,
          title: "Оптимизация карточек товаров",
          description: "Как улучшить видимость ваших товаров в поиске",
          readTime: "12 мин",
          isPremium: false,
          tags: ["оптимизация", "SEO", "карточки товаров"]
        },
        // ... другие статьи продвинутого уровня
      ],
      3: [
        {
          id: 301,
          title: "Стратегии рекламных кампаний",
          description: "Эффективные стратегии для разных типов товаров",
          readTime: "15 мин",
          isPremium: true,
          tags: ["реклама", "стратегия", "бюджет"]
        },
        // ... другие статьи экспертного уровня
      ]
    };
    
    return allArticles[categoryId] || [];
  } catch (error) {
    console.error(`Error fetching articles for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Получение статьи по ID
 * @param {number} articleId ID статьи
 * @returns {Promise<Object>} Объект статьи
 */
export const fetchArticleById = async (articleId) => {
  try {
    await delay(800);
    
    // Здесь будет запрос к API
    // Пока возвращаем моковые данные
    const mockArticle = {
      id: articleId,
      title: "Стратегии рекламных кампаний на Wildberries",
      description: "Эффективные стратегии для разных типов товаров",
      content: "Полное содержание статьи...",
      readTime: "15 мин",
      isPremium: articleId > 300,
      tags: ["реклама", "стратегия", "бюджет"],
      date: "2023-05-15T10:30:00.000Z",
      author: "Эксперт WB"
    };
    
    return mockArticle;
  } catch (error) {
    console.error(`Error fetching article with ID ${articleId}:`, error);
    throw error;
  }
};

/**
 * Отметка статьи как прочитанной
 * @param {number} articleId ID статьи
 * @returns {Promise<Object>} Результат операции
 */
export const markArticleAsRead = async (articleId) => {
  try {
    await delay(300);
    
    // Здесь будет запрос к API
    // Пока возвращаем успешный результат
    return {
      success: true,
      message: 'Статья отмечена как прочитанная'
    };
  } catch (error) {
    console.error(`Error marking article ${articleId} as read:`, error);
    throw error;
  }
};

// Алиасы для обратной совместимости
export const getModules = fetchModules;
export const getModuleById = fetchModuleById;
export const getModule = fetchModuleById;
export const getLesson = fetchLessonById;
export const getLessons = fetchLessons;
export { sendFeedback as submitFeedback };

export default {
  fetchModules,
  fetchModuleById,
  fetchLessons,
  fetchLessonById,
  markLessonAsViewed,
  getModules,
  getModuleById,
  getModule,
  getLesson,
  getLessons
};