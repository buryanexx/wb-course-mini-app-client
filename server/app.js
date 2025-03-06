const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Настройка CORS - упростим для начала
app.use(cors({
  origin: '*', // Разрешаем всем
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Отключаем кэширование для всех маршрутов API
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('API для WB-курс Telegram Mini App работает!');
});

// Прямой доступ к модулям (для проверки)
const modules = require('./data/modules.json');
app.get('/direct-modules', (req, res) => {
  // Возвращаем сокращенную версию модулей
  const modulesList = modules.map(module => ({
    id: module.id,
    title: module.title,
    shortDescription: module.shortDescription,
    icon: module.icon
  }));
  
  res.status(200).json(modulesList);
});

// Добавьте это перед строкой app.use('/api/modules', moduleRoutes);
app.get('/api/modules-direct', (req, res) => {
  // Напрямую импортируем модули
  const modules = require('./data/modules.json');
  
  // Возвращаем сокращенную версию модулей
  const modulesList = modules.map(module => ({
    id: module.id,
    title: module.title,
    shortDescription: module.shortDescription,
    icon: module.icon
  }));
  
  // Возвращаем данные
  return res.status(200).json(modulesList);
});

// Стандартные routes
app.use('/api/modules', moduleRoutes);

app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;