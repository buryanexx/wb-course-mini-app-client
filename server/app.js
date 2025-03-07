const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const moduleRoutes = require('./routes/moduleRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cors());
app.use(express.json());

// Данные для API
const modules = [
  {
    id: 1,
    title: 'Введение в Wildberries',
    description: 'Основы работы с маркетплейсом Wildberries',
    image: '/images/module1.jpg',
    lessonsCount: 5,
    progress: 0,
    duration: '2 часа'
  },
  {
    id: 2,
    title: 'Поиск и анализ товаров',
    description: 'Как найти прибыльную нишу и товары для продажи',
    image: '/images/module2.jpg',
    lessonsCount: 7,
    progress: 0,
    duration: '3 часа'
  },
  {
    id: 3,
    title: 'Работа с поставщиками',
    description: 'Поиск надежных поставщиков и ведение переговоров',
    image: '/images/module3.jpg',
    lessonsCount: 6,
    progress: 0,
    duration: '2.5 часа'
  },
  {
    id: 4,
    title: 'Создание карточек товаров',
    description: 'Оптимизация карточек для максимальных продаж',
    image: '/images/module4.jpg',
    lessonsCount: 8,
    progress: 0,
    duration: '4 часа'
  }
];

// API Routes
app.get('/api/modules', (req, res) => {
  res.json(modules);
});

app.get('/api/modules/:id', (req, res) => {
  const moduleId = parseInt(req.params.id);
  const module = modules.find(m => m.id === moduleId);
  
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  
  res.json(module);
});

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('API для WB-курс Telegram Mini App работает!');
});

// Прямой доступ к модулям (для проверки)
app.get('/direct-modules', (req, res) => {
  // Возвращаем сокращенную версию модулей
  const modulesList = modules.map(module => ({
    id: module.id,
    title: module.title,
    shortDescription: module.description,
    icon: module.image
  }));
  
  res.status(200).json(modulesList);
});

// Добавьте это перед строкой app.use('/api/modules', moduleRoutes);
app.get('/api/modules-direct', (req, res) => {
  // Устанавливаем заголовки
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json');
  
  // Напрямую импортируем модули
  const modules = require('./data/modules.json');
  
  // Возвращаем данные
  return res.status(200).json(modules);
});

// Стандартные routes
app.use('/api/modules', moduleRoutes);

app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;