import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Resolve API URLs for both dev/server and GitHub Pages (static) environments
export function isGithubPagesHost(): boolean {
  return typeof window !== "undefined" && /\.github\.io$/i.test(window.location.hostname);
}

function resolveApiUrl(url: string): string {
  const isAbsolute = /^(https?:)?\/\//i.test(url);
  if (isAbsolute) return url;

  const base = (import.meta as any).env?.BASE_URL || "/"; // e.g. '/project-keystone/' on Pages
  const isPages = isGithubPagesHost();

  // Only rewrite API routes; let asset URLs pass through
  if (url.startsWith("/api")) {
    if (isPages) {
      // Serve static JSON files from the project path
      // Map '/api/foo/bar' -> `${base}api/foo/bar.json`
      const cleanBase = base.endsWith("/") ? base : base + "/";
  const jsonPath = cleanBase.replace(/\/$/, "/") + url.replace(/^\//, "") + ".json";
  // Add a small cache-buster to avoid stale JSON on GitHub Pages
  const v = Date.now().toString();
  return jsonPath + "?v=" + v;
    }
    // In dev/prod server, keep the leading slash (same origin API)
    return url;
  }

  // Non-API relative URL -> prefix base
  if (url.startsWith("/")) {
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    return cleanBase + url;
  }
  return url;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const isPages = isGithubPagesHost();

  // Intercept non-GET calls on GitHub Pages (no server) and simulate success
  if (isPages && method.toUpperCase() !== "GET" && url.startsWith("/api")) {
    // Minimal mock behavior for demo purposes
    if (url === "/api/choices" && method.toUpperCase() === "POST") {
      const body = typeof data === "object" ? (data as any) : {};

      // Persist simple progress deltas keyed by user
      try {
        const userId = body.userId || "demo-user-1";
        const choiceId = body.choiceId as string | undefined;
        const key = `keystone:progress:${userId}`;
        const raw = localStorage.getItem(key);
        const existing = raw ? JSON.parse(raw) : {};
        const deltas: Record<string, { trustNetwork?: number; councilStanding?: number; crewLoyalty?: number }> = {
          "choice-1": { trustNetwork: 50, councilStanding: -75, crewLoyalty: 25 },
          "choice-2": { trustNetwork: 25, councilStanding: 10, crewLoyalty: 15 },
          "choice-3": { trustNetwork: -20, councilStanding: 0, crewLoyalty: 35 },
        };
        const delta = (choiceId && deltas[choiceId]) || {};
        const next = {
          trustNetwork: (existing.trustNetwork ?? 0) + (delta.trustNetwork ?? 0),
          councilStanding: (existing.councilStanding ?? 0) + (delta.councilStanding ?? 0),
          crewLoyalty: (existing.crewLoyalty ?? 0) + (delta.crewLoyalty ?? 0),
          totalChoices: (existing.totalChoices ?? 0) + 1,
          currentChapter: existing.currentChapter ?? 3,
        };
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}

      const payload = {
        id: "mock-choice-" + Date.now(),
        timestamp: new Date().toISOString(),
        ...body,
      };
      return new Response(JSON.stringify(payload), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Generic OK fallback
    return new Response(null, { status: 204 });
  }

  const resolved = resolveApiUrl(url);
  const res = await fetch(resolved, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    const resolved = resolveApiUrl(url);

    // On GitHub Pages, merge persisted progress with base JSON
    if (isGithubPagesHost() && /^\/api\/users\/.+\/progress$/.test(url)) {
      let base: any = {};
      try {
        const baseRes = await fetch(resolved, { credentials: "include" });
        if (baseRes.ok) base = await baseRes.json();
      } catch {}

      try {
        const [, userId] = url.match(/^\/api\/users\/([^/]+)\/progress$/) || [];
        const raw = userId ? localStorage.getItem(`keystone:progress:${userId}`) : null;
        const ls = raw ? JSON.parse(raw) : {};
        return {
          trustNetwork: ls.trustNetwork ?? base.trustNetwork ?? 0,
          councilStanding: ls.councilStanding ?? base.councilStanding ?? 0,
          crewLoyalty: ls.crewLoyalty ?? base.crewLoyalty ?? 0,
          currentChapter: ls.currentChapter ?? base.currentChapter ?? 3,
          totalChoices: ls.totalChoices ?? base.totalChoices ?? 0,
        } as any;
      } catch {}
    }

    const res = await fetch(resolved, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
