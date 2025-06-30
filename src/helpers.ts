/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type DependencyList } from "react";

function checkIsAppleSilicon() {
  try {
    const w = document.createElement("canvas").getContext("webgl");
    const d = w?.getExtension("WEBGL_debug_renderer_info");
    const g = (d && w?.getParameter(d.UNMASKED_RENDERER_WEBGL)) || "";
    return g.match(/Apple/) && !g.match(/Apple GPU/);
  } catch {
    return false;
  }
}

export const systemInfo = {
  isMac: navigator.userAgent.includes("Macintosh"),
  isWindows: navigator.userAgent.includes("Windows"),
  isLinux: navigator.userAgent.includes("Linux"),
  isArm64: checkIsAppleSilicon(),
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
