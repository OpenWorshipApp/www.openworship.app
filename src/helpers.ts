/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type DependencyList } from "react";

function checkIsAppleSilicon() {
  try {
    const w = document.createElement("canvas").getContext("webgl");
    const d = w?.getExtension("WEBGL_debug_renderer_info");
    const g = (d && w?.getParameter(d.UNMASKED_RENDERER_WEBGL)) || "";
    if (g.match(/Apple/) && !g.match(/Apple GPU/)) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getCpuArchitecture() {
  const anyNavigator = navigator as any;
  if (
    anyNavigator.userAgentData &&
    anyNavigator.userAgentData.getHighEntropyValues
  ) {
    return anyNavigator.userAgentData
      .getHighEntropyValues(["architecture"])
      .then((data: any) => data.architecture)
      .catch(() => "Unknown");
  } else {
    const ua = anyNavigator.userAgent;
    if (ua.indexOf("WOW64") !== -1 || ua.indexOf("Win64") !== -1) {
      return Promise.resolve("x86-64 (64-bit)");
    } else if (ua.indexOf("ARM") !== -1 || ua.indexOf("arm") !== -1) {
      return Promise.resolve("ARM");
    } else {
      return Promise.resolve("x86 (32-bit) or unknown");
    }
  }
}

async function checkIsArm64() {
  if (checkIsAppleSilicon()) {
    return true;
  }
  const arch = await getCpuArchitecture();
  return arch.toLowerCase().includes("arm");
}

function checkIs32Bit() {
  if (
    navigator.userAgent.indexOf("WOW64") != -1 ||
    navigator.userAgent.indexOf("Win64") != -1
  ) {
    return false;
  } else {
    return true;
  }
}

export async function getTrueSystemInfo() {
  const systemInfo = {
    isMac: navigator.userAgent.includes("Macintosh"),
    isWindows: navigator.userAgent.includes("Windows"),
    isLinux: navigator.userAgent.includes("Linux"),
    isArm64: await checkIsArm64(),
    is64System: !checkIs32Bit(),
  };
  return Object.fromEntries(
    Object.entries(systemInfo).filter(([_, value]) => value)
  );
}

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

export function checkIsVersionOutdated(
  // 2025.06.25 vs 2025.06.26
  currentVersion: string,
  latestVersion: string
) {
  const currentParts = currentVersion.split(".").map(Number);
  const latestParts = latestVersion.split(".").map(Number);

  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const latestPart = latestParts[i] || 0;

    if (currentPart < latestPart) {
      return true;
    } else if (currentPart > latestPart) {
      return false;
    }
  }
  return false; // Versions are equal
}
