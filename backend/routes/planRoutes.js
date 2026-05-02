const express = require('express');
const router = express.Router();
const { getDailyPlan } = require('../controllers/planController');

// In a full app, this would likely be /api/daily-plan
// But since we register this under /api, we can just use /daily-plan
router.route('/').get(getDailyPlan);

module.exports = router;
