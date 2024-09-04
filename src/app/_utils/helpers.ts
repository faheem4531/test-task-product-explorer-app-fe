// utils/sessionUtils.ts

import { v4 as uuidv4 } from "uuid";

export const getSessionId = (): string => {
  if (typeof window !== "undefined") {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4(); // Generate a new UUID
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  }
  return uuidv4(); // Return a new UUID if not in the browser environment
};

export const setSessionId = (sessionId: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sessionId", sessionId);
  }
};

export const clearSessionId = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sessionId");
  }
};
