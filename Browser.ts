// utils/browser.ts
export const isBrowser = typeof window !== "undefined";

export const safeWindow = isBrowser ? window : undefined;

export const safeLocation = isBrowser ? window.location : undefined;

export const safeLocalStorage = isBrowser ? window.localStorage : undefined;

export const safeSessionStorage = isBrowser ? window.sessionStorage : undefined;

// Hook for client-side only operations
import { useEffect, useState } from "react";

export function useClientSide() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// Safe localStorage wrapper
export const storage = {
  get: (key: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set: (key: string, value: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Handle storage errors silently
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  },
};
