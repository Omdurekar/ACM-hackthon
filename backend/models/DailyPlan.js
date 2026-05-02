const mongoose = require('mongoose');

const dailyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tasks: [
      {
        taskId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
        assignedSessions: {
          type: Number,
          default: 1,
        },
      },
    ],
    executionSequence: [
      {
        type: {
          type: String,
          enum: ['focus', 'break'],
        },
        taskId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DailyPlan', dailyPlanSchema);
