"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export function AddTask({ onGenerate }: { onGenerate: (task: any) => void }) {
  const [title, setTitle] = useState("");
  const [preset, setPreset] = useState("Work");
  const [difficulty, setDifficulty] = useState("medium");

  const handleGenerate = () => {
    if (!title.trim()) return;
    onGenerate({
      id: Date.now().toString(),
      title: `${preset}: ${title}`,
      complexity: difficulty,
      status: "todo"
    });
    setTitle("");
  };

  return (
    <div className="glass-panel p-6 flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full bg-transparent border-b border-[var(--glass-border)] pb-2 outline-none text-lg placeholder:opacity-40 focus:border-[var(--timer-progress)] transition-colors"
      />
      
      <div className="flex gap-2 text-xs">
        {["Study", "Work", "Revise"].map(p => (
          <button
            key={p}
            onClick={() => setPreset(p)}
            className={cn(
              "px-3 py-1 rounded-full border transition-colors",
              preset === p ? "border-[var(--timer-progress)] text-[var(--timer-progress)] bg-[var(--timer-progress)]/10" : "border-[var(--glass-border)] opacity-60 hover:opacity-100"
            )}
          >
            {p}
          </button>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2 text-xs">
          {["low", "medium", "high"].map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "px-3 py-1 rounded border transition-colors capitalize",
                difficulty === d ? "border-[var(--foreground)] text-[var(--foreground)] bg-[var(--foreground)]/10" : "border-[var(--glass-border)] opacity-40 hover:opacity-100"
              )}
            >
              {d}
            </button>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          className="flex items-center gap-2 bg-[var(--timer-progress)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Generate Plan
        </motion.button>
      </div>
    </div>
  );
}
