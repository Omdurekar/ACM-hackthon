const express = require('express');
const router = express.Router();
const { getDailyPlan } = require('../controllers/planController');

const { protect } = require('../middleware/authMiddleware');

// In a full app, this would likely be /api/daily-plan
// But since we register this under /api, we can just use /daily-plan
router.route('/').get(protect, getDailyPlan);

module.exports = router;
