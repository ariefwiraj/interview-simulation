/**
 * Utility for managing interviewer names and greetings.
 */

const INTERVIEWER_NAMES = [
  "Sarah",
  "Indah",
  "Maya",
  "Putri",
  "Dewi",
  "Anita",
  "Rizka",
  "Dwi",
  "Maria",
  "Siti",
  "Budi",
  "Andi",
  "Ryan",
  "Aditya",
  "Dimas",
  "Bayu",
  "Hendra",
  "Faisal",
  "Kevin",
  "Yoga",
];

/**
 * Get a deterministic name for an interviewer based on the session ID.
 */
export function getInterviewerName(sessionId: string): string {
  // Simple hash function to pick a name from the list
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    hash = (hash << 5) - hash + sessionId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % INTERVIEWER_NAMES.length;
  return INTERVIEWER_NAMES[index];
}

/**
 * Get a time-appropriate greeting (Pagi, Siang, Sore, Malam).
 */
export function getTimeGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return "pagi";
  } else if (hour >= 11 && hour < 15) {
    return "siang";
  } else if (hour >= 15 && hour < 18) {
    return "sore";
  } else {
    return "malam";
  }
}
