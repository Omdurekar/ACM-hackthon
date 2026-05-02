const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: false, // Breaks might not be associated with a specific task
    },
    userId: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      enum: ['focus', 'break'],
      required: [true, 'Session type is required'],
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'interrupted'],
      default: 'in_progress',
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    duration: {
      type: Number, // Stored in seconds
      default: 0,
    },
    interruptionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Session', sessionSchema);
