import { supabase } from "@/lib/supabase/client";
import type { Message, MessageSender } from "@/lib/supabase/types";

/**
 * Service for managing interview messages in the database.
 */

export async function getMessages(sessionId: string): Promise<Message[]> {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to get messages: ${error.message}`);
  }

  return (messages ?? []) as Message[];
}

export async function saveMessage(
  sessionId: string,
  sender: MessageSender,
  message: string
): Promise<Message> {
  const { data: savedMessage, error } = await supabase
    .from("messages")
    .insert({
      session_id: sessionId,
      sender,
      message,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save message: ${error.message}`);
  }

  return savedMessage as Message;
}

/**
 * Format messages into a conversation history array
 * suitable for passing to the Gemini AI as context.
 */
export function getConversationHistory(
  messages: Message[]
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  return messages.map((msg) => ({
    role: msg.sender === "user" ? ("user" as const) : ("model" as const),
    parts: [{ text: msg.message }],
  }));
}
