const express = require('express');
const router = express.Router();
const { getTaskTemplates } = require('../controllers/templateController');

router.route('/').get(getTaskTemplates);

module.exports = router;
