/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type DependencyList } from "react";

export const systemInfo = {
  isMac: navigator.userAgent.includes("Macintosh"),
  isWindows: navigator.userAgent.includes("Windows"),
  isLinux: navigator.userAgent.includes("Linux"),
};
export const trueSystemInfo = Object.fromEntries(
  Object.entries(systemInfo).filter(([_, value]) => value)
);

export function useAppStateAsync<T>(
  callee: () => Promise<T>,
  deps: DependencyList = [],
  defaultValue?: T | null
) {
  const [value, setValue] = useState<T | null | undefined>(defaultValue);
  useEffect(() => {
    callee().then((newValue) => {
      setValue(newValue);
    });
  }, deps);
  return [value, setValue] as const;
}
