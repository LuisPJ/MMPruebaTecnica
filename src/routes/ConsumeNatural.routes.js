const express = require('express');
const router = express.Router();
const consumeNaturalController = require('../controllers/ConsumeNatural.controller');
const authMiddleware = require('../middleware/Auth');

router.post('/analyze', authMiddleware, consumeNaturalController.analyzeSentiment);

module.exports = router;