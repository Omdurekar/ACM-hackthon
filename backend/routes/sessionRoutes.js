const express = require('express');
const router = express.Router();
const {
  startSession,
  completeSession,
  interruptSession,
  getSessionSummary,
} = require('../controllers/sessionController');

router.route('/').post(startSession);
router.route('/summary').get(getSessionSummary);
router.route('/:id/complete').put(completeSession);
router.route('/:id/interrupt').put(interruptSession);

module.exports = router;
