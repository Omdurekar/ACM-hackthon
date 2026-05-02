const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false, // Optional for now until Auth is fully integrated
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: [true, 'Please specify task difficulty'],
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Please specify task urgency'],
    },
    type: {
      type: String,
      enum: ['normal', 'deep work'],
      default: 'normal',
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    sessions: {
      type: Number,
      required: false,
    },
    sessionDuration: {
      type: Number,
      required: false, // in minutes
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
