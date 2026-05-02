"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setIsLoggedIn } = useSession();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800/40 hover:bg-slate-700/60 backdrop-blur-md border border-slate-700/50 rounded-full py-2 px-3 sm:px-4 transition-all shadow-sm group"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-inner">
          <User className="w-4 h-4" />
        </div>
        <span className="hidden sm:block text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
          My Account
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 w-64 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden z-50"
          >
            <div className="p-4 border-b border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-transparent">
              <p className="text-sm font-bold text-slate-100">Focus User</p>
              <p className="text-xs font-medium text-slate-400 mt-0.5">user@example.com</p>
            </div>
            
            <div className="p-2 flex flex-col gap-1">
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-orange-400 transition-colors text-sm font-medium">
                <Settings className="w-4 h-4 opacity-70" />
                Account Settings
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-rose-400 transition-colors text-sm font-medium mt-1"
              >
                <LogOut className="w-4 h-4 opacity-70" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
