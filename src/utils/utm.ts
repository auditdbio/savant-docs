// Simple UTM utilities for capture, storage, and URL augmentation

export type UTMParams = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}>;

const STORAGE_KEY = "savant_utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function getQueryUTMParams(search: string = typeof window !== "undefined" ? window.location.search : ""): UTMParams {
  if (!search) return {};
  const params = new URLSearchParams(search);
  const utm: UTMParams = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
    }
  });
  return utm;
}

export function loadStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UTMParams) : {};
  } catch {
    return {};
  }
}

export function storeUTM(params: UTMParams): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadStoredUTM();
    const merged: UTMParams = { ...existing, ...params };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }
}

export function getEffectiveUTM(): UTMParams {
  // Prefer query UTM (if present) over stored
  const fromQuery = getQueryUTMParams();
  const stored = loadStoredUTM();
  return { ...stored, ...fromQuery };
}

export function appendUTMToUrl(url: string, utm: UTMParams = getEffectiveUTM()): string {
  if (!utm || Object.keys(utm).length === 0) return url;
  try {
    const isAbsolute = /^(https?:)?\/\//i.test(url);
    const u = new URL(url, isAbsolute ? undefined : (typeof window !== "undefined" ? window.location.origin : "https://savant.chat"));
    Object.entries(utm).forEach(([key, value]) => {
      if (value) {
        u.searchParams.set(key, value);
      }
    });
    return isAbsolute ? u.toString() : u.pathname + (u.search ? u.search : "") + (u.hash ? u.hash : "");
  } catch {
    return url;
  }
}

export function isFromBlockscout(utm: UTMParams = getEffectiveUTM()): boolean {
  return (utm.utm_source || "").toLowerCase() === "blockscout";
}


