"use client";

import React, { useState } from "react";
import { SmartTimer } from "@/components/SmartTimer";
import { TaskCard, type Task } from "@/components/TaskCard";
import { useSession } from "@/context/SessionContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, LayoutDashboard } from "lucide-react";

export default function HomePage() {
  const { phase, togglePhase } = useSession();
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete Architecture Setup", status: "todo", complexity: "high" },
    { id: "2", title: "Implement Glassmorphism", status: "in_progress", complexity: "medium" },
    { id: "3", title: "Review Shared Contract", status: "todo", complexity: "low" },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "todo" : "completed" }
          : t
      )
    );
  };

  return (
    <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl flex flex-col md:flex-row gap-12 items-start justify-center min-h-screen">
      
      {/* Left Panel: Tasks & Intelligent Suggestions */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {phase === "rest" && (
            <motion.div
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              className="glass-panel p-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400 font-medium">
                <Sparkles className="w-5 h-5" />
                <h2>AI Suggestions</h2>
              </div>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Based on your last deep work session, we recommend tackling the <strong>"Complete Architecture Setup"</strong> next, as it aligns with your peak focus hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold opacity-90 flex items-center justify-between">
            Up Next
            <span className="text-sm font-normal opacity-60">
              {tasks.filter(t => t.status !== "completed").length} pending
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel: The Timer */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center mt-12 md:mt-0">
        <SmartTimer />
        <button
          onClick={togglePhase}
          className="mt-12 text-sm opacity-60 hover:opacity-100 transition-opacity underline decoration-dotted"
        >
          Switch to {phase === "focus" ? "Break" : "Focus"} Mode
        </button>
      </div>

      {/* Right Panel: Dashboard / Stats */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-6">
            <LayoutDashboard className="w-5 h-5 opacity-70" />
            <h2 className="text-lg font-medium opacity-90">Daily Evaluation</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 opacity-80">
                <span>Focus Distribution</span>
                <span>75%</span>
              </div>
              <div className="h-2 w-full bg-[var(--timer-track)] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  className="h-full bg-[var(--timer-progress)]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--glass-border)]">
              <div>
                <div className="text-3xl font-bold">4</div>
                <div className="text-xs opacity-70 mt-1">Sessions Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1<span className="text-xl">h</span> 40<span className="text-xl">m</span></div>
                <div className="text-xs opacity-70 mt-1">Deep Work Logged</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
