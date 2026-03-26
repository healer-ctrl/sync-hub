import { useState, useEffect, useCallback } from "react";

const MOCK_DATA_KEY = "finpulse_use_mock_data";

export function useSettings() {
  const [useMockData, setUseMockData] = useState(() => {
    const stored = localStorage.getItem(MOCK_DATA_KEY);
    return stored === null ? true : stored === "true";
  });

  const toggleMockData = useCallback((value: boolean) => {
    setUseMockData(value);
    localStorage.setItem(MOCK_DATA_KEY, String(value));
  }, []);

  return { useMockData, toggleMockData };
}

/** Read-only helper for hooks that just need the current value */
export function getUseMockData(): boolean {
  const stored = localStorage.getItem(MOCK_DATA_KEY);
  return stored === null ? true : stored === "true";
}
