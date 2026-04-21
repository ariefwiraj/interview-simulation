import { supabase } from "@/lib/supabase/client";
import type { Summary, Session, Message } from "@/lib/supabase/types";
import { generateSummary as generateAISummary } from "./aiService";

/**
 * Service for managing interview summaries.
 */

export async function getSummary(sessionId: string): Promise<Summary | null> {
  const { data: summary, error } = await supabase
    .from("summaries")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw new Error(`Failed to get summary: ${error.message}`);
  }

  return summary as Summary;
}

export async function generateAndSaveSummary(
  session: Session,
  messages: Message[]
): Promise<Summary> {
  // Check if summary already exists
  const existing = await getSummary(session.id);
  if (existing) return existing;

  // Generate via AI
  const aiSummary = await generateAISummary(session, messages);

  // Save to database
  const { data: summary, error } = await supabase
    .from("summaries")
    .insert({
      session_id: session.id,
      overall_feedback: aiSummary.overall_feedback,
      strengths: aiSummary.strengths,
      weaknesses: aiSummary.weaknesses,
      suggestions: aiSummary.suggestions,
      star_analysis: aiSummary.star_analysis,
      score: aiSummary.score,
      time_management_score: aiSummary.time_management_score,
      communication_score: aiSummary.communication_score,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save summary: ${error.message}`);
  }

  return summary as Summary;
}
