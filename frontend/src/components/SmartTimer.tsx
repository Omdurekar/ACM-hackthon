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
  const [isEndedEarly, setIsEndedEarly] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(phase === "focus" ? 25 * 60 : 5 * 60);
    setIsActive(false);
    setIsEndedEarly(false);
  }, [phase]);

  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActive(false);
    }
    return () => {
      if (interval !== null) window.clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (!isEndedEarly) {
      setIsActive(!isActive);
    }
  };

  const handleEndEarly = async () => {
    if (isEndedEarly) return;

    setIsActive(false);
    setIsEndedEarly(true);

    const elapsedTime = duration - timeLeft;

    try {
      // Sending the duration to the new backend route
      await fetch(`http://localhost:5000/api/sessions/end-early`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration: elapsedTime,
          phase,
          timestamp: new Date().toISOString()
        })
      });
    } catch {
      // Ignore errors for now
    }

    // Reset timer to allow starting a new session
    setTimeLeft(duration);
    setIsEndedEarly(false);
  };

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
      <button
        type="button"
        className="relative flex items-center justify-center cursor-pointer bg-transparent border-none outline-none p-0 focus:outline-none focus:ring-0"
        onClick={toggleTimer}
      >
        <svg
          width={320}
          height={320}
          viewBox="0 0 320 320"
          className="transform -rotate-90 drop-shadow-xl"
        >
          {/* Background Track */}
          <circle
            cx={160}
            cy={160}
            r={radius}
            stroke="var(--timer-track)"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-colors duration-700" />
          {/* Animated Progress */}
          <motion.circle
            cx={160}
            cy={160}
            r={radius}
            stroke="var(--timer-progress)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ ease: "linear", duration: 1 }}
            className="transition-colors duration-700" />
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
      </button>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={toggleTimer}
          disabled={isEndedEarly}
          className={cn(
            "px-8 py-3 rounded-full font-medium glass-panel transition-transform",
            isEndedEarly ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
          )}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => { void handleEndEarly(); }}
          disabled={isEndedEarly || (!isActive && timeLeft === duration)}
          className={cn(
            "px-8 py-3 rounded-full font-medium glass-panel transition-transform border border-red-500/20 text-red-400",
            isEndedEarly || (!isActive && timeLeft === duration)
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 active:scale-95 hover:bg-red-500/10"
          )}
        >
          {isEndedEarly ? "Ended" : "End Early"}
        </button>
      </div>
    </div>
  );
}
