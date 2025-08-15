import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Resolve API URLs for both dev/server and GitHub Pages (static) environments
function resolveApiUrl(url: string): string {
  const isAbsolute = /^(https?:)?\/\//i.test(url);
  if (isAbsolute) return url;

  const base = (import.meta as any).env?.BASE_URL || "/"; // e.g. '/project-keystone/' on Pages
  const isPages = typeof window !== "undefined" && /\.github\.io$/i.test(window.location.hostname);

  // Only rewrite API routes; let asset URLs pass through
  if (url.startsWith("/api")) {
    if (isPages) {
      // Serve static JSON files from the project path
      // Map '/api/foo/bar' -> `${base}api/foo/bar.json`
      const cleanBase = base.endsWith("/") ? base : base + "/";
      return cleanBase.replace(/\/$/, "/") + url.replace(/^\//, "") + ".json";
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
