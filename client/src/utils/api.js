// Реэкспортируем функции из api.js для обратной совместимости
import { getModules, getModuleById, submitFeedback } from '../api/api';

export {
  getModules,
  getModuleById,
  submitFeedback
};