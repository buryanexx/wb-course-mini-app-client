const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Настройка CORS
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: ['https://wb-course-mini-app-client.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));
} else {
  app.use(cors());
}

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('API для WB-курс Telegram Mini App работает!');
});

// Прямой доступ к модулям (для проверки)
const modules = require('./data/modules.json');
app.get('/modules', (req, res) => {
  const modulesList = modules.map(module => ({
    id: module.id,
    title: module.title,
    shortDescription: module.shortDescription,
    icon: module.icon
  }));
  
  res.status(200).json(modulesList);
});

// Стандартные routes
app.use('/api/modules', moduleRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;