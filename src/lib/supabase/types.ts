import type { InterviewStage } from "@/lib/interviewStages";

// ─── Database Row Types ────────────────────────────────────────────

export type InterviewerType = "hr" | "technical";
export type SessionStatus = "active" | "completed" | "expired";
export type MessageSender = "user" | "ai";
export type STARStatus = "good" | "warning" | "poor";
export type SeniorityLevel = "fresh" | "mid" | "senior";

export interface Session {
  id: string;
  role: string;
  seniority: SeniorityLevel;
  interviewer_type: InterviewerType;
  duration: number;
  status: SessionStatus;
  start_time: string;
  end_time: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  sender: MessageSender;
  message: string;
  created_at: string;
}

export interface STARPillar {
  status: STARStatus;
  feedback: string;
}

export interface STARAnalysisData {
  situation: STARPillar;
  task: STARPillar;
  action: STARPillar;
  result: STARPillar;
}

export interface Summary {
  id: string;
  session_id: string;
  overall_feedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  star_analysis: STARAnalysisData | null;
  score: number | null;
  time_management_score: number | null;
  communication_score: number | null;
  created_at: string;
}

// ─── Request DTOs ──────────────────────────────────────────────────

export interface CreateSessionRequest {
  role: string;
  seniority: SeniorityLevel;
  interviewer_type: InterviewerType;
  duration: number;
}

export interface SendMessageRequest {
  message: string;
  current_stage: InterviewStage;
}

// ─── Response DTOs ─────────────────────────────────────────────────

export interface CreateSessionResponse {
  session: Session;
  firstMessage: Message;
}

export interface SendMessageResponse {
  userMessage: Message;
  aiMessage: Message;
}

// ─── AI Service Types ──────────────────────────────────────────────

export interface AIGeneratedSummary {
  overall_feedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  star_analysis: STARAnalysisData | null;
  score: number;
  time_management_score: number;
  communication_score: number;
}
