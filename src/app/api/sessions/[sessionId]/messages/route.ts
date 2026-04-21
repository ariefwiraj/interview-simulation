import { NextResponse } from "next/server";
import { getSession, isSessionActive } from "@/lib/services/sessionService";
import {
  getMessages,
  saveMessage,
} from "@/lib/services/messageService";
import { generateResponse } from "@/lib/services/aiService";
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from "@/lib/services/rateLimiter";
import type { SendMessageRequest } from "@/lib/supabase/types";

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

/**
 * GET /api/sessions/:sessionId/messages
 * Retrieve all messages for a session.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;

    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateCheck = checkRateLimit(
      `messages-read:${clientId}`,
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

    // Verify session exists
    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const messages = await getMessages(sessionId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("[GET /api/sessions/:id/messages] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sessions/:sessionId/messages
 * Send a user message and get an AI response.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;

    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateCheck = checkRateLimit(
      `messages-send:${clientId}`,
      RATE_LIMITS.AI_MESSAGE
    );
    if (rateCheck.limited) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter) },
        }
      );
    }

    // Verify session is active
    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const active = await isSessionActive(sessionId);
    if (!active) {
      return NextResponse.json(
        { error: "Session is no longer active" },
        { status: 400 }
      );
    }

    const body: SendMessageRequest = await request.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 1. Save user message
    const userMessage = await saveMessage(sessionId, "user", body.message.trim());

    // 2. Get full conversation history (including the new user message)
    const allMessages = await getMessages(sessionId);

    // 3. Generate AI response with stage context
    const aiText = await generateResponse(
      session,
      allMessages,
      body.current_stage ?? "main"
    );

    // 4. Save AI response
    const aiMessage = await saveMessage(sessionId, "ai", aiText);

    return NextResponse.json({ userMessage, aiMessage });
  } catch (error) {
    console.error("[POST /api/sessions/:id/messages] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
