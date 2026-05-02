const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public (for now)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, difficulty, urgency, type, description, sessions, sessionDuration } = req.body;

    if (!title || !difficulty || !urgency) {
      return res.status(400).json({ error: 'Please add all required fields' });
    }

    const task = await Task.create({
      title,
      difficulty,
      urgency,
      type: type || 'normal',
      sessions,
      sessionDuration,
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
};
