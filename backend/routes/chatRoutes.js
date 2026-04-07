const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');

// Route to handle chat messages
// POST /api/chat/message
router.post('/message', handleChat);

module.exports = router;
