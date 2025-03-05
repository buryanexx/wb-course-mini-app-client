const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/modules', moduleRoutes);
app.use('/api/feedback', feedbackRoutes);

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('API для WB-курс Telegram Mini App работает!');
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;