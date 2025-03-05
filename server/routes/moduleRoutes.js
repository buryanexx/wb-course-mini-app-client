const express = require('express');
const router = express.Router();
const { 
  getModules, 
  getModuleById 
} = require('../controllers/moduleController');

// Получить все модули
router.get('/', getModules);

// Получить модуль по ID
router.get('/:id', getModuleById);

module.exports = router;