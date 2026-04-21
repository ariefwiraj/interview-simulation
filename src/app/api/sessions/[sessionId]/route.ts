import { NextResponse } from "next/server";
import { getSession, endSession } from "@/lib/services/sessionService";
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from "@/lib/services/rateLimiter";

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

/**
 * GET /api/sessions/:sessionId
 * Retrieve session details.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;

    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateCheck = checkRateLimit(
      `session-read:${clientId}`,
      RATE_LIMITS.READ
    );
    if (rateCheck.limited) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter) },
        }
      );
    }

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("[GET /api/sessions/:id] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/sessions/:sessionId
 * End an active session.
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.status !== "active") {
      return NextResponse.json(
        { error: "Session is already ended" },
        { status: 400 }
      );
    }

    const updatedSession = await endSession(sessionId);

    return NextResponse.json({ session: updatedSession });
  } catch (error) {
    console.error("[PATCH /api/sessions/:id] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
