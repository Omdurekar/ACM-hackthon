"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Phase = "focus" | "rest";

interface SessionContextType {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  togglePhase: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("focus");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Sync the document root attribute for CSS dynamic variables
    if (phase === "rest") {
      document.documentElement.setAttribute("data-phase", "rest");
    } else {
      document.documentElement.removeAttribute("data-phase");
    }
  }, [phase]);

  const togglePhase = () => setPhase((prev) => (prev === "focus" ? "rest" : "focus"));

  return (
    <SessionContext.Provider value={{ phase, setPhase, togglePhase, isLoggedIn, setIsLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
