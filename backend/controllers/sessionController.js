const Session = require('../models/Session');
const Task = require('../models/Task');

// @desc    Start a session (focus or break)
// @route   POST /api/sessions
// @access  Public
const startSession = async (req, res) => {
  try {
    const { taskId, type, duration } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Session type is required' });
    }

    if (taskId) {
      const task = await Task.findOne({ _id: taskId, userId: req.user.id });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
    }

    const session = await Session.create({
      userId: req.user.id,
      taskId,
      type,
      status: 'in_progress',
      startTime: new Date(),
    });

    res.status(201).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Complete a session
// @route   PUT /api/sessions/:id/complete
// @access  Public
const completeSession = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, userId: req.user.id });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'in_progress') {
      return res.status(400).json({ error: 'Session is not in progress' });
    }

    const endTime = new Date();
    const durationInSeconds = Math.floor((endTime - session.startTime) / 1000);

    session.endTime = endTime;
    session.duration = durationInSeconds;
    session.status = 'completed';

    await session.save();

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Interrupt a session
// @route   PUT /api/sessions/:id/interrupt
// @access  Public
const interruptSession = async (req, res) => {
  try {
    const { interruptionReason } = req.body;
    const session = await Session.findOne({ _id: req.params.id, userId: req.user.id });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.status !== 'in_progress') {
      return res.status(400).json({ error: 'Session is not in progress' });
    }

    const endTime = new Date();
    const durationInSeconds = Math.floor((endTime - session.startTime) / 1000);

    session.endTime = endTime;
    session.duration = durationInSeconds;
    session.status = 'interrupted';
    session.interruptionReason = interruptionReason;

    await session.save();

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Get session summary
// @route   GET /api/sessions/summary
// @access  Public
const getSessionSummary = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });

    let totalCompleted = 0;
    let totalInterrupted = 0;
    let totalTimeSpent = 0;

    sessions.forEach(session => {
      if (session.status === 'completed') {
        totalCompleted++;
        totalTimeSpent += session.duration;
      } else if (session.status === 'interrupted') {
        totalInterrupted++;
        totalTimeSpent += session.duration;
      }
    });

    res.status(200).json({
      summary: {
        totalSessionsCompleted: totalCompleted,
        totalTimeSpent, // in seconds
        interruptionsCount: totalInterrupted,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  startSession,
  completeSession,
  interruptSession,
  getSessionSummary,
};
