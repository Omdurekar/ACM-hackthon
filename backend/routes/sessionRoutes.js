const express = require('express');
const router = express.Router();
const {
  startSession,
  completeSession,
  interruptSession,
  getSessionSummary,
  endEarlySession,
} = require('../controllers/sessionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, startSession);
router.route('/summary').get(protect, getSessionSummary);
router.route('/end-early').post(protect, endEarlySession);
router.route('/:id/complete').put(protect, completeSession);
router.route('/:id/interrupt').put(protect, interruptSession);

module.exports = router;