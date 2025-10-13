"use client";
import { createContext, useContext, useState } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [start, setStart] = useState(false);

  return (
    <ProgressContext.Provider value={{ start, setStart }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
