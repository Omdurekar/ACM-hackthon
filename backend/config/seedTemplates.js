const TaskTemplate = require('../models/TaskTemplate');

const predefinedTemplates = [
  {
    name: "Study",
    difficulty: "medium",
    type: "normal",
    sessions: 3,
    sessionDuration: 25
  },
  {
    name: "Revision",
    difficulty: "easy",
    type: "normal",
    sessions: 2,
    sessionDuration: 25
  },
  {
    name: "Work",
    difficulty: "medium",
    type: "deep",
    sessions: 3,
    sessionDuration: 30
  },
  {
    name: "Advanced Maths",
    difficulty: "hard",
    type: "deep",
    sessions: 5,
    sessionDuration: 35
  },
  {
    name: "Deep Learning",
    difficulty: "hard",
    type: "deep",
    sessions: 5,
    sessionDuration: 40
  }
];

const seedTemplates = async () => {
  try {
    const count = await TaskTemplate.countDocuments();
    if (count === 0) {
      console.log('Seeding predefined task templates...');
      await TaskTemplate.insertMany(predefinedTemplates);
      console.log('Task templates seeded successfully.');
    } else {
      console.log('Task templates already exist. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding templates:', error);
  }
};

module.exports = seedTemplates;
