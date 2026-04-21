import { supabase } from "@/lib/supabase/client";
import type { Session, CreateSessionRequest } from "@/lib/supabase/types";

/**
 * Service for managing interview sessions in the database.
 */

export async function createSession(
  data: CreateSessionRequest
): Promise<Session> {
  const { data: session, error } = await supabase
    .from("sessions")
    .insert({
      role: data.role,
      seniority: data.seniority,
      interviewer_type: data.interviewer_type,
      duration: data.duration,
      status: "active",
      start_time: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return session as Session;
}

export async function getSession(id: string): Promise<Session | null> {
  const { data: session, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw new Error(`Failed to get session: ${error.message}`);
  }

  return session as Session;
}

export async function endSession(id: string): Promise<Session> {
  const { data: session, error } = await supabase
    .from("sessions")
    .update({
      status: "completed",
      end_time: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to end session: ${error.message}`);
  }

  return session as Session;
}

export async function isSessionActive(id: string): Promise<boolean> {
  const session = await getSession(id);
  if (!session || session.status !== "active") return false;

  // Check if the session has exceeded its duration
  const startTime = new Date(session.start_time).getTime();
  const now = Date.now();
  const durationMs = session.duration * 60 * 1000;
  const bufferMs = 2 * 60 * 1000; // 2 min grace period

  return now - startTime < durationMs + bufferMs;
}
