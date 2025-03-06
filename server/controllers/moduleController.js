const modules = require('../data/modules.json');

// Вспомогательная функция для валидации ID
const isValidId = (id) => {
  return !isNaN(parseInt(id)) && parseInt(id) > 0 && parseInt(id) <= modules.length;
};

// @desc    Получить все модули
// @route   GET /api/modules
// @access  Public
const getModules = (req, res) => {
  try {
    // Возвращаем сокращенную версию модулей с иконками
    const modulesList = modules.map(module => ({
      id: module.id,
      title: module.title,
      shortDescription: module.shortDescription,
      icon: module.icon || '📊' // Добавляем дефолтную иконку, если отсутствует
    }));
    
    // Используем return для явного завершения функции
    return res.status(200).json(modulesList);
  } catch (error) {
    console.error('Ошибка при получении модулей:', error);
    return res.status(500).json({ message: 'Ошибка сервера при получении модулей' });
  }
};

// @desc    Получить модуль по ID
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = (req, res) => {
  try {
    const id = req.params.id;
    
    // Валидация ID
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Неверный ID модуля' });
    }
    
    const module = modules.find(m => m.id === parseInt(id));
    
    if (!module) {
      return res.status(404).json({ message: 'Модуль не найден' });
    }
    
    // Санитизация данных перед отправкой (пример)
    const sanitizedModule = {
      ...module,
      title: module.title.replace(/<[^>]*>?/gm, ''), // Удаляем HTML-теги
      description: module.description ? module.description.replace(/<[^>]*>?/gm, '') : '',
      shortDescription: module.shortDescription.replace(/<[^>]*>?/gm, '')
    };
    
    return res.status(200).json(sanitizedModule);
  } catch (error) {
    console.error(`Ошибка при получении модуля с ID ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Ошибка сервера при получении модуля' });
  }
};

module.exports = {
  getModules,
  getModuleById
};