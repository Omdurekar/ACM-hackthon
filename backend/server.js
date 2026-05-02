require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedTemplates = require('./config/seedTemplates');

const taskRoutes = require('./routes/taskRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const planRoutes = require('./routes/planRoutes');
const templateRoutes = require('./routes/templateRoutes');
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
connectDB().then(() => {
  // Seed predefined templates after DB is connected
  seedTemplates();
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/daily-plan', planRoutes);
app.use('/api/task-templates', templateRoutes);
app.use('/api/auth', authRoutes);

// Add health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
