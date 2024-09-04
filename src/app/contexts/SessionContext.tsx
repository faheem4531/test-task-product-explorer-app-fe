// contexts/SessionContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSessionId, setSessionId, clearSessionId } from "../_utils/helpers";

interface SessionContextType {
  sessionId: string;
  updateSessionId: (sessionId: string) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionId, setSessionIdState] = useState<string>(getSessionId());

  const updateSessionId = (newSessionId: string) => {
    setSessionId(newSessionId);
    setSessionIdState(newSessionId);
  };

  const clearSession = () => {
    clearSessionId();
    setSessionIdState(getSessionId()); // Generate a new session ID
  };

  useEffect(() => {
    // Initialize or validate session on mount
    if (!sessionId) {
      updateSessionId(getSessionId());
    }
  }, [sessionId]);

  return (
    <SessionContext.Provider
      value={{ sessionId, updateSessionId, clearSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
