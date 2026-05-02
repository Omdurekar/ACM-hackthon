const mongoose = require('mongoose');

const taskTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    type: {
      type: String,
      enum: ['normal', 'deep', 'deep work'],
      required: true,
    },
    sessions: {
      type: Number,
      required: true,
    },
    sessionDuration: {
      type: Number,
      required: true, // in minutes
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('TaskTemplate', taskTemplateSchema);
