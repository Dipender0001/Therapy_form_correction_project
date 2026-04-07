const express = require('express');
const router = express.Router();
const { analyzePose } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzePose);

module.exports = router;
