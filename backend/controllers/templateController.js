const TaskTemplate = require('../models/TaskTemplate');

// @desc    Get all predefined task templates
// @route   GET /api/task-templates
// @access  Public
const getTaskTemplates = async (req, res) => {
  try {
    const templates = await TaskTemplate.find({});
    res.status(200).json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getTaskTemplates,
};
