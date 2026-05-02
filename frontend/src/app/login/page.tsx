"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Sun } from "lucide-react";
import { useSession } from "@/context/SessionContext";

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-slate-800">
      
      {/* Interactive Positive Background Mesh */}
      <motion.div 
        animate={{ 
          x: isHovering ? -20 : 0, 
          y: isHovering ? -20 : 0,
          scale: isHovering ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 50 }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-yellow-300/40 rounded-full mix-blend-multiply filter blur-[80px]" 
      />
      <motion.div 
        animate={{ 
          x: isHovering ? 20 : 0, 
          y: isHovering ? 20 : 0,
          scale: isHovering ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 50 }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-300/40 rounded-full mix-blend-multiply filter blur-[80px]" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/60 backdrop-blur-2xl p-10 w-full max-w-md relative z-10 border border-white/50 rounded-3xl shadow-2xl shadow-rose-200/50"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 text-white"
          >
            <Sun className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-600">
            Rise & Focus
          </h1>
          <p className="text-sm font-medium opacity-70 mt-2 flex items-center gap-2">
            Let's achieve greatness today <Sparkles className="w-4 h-4 text-amber-500" />
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="text-xs font-bold uppercase tracking-wider text-rose-800/60 mb-2 block">Your Email</label>
            <motion.input
              whileFocus={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-white/50 border border-white/60 rounded-xl px-5 py-4 outline-none focus:border-orange-400/50 focus:ring-4 focus:ring-orange-400/10 transition-all text-slate-800 font-medium placeholder:text-slate-400"
              placeholder="genius@work.com"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-xs font-bold uppercase tracking-wider text-rose-800/60 mb-2 block">Secret Password</label>
            <motion.input
              whileFocus={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-white/50 border border-white/60 rounded-xl px-5 py-4 outline-none focus:border-orange-400/50 focus:ring-4 focus:ring-orange-400/10 transition-all text-slate-800 font-medium placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 group"
          >
            <span>Start My Day</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
