import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
  Session,
  Message,
  AIGeneratedSummary,
} from "@/lib/supabase/types";
import type { InterviewStage } from "@/lib/interviewStages";
import { getHRSystemPrompt } from "@/lib/prompts/hr";
import { getTechnicalSystemPrompt } from "@/lib/prompts/technical";
import { getSummaryPrompt } from "@/lib/prompts/summary";
import { getConversationHistory } from "./messageService";
import { getInterviewerName, getTimeGreeting } from "@/lib/utils/interviewer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Service for interacting with the Google Gemini AI API.
 */

/**
 * Generate an AI interviewer response based on conversation history.
 * Now accepts currentStage to build a stage-aware system prompt.
 */
export async function generateResponse(
  session: Session,
  messages: Message[],
  currentStage: InterviewStage
): Promise<string> {
  // Build system prompt based on interviewer type and current stage
  const interviewerName = getInterviewerName(session.id);

  let systemPrompt: string;
  if (session.interviewer_type === "hr") {
    systemPrompt = getHRSystemPrompt(
      session.role,
      interviewerName,
      session.seniority,
      session.duration,
      currentStage
    );
  } else {
    systemPrompt = getTechnicalSystemPrompt(
      session.role,
      interviewerName,
      session.seniority,
      session.duration,
      currentStage
    );
  }

  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    systemInstruction: systemPrompt,
  });

  const history = getConversationHistory(messages);

  // Gemini history MUST start with 'user' role. 
  // If our first message is from the model (AI), prepend a dummy user starting prompt.
  if (history.length > 0 && history[0].role === "model") {
    history.unshift({
      role: "user",
      parts: [{ text: "Mulai interview." }],
    });
  }

  // If no messages yet, return the custom opening greeting
  if (history.length === 0) {
    const greeting = getTimeGreeting();

    if (session.interviewer_type === "hr") {
      return `Selamat ${greeting}. Terima kasih sudah hadir untuk interview hari ini. Saya ${interviewerName}, dan saya dari tim HR. Saya akan memandu Anda melalui proses wawancara ini. Untuk memulai, silakan perkenalkan diri Anda dan ceritakan sedikit tentang latar belakang serta motivasi Anda melamar posisi ${session.role}.`;
    } else {
      return `Selamat ${greeting}. Terima kasih sudah hadir untuk interview technical hari ini. Saya ${interviewerName}, dan saya dari tim Engineering. Saya akan memandu Anda melalui proses wawancara teknis ini. Sebagai awal, silakan perkenalkan diri Anda dan ceritakan sedikit tentang pengalaman teknis atau proyek terbaru yang Anda kerjakan sebagai ${session.role}.`;
    }
  }

  // Continue the conversation with full history
  // Separate the last user message from history for the chat
  const lastMessage = history[history.length - 1];
  const previousHistory = history.slice(0, -1);

  const chat = model.startChat({ history: previousHistory });
  const result = await chat.sendMessage(lastMessage.parts[0].text);
  return result.response.text();
}

/**
 * Generate a structured summary/feedback based on the full conversation.
 */
export async function generateSummary(
  session: Session,
  messages: Message[]
): Promise<AIGeneratedSummary> {
  const summaryPrompt = getSummaryPrompt(
    session.interviewer_type,
    session.role
  );

  // Build the conversation transcript
  const transcript = messages
    .map(
      (msg) =>
        `${msg.sender === "user" ? "Candidate" : "Interviewer"}: ${msg.message}`
    )
    .join("\n\n");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: summaryPrompt,
  });

  const result = await model.generateContent(
    `Here is the complete interview transcript:\n\n${transcript}\n\nGenerate the evaluation JSON now.`
  );

  const responseText = result.response.text();

  // Parse the JSON from the response (handle potential markdown wrapping)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI summary response as JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]) as AIGeneratedSummary;

  // Validate and clamp scores
  parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score ?? 50)));
  parsed.time_management_score = Math.max(0, Math.min(100, Math.round(parsed.time_management_score ?? 50)));
  parsed.communication_score = Math.max(0, Math.min(100, Math.round(parsed.communication_score ?? 50)));

  return parsed;
}
