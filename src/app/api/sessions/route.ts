import { NextResponse } from "next/server";
import { createSession } from "@/lib/services/sessionService";
import { saveMessage } from "@/lib/services/messageService";
import { generateResponse } from "@/lib/services/aiService";
import {
  checkRateLimit,
  getClientIdentifier,
  RATE_LIMITS,
} from "@/lib/services/rateLimiter";
import type { CreateSessionRequest } from "@/lib/supabase/types";

/**
 * POST /api/sessions
 * Create a new interview session and generate the opening AI message.
 */
export async function POST(request: Request) {
  try {
    // Rate limit check
    const clientId = getClientIdentifier(request);
    const rateCheck = checkRateLimit(
      `session-create:${clientId}`,
      RATE_LIMITS.SESSION_CREATE
    );
    if (rateCheck.limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfter) },
        }
      );
    }

    const body: CreateSessionRequest = await request.json();

    // Validate input
    if (!body.role || !body.seniority || !body.interviewer_type || !body.duration) {
      return NextResponse.json(
        { error: "Missing required fields: role, seniority, interviewer_type, duration" },
        { status: 400 }
      );
    }

    if (!["fresh", "mid", "senior"].includes(body.seniority)) {
      return NextResponse.json(
        { error: "seniority must be 'fresh', 'mid', or 'senior'" },
        { status: 400 }
      );
    }

    if (!["hr", "technical"].includes(body.interviewer_type)) {
      return NextResponse.json(
        { error: "interviewer_type must be 'hr' or 'technical'" },
        { status: 400 }
      );
    }

    if (![10, 15, 20, 30].includes(body.duration)) {
      return NextResponse.json(
        { error: "duration must be 10, 15, 20, or 30" },
        { status: 400 }
      );
    }

    // Create session in DB
    const session = await createSession(body);

    // Generate opening AI message
    const aiText = await generateResponse(session, [], "intro");
    const firstMessage = await saveMessage(session.id, "ai", aiText);

    return NextResponse.json(
      { session, firstMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/sessions] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
