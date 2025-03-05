const modules = require('../data/modules.json');

// @desc    Получить все модули
// @route   GET /api/modules
// @access  Public
const getModules = (req, res) => {
  // Возвращаем сокращенную версию модулей (без детального описания)
  const modulesList = modules.map(module => ({
    id: module.id,
    title: module.title,
    shortDescription: module.shortDescription,
    icon: module.icon
  }));
  
  res.status(200).json(modulesList);
};

// @desc    Получить модуль по ID
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = (req, res) => {
  const module = modules.find(m => m.id === parseInt(req.params.id));
  
  if (!module) {
    res.status(404);
    throw new Error('Модуль не найден');
  }
  
  res.status(200).json(module);
};

module.exports = {
  getModules,
  getModuleById
};