const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');

// Отправка обратной связи
router.post('/', submitFeedback);

module.exports = router;