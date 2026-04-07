const express = require('express');
const router = express.Router();
const { startSession, saveResults, getHistory, getProgress } = require('../controllers/exerciseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, startSession);
router.post('/save', protect, saveResults);
router.get('/history', protect, getHistory);
router.get('/progress', protect, getProgress);

module.exports = router;
