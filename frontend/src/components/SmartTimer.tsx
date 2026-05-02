"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "@/context/SessionContext";
import { cn } from "@/lib/utils";

export function SmartTimer() {
  const { phase } = useSession();
  const duration = phase === "focus" ? 25 * 60 : 5 * 60; // 25 min or 5 min
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(phase === "focus" ? 25 * 60 : 5 * 60);
    setIsActive(false);
  }, [phase]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const radius = 120;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = ((duration - Math.max(timeLeft, 0)) / duration) * circumference;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center cursor-pointer" onClick={toggleTimer}>
        <svg
          width="320"
          height="320"
          className="transform -rotate-90 drop-shadow-xl"
        >
          {/* Background Track */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            stroke="var(--timer-track)"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-colors duration-700"
          />
          {/* Animated Progress */}
          <motion.circle
            cx="160"
            cy="160"
            r={radius}
            stroke="var(--timer-progress)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ ease: "linear", duration: 1 }}
            className="transition-colors duration-700"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            key={timeLeft}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold tracking-tighter"
          >
            {formatTime(timeLeft)}
          </motion.span>
          <span className="text-sm uppercase tracking-widest mt-2 opacity-70">
            {phase === "focus" ? "Deep Work" : "Rest Mode"}
          </span>
        </div>
      </div>
      <button
        onClick={toggleTimer}
        className="mt-8 px-8 py-3 rounded-full font-medium glass-panel transition-transform hover:scale-105 active:scale-95"
      >
        {isActive ? "Pause" : "Start"}
      </button>
    </div>
  );
}
