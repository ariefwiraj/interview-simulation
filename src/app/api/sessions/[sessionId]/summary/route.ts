import { NextResponse } from "next/server";
import { getSession } from "@/lib/services/sessionService";
import { getMessages } from "@/lib/services/messageService";
import {
  getSummary,
  generateAndSaveSummary,
} from "@/lib/services/summaryService";
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from "@/lib/services/rateLimiter";

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

/**
 * GET /api/sessions/:sessionId/summary
 * Retrieve existing summary for a session.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;

    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateCheck = checkRateLimit(
      `summary-read:${clientId}`,
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

    const summary = await getSummary(sessionId);
    if (!summary) {
      return NextResponse.json(
        { error: "Summary not found. Generate one first via POST." },
        { status: 404 }
      );
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("[GET /api/sessions/:id/summary] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sessions/:sessionId/summary
 * Generate and save a summary for a completed session.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;

    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateCheck = checkRateLimit(
      `summary-gen:${clientId}`,
      RATE_LIMITS.SUMMARY_GENERATE
    );
    if (rateCheck.limited) {
      return NextResponse.json(
        { error: "Too many requests. Summary generation is resource-intensive." },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter) },
        }
      );
    }

    // Verify session exists
    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Get all messages for this session
    const messages = await getMessages(sessionId);
    if (messages.length < 2) {
      return NextResponse.json(
        { error: "Not enough conversation data to generate summary" },
        { status: 400 }
      );
    }

    // Generate and save the summary (idempotent — returns existing if found)
    const summary = await generateAndSaveSummary(session, messages);

    return NextResponse.json({ summary }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/sessions/:id/summary] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
