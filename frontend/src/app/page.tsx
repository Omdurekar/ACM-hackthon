"use client";

import React, { useState, useEffect } from "react";
import { SmartTimer } from "@/components/SmartTimer";
import { TaskCard, type Task } from "@/components/TaskCard";
import { AddTask } from "@/components/AddTask";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useSession } from "@/context/SessionContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PlayCircle, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { phase, togglePhase, isLoggedIn, setIsLoggedIn } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [dateStr, setDateStr] = useState("");

  const fetchTasks = async (recreate = false) => {
    try {
      const url = recreate 
        ? "http://localhost:5000/api/daily-plan?recreate=true" 
        : "http://localhost:5000/api/daily-plan";
        
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.plan && data.plan.tasks) {
        // Map the generated DailyPlan tasks (which are sorted by urgency)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedTasks = data.plan.tasks.map((pt: any) => ({
          id: pt.taskId._id,
          title: pt.taskId.title,
          complexity: pt.taskId.difficulty,
          status: pt.taskId.status === "pending" ? "todo" : pt.taskId.status,
          sessions: pt.assignedSessions
        }));
        setTasks(formattedTasks);
        if (formattedTasks.length > 0) setHasGenerated(true);
      } else if (data.message === 'No pending tasks to plan' || !data.plan) {
        // Fallback to fetch raw tasks if no plan can be generated (e.g. all completed)
        const rawRes = await fetch("http://localhost:5000/api/tasks");
        const rawData = await rawRes.json();
        if (rawData.tasks) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedTasks = rawData.tasks.map((t: any) => ({
            id: t._id,
            title: t.title,
            complexity: t.difficulty,
            status: t.status === "pending" ? "todo" : t.status
          }));
          setTasks(formattedTasks);
        }
      }
    } catch {
      // Backend may be offline — degrade gracefully
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
      fetchTasks();
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const d = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
  }, []);

  if (!isLoggedIn) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGenerate = async (newTaskData: any) => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskData)
      });
      if (res.ok) {
        // Recreate the plan immediately so the new task gets sorted!
        fetchTasks(true);
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: newStatus === "pending" ? "todo" : "completed" }
          : t
      )
    );

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        fetchTasks(); // Revert on failure
      }
    } catch (err) {
      console.error("Error updating task:", err);
      fetchTasks(); // Revert on failure
    }
  };

  const handleGenerateDailyPlan = async () => {
    await fetchTasks(true);
  };

  return (
    <main className="flex-1 container mx-auto px-6 py-12 max-w-6xl flex flex-col gap-10 min-h-screen">
      
      {/* 1 & 2. Header & Quick Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-4">
          <ProfileMenu />
          <div>
            <h1 className="text-3xl font-bold tracking-tight opacity-90">Good afternoon</h1>
            <p className="text-sm opacity-60 mt-1">
              {dateStr || "Loading date..."}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
          <div className="glass-panel px-5 py-3 min-w-[130px]">
            <div className="text-xs opacity-60 uppercase tracking-wider">Tasks</div>
            <div className="text-xl font-semibold mt-1">{tasks.length}</div>
          </div>
          <div className="glass-panel px-5 py-3 min-w-[130px]">
            <div className="text-xs opacity-60 uppercase tracking-wider">Completed</div>
            <div className="text-xl font-semibold mt-1">{tasks.filter(t => t.status === "completed").length}</div>
          </div>
          <div className="glass-panel px-5 py-3 min-w-[130px]">
            <div className="text-xs opacity-60 uppercase tracking-wider">Streak</div>
            <div className="text-xl font-semibold mt-1">1 days</div>
          </div>
        </div>
      </div>

      {/* 5. Resume Session Banner */}
      {hasGenerated && tasks.length > 0 && tasks.some(t => t.status !== "completed") && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--timer-progress)]/10 border border-[var(--timer-progress)]/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-[var(--timer-progress)]">
            <PlayCircle className="w-5 h-5" />
            <span className="font-medium">Up Next: {tasks.find(t => t.status !== "completed")?.title}</span>
          </div>
          <button className="px-6 py-2 bg-[var(--timer-progress)] text-white text-sm rounded-lg font-medium shadow transition-transform hover:scale-105 active:scale-95">
            Focus Now
          </button>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-12 items-start flex-1">
        
        {/* Left Panel: 3. Add Task & 4. Today's Plan */}
        <div className="w-full md:w-5/12 flex flex-col gap-8">
          <AddTask onGenerate={handleGenerate} />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold opacity-90">Today&apos;s Plan</h2>
              <button onClick={handleGenerateDailyPlan} className="text-xs opacity-60 hover:opacity-100 underline decoration-dotted">Re-Schedule</button>
            </div>
            {!hasGenerated || tasks.length === 0 ? (
              <div className="glass-panel p-8 text-center flex flex-col items-center gap-3">
                <div className="opacity-50">No plan for today</div>
                <button 
                  onClick={() => document.querySelector('input')?.focus()}
                  className="text-sm text-[var(--timer-progress)] underline decoration-dotted opacity-80 hover:opacity-100 transition-opacity"
                >
                  Add a Task
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Panel: The Timer */}
        <div className="w-full md:w-4/12 flex flex-col items-center justify-center relative">
          <SmartTimer />
          <button
            onClick={togglePhase}
            className="mt-8 text-sm opacity-60 hover:opacity-100 transition-opacity underline decoration-dotted"
          >
            Switch to {phase === "focus" ? "Break" : "Focus"} Mode
          </button>
        </div>

        {/* Right Panel: Intelligent Suggestions */}
        <div className="w-full md:w-3/12 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {phase === "rest" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-panel p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400 font-medium">
                  <Sparkles className="w-5 h-5" />
                  <h2>AI Suggestions</h2>
                </div>
                <p className="text-sm opacity-80 leading-relaxed">
                  Based on your last deep work session, we recommend tackling the most complex task next.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 6. Footer Insight */}
      <div className="mt-auto pt-6 flex justify-center pb-4">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span className="opacity-80">Complete tasks early for better consistency</span>
        </motion.div>
      </div>

    </main>
  );
}