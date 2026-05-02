const DailyPlan = require('../models/DailyPlan');
const Task = require('../models/Task');

// Helper to determine sessions based on difficulty
const getSessionsCount = (difficulty) => {
  switch (difficulty) {
    case 'hard': return 4;
    case 'medium': return 2;
    case 'easy': return 1;
    default: return 1;
  }
};

// Helper to calculate urgency score for sorting
const getUrgencyScore = (urgency) => {
  switch (urgency) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
};

// @desc    Generate or get daily plan
// @route   GET /api/daily-plan
// @access  Public
const getDailyPlan = async (req, res) => {
  try {
    // Determine start and end of current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if plan already exists for today
    let plan = await DailyPlan.findOne({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).populate('tasks.taskId').populate('executionSequence.taskId');

    if (plan) {
      if (req.query.recreate === 'true') {
        await DailyPlan.findByIdAndDelete(plan._id);
      } else {
        return res.status(200).json({ plan });
      }
    }

    // Generate new plan
    const pendingTasks = await Task.find({ userId: req.user.id, status: { $in: ['pending', 'in_progress'] } });

    if (!pendingTasks || pendingTasks.length === 0) {
      return res.status(200).json({ message: 'No pending tasks to plan' });
    }

    // Sort by urgency
    pendingTasks.sort((a, b) => getUrgencyScore(b.urgency) - getUrgencyScore(a.urgency));

    const planTasks = [];
    const executionSequence = [];

    pendingTasks.forEach(task => {
      // Use the task's custom sessions if defined, otherwise fallback to difficulty mapping
      const assignedSessions = task.sessions !== undefined && task.sessions !== null 
        ? task.sessions 
        : getSessionsCount(task.difficulty);
        
      planTasks.push({ taskId: task._id, assignedSessions });

      // Generate sequence for this task
      for (let i = 0; i < assignedSessions; i++) {
        executionSequence.push({ type: 'focus', taskId: task._id });
        
        // If it's deep work, we still schedule a break, but Flow Mode on frontend 
        // will allow skipping it by not initiating the break session.
        executionSequence.push({ type: 'break', taskId: task._id });
      }
    });

    const newPlan = await DailyPlan.create({
      userId: req.user.id,
      date: new Date(),
      tasks: planTasks,
      executionSequence,
    });

    // Populate the newly created plan
    const populatedPlan = await DailyPlan.findById(newPlan._id)
      .populate('tasks.taskId')
      .populate('executionSequence.taskId');

    res.status(201).json({ plan: populatedPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getDailyPlan,
};
