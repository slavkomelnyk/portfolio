"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { STATUS_INTERVAL_MS, statuses } from "@/config/portfolio";

type Ctx = { index: number; status: (typeof statuses)[number]; next: () => void };
const StatusContext = createContext<Ctx | null>(null);

export function StatusProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % statuses.length), []);

  // Pick a random status after mount (doing it during render would break hydration).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(Math.floor(Math.random() * statuses.length));
  }, []);

  // Auto-advance; the timer restarts whenever the status changes (incl. manual clicks).
  useEffect(() => {
    const id = setTimeout(next, STATUS_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, next]);

  const value: Ctx = { index, status: statuses[index], next };
  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
}

export function useStatus() {
  const ctx = useContext(StatusContext);
  if (!ctx) throw new Error("useStatus must be used inside <StatusProvider>");
  return ctx;
}
