"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const STORAGE_PREFIX = "pif:verktoy:";

function storageKey(toolId: string): string {
  return `${STORAGE_PREFIX}${toolId}`;
}

function encodeState<T>(state: T): string {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeState<T>(encoded: string): T | null {
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

function readLocalStorage<T>(toolId: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(toolId));
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeLocalStorage<T>(toolId: string, state: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(toolId), JSON.stringify(state));
  } catch {
    // Quota or private mode — ignore
  }
}

function clearLocalStorage(toolId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey(toolId));
  } catch {
    // ignore
  }
}

function readUrlState<T>(): T | null {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get("s");
  if (!param) return null;
  return decodeState<T>(param);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithDefaults<T extends Record<string, unknown>>(
  defaults: T,
  saved: Partial<T> | null,
): T {
  if (!saved || !isPlainObject(saved)) return defaults;
  return { ...defaults, ...saved };
}

export type ToolPersistenceSource = "url" | "local" | null;

export interface UseToolPersistenceResult<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  update: <K extends keyof T>(key: K, value: T[K]) => void;
  hydrated: boolean;
  source: ToolPersistenceSource;
  clearSaved: () => void;
  copyShareLink: () => Promise<boolean>;
}

/**
 * Persist calculator state in localStorage and optionally restore from ?s= share links.
 * Starts with defaults (SSR-safe), then hydrates on the client.
 */
export function useToolPersistence<T extends Record<string, unknown>>(
  toolId: string,
  defaults: T,
): UseToolPersistenceResult<T> {
  const defaultsRef = useRef(defaults);
  const [state, setState] = useState<T>(defaults);
  const [hydrated, setHydrated] = useState(false);
  const [source, setSource] = useState<ToolPersistenceSource>(null);
  const skipNextSave = useRef(true);

  useEffect(() => {
    const fromUrl = readUrlState<Partial<T>>();
    if (fromUrl) {
      setState(mergeWithDefaults(defaultsRef.current, fromUrl));
      setSource("url");
      setHydrated(true);
      skipNextSave.current = false;
      return;
    }

    const fromLocal = readLocalStorage<Partial<T>>(toolId);
    if (fromLocal) {
      setState(mergeWithDefaults(defaultsRef.current, fromLocal));
      setSource("local");
    }
    setHydrated(true);
    skipNextSave.current = false;
  }, [toolId]);

  useEffect(() => {
    if (!hydrated || skipNextSave.current) return;
    writeLocalStorage(toolId, state);
  }, [hydrated, state, toolId]);

  const update = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearSaved = useCallback(() => {
    clearLocalStorage(toolId);
    setState(structuredClone(defaultsRef.current));
    setSource(null);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("s")) {
        url.searchParams.delete("s");
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
      }
    }
  }, [toolId]);

  const copyShareLink = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("s", encodeState(state));
      await navigator.clipboard.writeText(url.toString());
      return true;
    } catch {
      return false;
    }
  }, [state]);

  return {
    state,
    setState,
    update,
    hydrated,
    source,
    clearSaved,
    copyShareLink,
  };
}
