const express = require('express');
const router = express.Router();
const { getSummary, getReport } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.get('/summary', protect, getSummary);
router.get('/report', protect, getReport);

module.exports = router;
