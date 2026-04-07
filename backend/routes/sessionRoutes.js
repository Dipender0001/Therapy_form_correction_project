const express = require('express');
const router = express.Router();
const { startSession, analyzeFrame, endSession, getHistory, getSessionById } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, startSession);
router.post('/analyze-frame', protect, analyzeFrame);
router.post('/end', protect, endSession);
router.get('/history', protect, getHistory);
router.get('/:id', protect, getSessionById);

module.exports = router;
