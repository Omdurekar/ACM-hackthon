# FocusFlow
Intelligent Task Management meets the Pomodoro Technique.

FocusFlow is a premium productivity application designed for the modern developer. It does not just track time; it helps you plan and optimize your work using a smart priority engine and an elegant, Zen-minimalist interface.

---

## Key Features

- Intelligent Priority Engine: Automatically sorts your tasks based on Urgency (High > Medium > Low) and Complexity.
- Smart Pomodoro Timer: Elegant circular timer that transitions between Focus (Obsidian mode) and Rest (Amber mode).
- One-Click Presets: Instantly add common tasks like "Deep Learning" or "Advanced Maths" with pre-configured difficulty and urgency.
- Zen-Minimalist UI: High-performance Glassmorphism design built with Framer Motion for fluid transitions.
- Dynamic Re-scheduling: Add a new task anytime, and the system instantly re-calculates your daily plan.

---

## Tech Stack

### Frontend
- Framework: Next.js (React)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React

### Backend and Database
- Runtime: Node.js
- API Framework: Express.js
- Database: MongoDB
- ODM: Mongoose

---

## Setup Instructions

Follow these steps to get the project running locally:

### 1. Clone the Repository
git clone https://github.com/Omdurekar/ACM-hackthon.git
cd ACM-hackthon

### 2. Install Dependencies
You need to install packages in three locations:

# Root
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

### 3. Setup MongoDB
Ensure you have MongoDB installed and running on your machine at the default port:
mongodb://localhost:27017

### 4. Run the Project
You will need two terminal windows open:

Terminal 1 (Backend):
cd backend
node server.js

Terminal 2 (Frontend):
cd frontend
npm run dev

### 5. Open in Browser
Visit http://localhost:3000 to start focusing!

---

## Project Structure
- /frontend: Next.js application (App Router).
- /backend: Express.js server and API logic.
- /backend/models: Mongoose schemas for Tasks and Templates.
- /backend/controllers: Core logic for task prioritization and scheduling.

---

## Team Details
- Submission: PASC 12-Hour Hackathon (First-Year Edition)
- Team Members: tanishq kothari , om durekar , arjun nair , varad malpure
- Mentor: Akshita Nagurkar
