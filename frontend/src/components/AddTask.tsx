"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export function AddTask({ onGenerate }: { onGenerate: (task: any) => void }) {
  const [title, setTitle] = useState("");
  const [preset, setPreset] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [urgency, setUrgency] = useState("medium");
  const [templates, setTemplates] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/task-templates")
      .then((res) => res.json())
      .then((data) => {
        if (data.templates && data.templates.length > 0) {
          setTemplates(data.templates);
          // Auto-select the first template
          setPreset(data.templates[0].name);
          setDifficulty(data.templates[0].difficulty);
        }
      })
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const handleGenerate = () => {
    // If they typed something, use it. Otherwise, use the preset name!
    const finalTitle = title.trim() ? `${preset}: ${title.trim()}` : preset;

    if (!finalTitle) {
      setError("Please select a template or enter a task");
      return;
    }
    
    setError(""); // Clear error
    
    // Find the selected template to extract its properties
    const selectedTemplate = templates.find(t => t.name === preset);
    const isCustomDifficulty = selectedTemplate && difficulty !== selectedTemplate.difficulty;
    
    // We pass the raw data up to the parent component, 
    // which will format it for the backend API.
    onGenerate({
      title: finalTitle,
      difficulty: difficulty,
      urgency: urgency,
      type: selectedTemplate ? selectedTemplate.type : "normal",
      sessions: isCustomDifficulty ? undefined : (selectedTemplate ? selectedTemplate.sessions : undefined),
      sessionDuration: isCustomDifficulty ? undefined : (selectedTemplate ? selectedTemplate.sessionDuration : undefined)
    });
    setTitle("");
  };

  const handlePresetSelect = (templateName: string) => {
    setPreset(templateName);
    const selected = templates.find(t => t.name === templateName);
    if (selected) {
      setDifficulty(selected.difficulty);
      if (selected.urgency) setUrgency(selected.urgency);
      setError("");
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(""); // Clear error as user types
          }}
          placeholder="What needs to be done?"
          className="w-full bg-transparent border-b border-[var(--glass-border)] pb-2 outline-none text-lg placeholder:opacity-40 focus:border-[var(--timer-progress)] transition-colors"
        />
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
      
      <div className="flex flex-wrap gap-2 text-xs">
        {templates.length > 0 ? (
          templates.map((p) => (
            <button
              key={p.name}
              onClick={() => handlePresetSelect(p.name)}
              className={cn(
                "px-3 py-1 rounded-full border transition-colors",
                preset === p.name ? "border-[var(--timer-progress)] text-[var(--timer-progress)] bg-[var(--timer-progress)]/10" : "border-[var(--glass-border)] opacity-60 hover:opacity-100"
              )}
            >
              {p.name}
            </button>
          ))
        ) : (
          <span className="opacity-50">Loading templates...</span>
        )}
      </div>
      
      <div className="flex items-end justify-between mt-2">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 text-xs items-center">
            <span className="opacity-60 w-16">Difficulty:</span>
            {["easy", "medium", "hard"].map(d => (
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
          <div className="flex gap-2 text-xs items-center">
            <span className="opacity-60 w-16">Urgency:</span>
            {["low", "medium", "high"].map(u => (
              <button
                key={u}
                onClick={() => setUrgency(u)}
                className={cn(
                  "px-3 py-1 rounded border transition-colors capitalize",
                  urgency === u ? "border-[var(--timer-progress)] text-[var(--timer-progress)] bg-[var(--timer-progress)]/10" : "border-[var(--glass-border)] opacity-40 hover:opacity-100"
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          className="flex items-center gap-2 bg-[var(--timer-progress)] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </motion.button>
      </div>
    </div>
  );
}