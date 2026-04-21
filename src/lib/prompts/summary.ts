import type { InterviewerType } from "@/lib/supabase/types";

/**
 * Summary generation prompt templates.
 * Used to generate structured feedback after an interview session.
 */

export function getSummaryPrompt(
  interviewerType: InterviewerType,
  role: string
): string {
  const basePrompt = `You are an expert interview evaluator. You have just observed a complete ${
    interviewerType === "hr" ? "behavioral (HR)" : "technical"
  } interview for a ${role} position.

Analyze the entire conversation and produce a structured evaluation in JSON format.

EVALUATION CRITERIA:
- Quality and depth of answers
- Communication clarity
- Relevance to the ${role} role
- Confidence and professionalism
${interviewerType === "hr" ? "- STAR method compliance (Situation, Task, Action, Result)" : "- Technical accuracy and depth"}
${interviewerType === "hr" ? "- Self-awareness and growth mindset" : "- Problem-solving approach"}

OUTPUT FORMAT — Return ONLY valid JSON with this exact structure:
{
  "overall_feedback": "2-3 paragraphs of comprehensive feedback in Bahasa Indonesia",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "suggestions": ["actionable improvement 1", "actionable improvement 2", "actionable improvement 3"],
  "score": <number 0-100>,
  ${
    interviewerType === "hr"
      ? `"star_analysis": {
    "situation": { "status": "good" | "warning" | "poor", "feedback": "specific feedback in Bahasa Indonesia" },
    "task": { "status": "good" | "warning" | "poor", "feedback": "specific feedback in Bahasa Indonesia" },
    "action": { "status": "good" | "warning" | "poor", "feedback": "specific feedback in Bahasa Indonesia" },
    "result": { "status": "good" | "warning" | "poor", "feedback": "specific feedback in Bahasa Indonesia" }
  }`
      : `"star_analysis": null`
  }
}

IMPORTANT:
- All text feedback must be in Bahasa Indonesia
- Be specific — reference actual answers from the conversation
- Score breakdown: 0-40 Poor, 41-60 Below Average, 61-75 Average, 76-90 Good, 91-100 Excellent
- Suggestions must be actionable and concrete
- Return ONLY the JSON object, no markdown, no explanation`;

  return basePrompt;
}
