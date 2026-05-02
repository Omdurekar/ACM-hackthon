"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "completed";
  complexity: "low" | "medium" | "high";
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glass-panel p-4 flex items-center gap-4 cursor-pointer transition-colors duration-300",
        task.status === "completed" ? "opacity-60" : "opacity-100"
      )}
      onClick={() => onToggle(task.id)}
    >
      <button className="text-current opacity-70 hover:opacity-100 transition-opacity">
        {task.status === "completed" ? (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>
      <div className="flex-1">
        <h3
          className={cn(
            "text-lg font-medium transition-all duration-300",
            task.status === "completed" && "line-through"
          )}
        >
          {task.title}
        </h3>
        <span className="text-xs opacity-70 capitalize mt-1 inline-block">
          {task.complexity} complexity
        </span>
      </div>
    </motion.div>
  );
}
