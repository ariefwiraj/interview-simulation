/**
 * Simple in-memory rate limiter for API routes.
 * Tracks requests per IP within a sliding time window.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Time window in seconds */
  windowSeconds: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 30,
  windowSeconds: 60,
};

/**
 * Check if a request should be rate limited.
 * Returns `{ limited: false }` if allowed, or `{ limited: true, retryAfter }` if blocked.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { limited: boolean; retryAfter?: number; remaining?: number } {
  const now = Date.now();
  const key = identifier;
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // Fresh window
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowSeconds * 1000,
    });
    return { limited: false, remaining: config.maxRequests - 1 };
  }

  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { limited: true, retryAfter, remaining: 0 };
  }

  entry.count++;
  return { limited: false, remaining: config.maxRequests - entry.count };
}

/**
 * Extract client identifier from request headers.
 * Falls back to a default key if no IP can be determined.
 */
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}

// Preset configs for different route types
export const RATE_LIMITS = {
  /** For AI message generation — expensive Gemini calls */
  AI_MESSAGE: { maxRequests: 20, windowSeconds: 60 } as RateLimitConfig,
  /** For session creation */
  SESSION_CREATE: { maxRequests: 5, windowSeconds: 60 } as RateLimitConfig,
  /** For summary generation — expensive Gemini calls */
  SUMMARY_GENERATE: { maxRequests: 3, windowSeconds: 60 } as RateLimitConfig,
  /** For read-only operations */
  READ: { maxRequests: 60, windowSeconds: 60 } as RateLimitConfig,
};
