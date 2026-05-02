"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Clock, Brain, FastForward } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-slate-800 p-6">
      <motion.div 
        animate={{ 
          x: [0, -30, 0, 20, 0], 
          y: [0, 20, -20, 0, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-yellow-300/40 rounded-full mix-blend-multiply filter blur-[80px]" 
      />
      <motion.div 
        animate={{ 
          x: [0, 30, -20, 0], 
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-300/40 rounded-full mix-blend-multiply filter blur-[80px]" 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/60 backdrop-blur-3xl p-8 sm:p-12 w-full max-w-2xl relative z-10 border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30 text-white"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-600">
            About the App
          </h1>
        </div>

        <div className="space-y-6 text-slate-700">
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Our platform is built on the <strong>Pomodoro Technique</strong>, a time-management method that improves focus by breaking work into structured intervals with short breaks. It helps users stay productive, reduce burnout, and manage tasks more effectively.
          </p>

          <div className="bg-white/40 p-6 rounded-2xl border border-white/60">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-orange-700">
              <Clock className="w-5 h-5" /> Key Benefits
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm font-medium opacity-90">
              <li>Encourages focused work through timed sessions.</li>
              <li>Reduces mental fatigue with regular breaks.</li>
              <li>Makes large tasks easier by dividing them into smaller sessions.</li>
              <li>Helps build consistency and better time management habits.</li>
            </ul>
          </div>

          <div className="bg-white/40 p-6 rounded-2xl border border-white/60">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-rose-700">
              <FastForward className="w-5 h-5" /> Limitations
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm font-medium opacity-90">
              <li>Fixed intervals may interrupt deep focus during complex tasks.</li>
              <li>Not ideal for subjects requiring continuous thinking (e.g., advanced mathematics, deep learning, or coding).</li>
              <li>May feel rigid for users who prefer flexible work patterns.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-rose-100 p-6 rounded-2xl border border-orange-200/50">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-orange-800">
              <Brain className="w-5 h-5" /> Our Approach
            </h2>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              To overcome these limitations, we introduce adaptive features like <strong>Flow Mode</strong>, allowing users to continue working without forced breaks during deep focus sessions. This ensures a balance between structured productivity and flexible deep work.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-end">
          <button
            onClick={handleSkip}
            className="text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors py-2 px-4"
          >
            Skip for now
          </button>
          <motion.button
            whileHover={{ y: -2, scale: 1.02, boxShadow: "0px 10px 20px rgba(249, 115, 22, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSkip}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 group"
          >
            <span>Continue to App</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(249, 115, 22, 0.4); }
      `}} />
    </div>
  );
}
