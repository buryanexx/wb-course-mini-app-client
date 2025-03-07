// Реэкспортируем функции из api.js для обратной совместимости
// import { getModules, getModuleById, submitFeedback } from '../api/api';
import axios from 'axios';
import { modules } from '../data/mockData';
import { showTelegramPopup, isRunningInTelegram } from './telegram';

// Базовый URL API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://wb-reshenie-api.vercel.app/api';

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
 * Отметка урока как просмотренного
 * @param {number|string} moduleId ID модуля
 * @param {number|string} lessonId ID урока
 * @returns {Promise<Object>} Результат операции
 */
export const markLessonAsViewed = async (moduleId, lessonId) => {
  try {
    await delay(300);
    
    // Здесь будет запрос к API
    // Пока возвращаем успешный результат
    return {
      success: true,
      message: 'Урок отмечен как просмотренный'
    };
  } catch (error) {
    console.error(`Error marking lesson ${lessonId} as viewed:`, error);
    throw error;
  }
};

/**
 * Завершение урока и отправка прогресса
 * @param {number|string} moduleId ID модуля
 * @param {number|string} lessonId ID урока
 * @returns {Promise<Object>} Результат операции
 */
export const completeLesson = async (moduleId, lessonId) => {
  try {
    await delay(300);
    
    // Здесь будет запрос к API
    // Пока возвращаем успешный результат
    return {
      success: true,
      message: 'Урок успешно завершен',
      progress: 0.25 // Прогресс по модулю (от 0 до 1)
    };
  } catch (error) {
    console.error(`Error completing lesson ${lessonId}:`, error);
    throw error;
  }
};

/**
 * Отправка обратной связи
 * @param {Object} feedback Данные обратной связи
 * @returns {Promise<Object>} Результат операции
 */
export const sendFeedback = async (feedback) => {
  try {
    await delay(500);
    
    // Здесь будет запрос к API
    console.log('Sending feedback:', feedback);
    
    // Пока возвращаем успешный результат
    return {
      success: true,
      message: 'Спасибо за ваш отзыв!'
    };
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
};

/**
 * Получение категорий базы знаний
 * @returns {Promise<Array>} Массив категорий
 */
export const getKnowledgeCategories = async () => {
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
export const getCategoryArticles = async (categoryId) => {
  try {
    await delay(600);
    
    // Здесь будет запрос к API
    // Пока возвращаем моковые данные
    const allArticles = {
      1: [
        {
          id: 101,
          title: "Как начать продавать на Wildberries",
          description: "Пошаговая инструкция для новичков",
          readTime: "10 мин",
          isPremium: false,
          tags: ["начало работы", "регистрация"]
        },
        {
          id: 102,
          title: "Подготовка документов для Wildberries",
          description: "Какие документы нужны для работы с маркетплейсом",
          readTime: "7 мин",
          isPremium: false,
          tags: ["документы", "регистрация"]
        },
        {
          id: 103,
          title: "Первые шаги после регистрации",
          description: "Что делать после успешной регистрации на Wildberries",
          readTime: "12 мин",
          isPremium: false,
          tags: ["начало работы"]
        }
      ],
      2: [
        {
          id: 201,
          title: "Оптимизация карточек товаров",
          description: "Как улучшить видимость ваших товаров в поиске",
          readTime: "15 мин",
          isPremium: false,
          tags: ["оптимизация", "SEO"]
        },
        {
          id: 202,
          title: "Работа с отзывами и рейтингом",
          description: "Стратегии управления репутацией на Wildberries",
          readTime: "8 мин",
          isPremium: false,
          tags: ["отзывы", "рейтинг"]
        },
        {
          id: 203,
          title: "Анализ конкурентов на Wildberries",
          description: "Как изучать конкурентов и использовать эту информацию",
          readTime: "20 мин",
          isPremium: true,
          tags: ["конкуренты", "аналитика"]
        }
      ],
      3: [
        {
          id: 301,
          title: "Продвижение с помощью рекламы на Wildberries",
          description: "Все виды рекламы на маркетплейсе и их эффективность",
          readTime: "25 мин",
          isPremium: true,
          tags: ["реклама", "продвижение"]
        },
        {
          id: 302,
          title: "Стратегии ценообразования",
          description: "Как правильно устанавливать цены для максимальной прибыли",
          readTime: "18 мин",
          isPremium: true,
          tags: ["цены", "стратегия"]
        },
        {
          id: 303,
          title: "Масштабирование бизнеса на Wildberries",
          description: "Как расширить ассортимент и увеличить продажи",
          readTime: "22 мин",
          isPremium: true,
          tags: ["масштабирование", "рост"]
        }
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
 * @param {number} categoryId ID категории
 * @param {number} articleId ID статьи
 * @returns {Promise<Object>} Объект статьи
 */
export const getArticle = async (categoryId, articleId) => {
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
      isPremium: parseInt(articleId) > 300,
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
  getLessons,
  getKnowledgeCategories,
  getCategoryArticles,
  getArticle
};