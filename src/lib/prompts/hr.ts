/**
 * HR Interviewer prompt templates.
 * Focuses on behavioral questions using the STAR method.
 */

import type { SeniorityLevel } from "@/lib/supabase/types";

function getQuestionBank(seniority: SeniorityLevel, duration: number): string[] {
  if (duration === 10) {
    if (seniority === "fresh") return [
      "Ceritakan tentang diri Anda.",
      "Lulusan jurusan apa dan kenapa memilih bidang ini?",
      "Ceritakan project / magang yang paling relevan.",
      "Kenapa melamar posisi ini?",
      "Kenapa tertarik dengan perusahaan kami?",
      "Apa kelebihan utama Anda?",
      "Kapan bisa mulai kerja?"
    ];
    if (seniority === "mid") return [
      "Ceritakan tentang diri Anda dan pengalaman kerja sejauh ini.",
      "Saat ini bekerja sebagai apa?",
      "Tanggung jawab utama di pekerjaan sekarang/terakhir?",
      "Kenapa ingin pindah kerja?",
      "Kenapa melamar posisi ini?",
      "Ekspektasi gaji berapa?",
      "Kapan bisa join?"
    ];
    if (seniority === "senior") return [
      "Ceritakan perjalanan karier Anda secara singkat.",
      "Posisi Anda saat ini dan scope kerja Anda?",
      "Pernah memimpin tim?",
      "Kenapa terbuka dengan peluang baru?",
      "Kenapa tertarik posisi ini?",
      "Kisaran kompensasi saat ini?",
      "Notice period berapa lama?"
    ];
  }

  if (duration === 15) {
    if (seniority === "fresh") return [
      "Ceritakan tentang diri Anda.",
      "Kenapa memilih jurusan tersebut?",
      "Ceritakan project terbaik Anda.",
      "Apa role Anda di project itu?",
      "Apa kelebihan Anda?",
      "Apa kekurangan Anda?",
      "Pernah kerja tim? Bagaimana pengalaman Anda?",
      "Kenapa perusahaan kami?",
      "Kapan bisa join?"
    ];
    if (seniority === "mid") return [
      "Ceritakan tentang diri Anda dan pengalaman kerja.",
      "Jelaskan pekerjaan terakhir Anda.",
      "Achievement terbesar Anda di tempat kerja sebelumnya?",
      "Kenapa resign / ingin pindah?",
      "Apa kekuatan utama Anda?",
      "Area yang masih ingin dikembangkan?",
      "Bagaimana handle tekanan kerja?",
      "Ekspektasi gaji?",
      "Kapan join?"
    ];
    if (seniority === "senior") return [
      "Ceritakan perjalanan karier Anda.",
      "Posisi terakhir dan tanggung jawab utama?",
      "Pernah memimpin tim berapa orang?",
      "Achievement terbesar Anda?",
      "Gaya leadership Anda seperti apa?",
      "Kenapa ingin pindah sekarang?",
      "Ekspektasi total package?",
      "Notice period?",
      "Ada proses interview di tempat lain?"
    ];
  }

  if (duration === 20) {
    if (seniority === "fresh") return [
      "Ceritakan tentang diri Anda.",
      "Kenapa memilih bidang ini?",
      "Pengalaman organisasi / magang yang paling berkesan?",
      "Ceritakan tantangan terbesar saat project.",
      "Bagaimana menghadapi deadline?",
      "Pernah konflik dalam tim?",
      "Apa kelebihan Anda?",
      "Apa kekurangan Anda?",
      "Kenapa perusahaan kami?",
      "Target karier 3 tahun ke depan?",
      "Ekspektasi gaji?",
      "Kapan join?"
    ];
    if (seniority === "mid") return [
      "Ceritakan perjalanan karier Anda.",
      "Detail pekerjaan terakhir Anda.",
      "Achievement yang paling membanggakan?",
      "Tantangan terbesar di pekerjaan sebelumnya?",
      "Bagaimana Anda menyelesaikan masalah kerja?",
      "Pernah konflik dengan tim?",
      "Kenapa resign?",
      "Apa yang dicari di perusahaan baru?",
      "Kelebihan utama Anda?",
      "Area improvement Anda?",
      "Ekspektasi gaji?",
      "Join kapan?"
    ];
    if (seniority === "senior") return [
      "Ceritakan perjalanan karier Anda.",
      "Scope tanggung jawab Anda saat ini.",
      "Pencapaian yang berdampak ke bisnis?",
      "Pernah improve proses kerja?",
      "Pernah handle stakeholder sulit?",
      "Bagaimana memimpin tim?",
      "Kenapa ingin pindah?",
      "Apa target karier berikutnya?",
      "Kenapa tertarik perusahaan kami?",
      "Ekspektasi total kompensasi?",
      "Notice period?",
      "Kapan available interview lanjutan?"
    ];
  }

  // Default to 30 mins
  if (seniority === "fresh") return [
    "Ceritakan tentang diri Anda.",
    "Kenapa memilih jurusan / bidang ini?",
    "Ceritakan project terbaik Anda.",
    "Apa kontribusi Anda di project tersebut?",
    "Pernah gagal? Apa yang dipelajari?",
    "Pernah konflik dalam tim?",
    "Bagaimana handle tekanan?",
    "Apa kelebihan Anda?",
    "Apa kekurangan Anda?",
    "Kenapa perusahaan kami?",
    "Apa kontribusi Anda jika diterima?",
    "Target 5 tahun ke depan?",
    "Ekspektasi gaji?",
    "Kapan join?",
    "Ada pertanyaan untuk kami?"
  ];
  if (seniority === "mid") return [
    "Ceritakan perjalanan karier Anda.",
    "Detail pengalaman kerja terakhir.",
    "Tanggung jawab utama Anda sebelumnya.",
    "Achievement dengan hasil nyata / angka.",
    "Tantangan tersulit yang pernah dihadapi.",
    "Bagaimana handle multitasking & deadline?",
    "Konflik dengan rekan kerja/atasan?",
    "Kenapa resign?",
    "Kenapa tertarik perusahaan kami?",
    "Apa value yang bisa Anda bawa?",
    "Kelebihan Anda?",
    "Area improvement Anda?",
    "Ekspektasi gaji?",
    "Notice period / join kapan?",
    "Ada pertanyaan untuk kami?"
  ];
  return [
    "Ceritakan perjalanan karier Anda dari awal sampai sekarang.",
    "Jelaskan posisi Anda saat ini.",
    "Scope tanggung jawab dan tim yang dipimpin.",
    "Pencapaian terbesar yang berdampak ke bisnis.",
    "Pernah membangun / memperbaiki proses kerja?",
    "Bagaimana menangani anggota tim underperform?",
    "Konflik dengan stakeholder / manajemen?",
    "Bagaimana mengambil keputusan sulit?",
    "Kenapa ingin pindah sekarang?",
    "Kenapa memilih perusahaan kami?",
    "Value strategis yang bisa Anda bawa?",
    "Target karier 5 tahun ke depan?",
    "Ekspektasi total package?",
    "Notice period?",
    "Pertanyaan untuk kami?"
  ];
}

export function getHRSystemPrompt(role: string, name: string, seniority: SeniorityLevel, duration: number): string {
  const questions = getQuestionBank(seniority, duration).map(q => `- ${q}`).join("\n");

  return `You are a professional HR interviewer conducting a behavioral interview for a ${role} position.

PERSONA:
- Your name is ${name}
- You are warm but professional
- You speak in Bahasa Indonesia
- You are evaluating the candidate's soft skills, teamwork, and problem-solving approach

GOALS:
- Conduct a realistic behavioral interview
- Encourage the candidate to answer using the STAR method (Situation, Task, Action, Result)
- Evaluate communication skills, leadership potential, and cultural fit

STRICT RULES:
1. Ask ONE question at a time — never ask multiple questions.
2. Follow the QUESTION BANK below chronologically as much as possible, adapting slightly to the user's answers.
3. If the candidate's answer is missing STAR components (especially for behavioral questions), ask a targeted follow-up:
   - Missing Situation: "Bisa ceritakan lebih detail situasinya? Apa konteks dan latar belakangnya?"
   - Missing Task: "Apa tugas atau tanggung jawab spesifik Anda dalam situasi tersebut?"
   - Missing Action: "Langkah apa saja yang Anda ambil secara personal untuk menyelesaikan hal tersebut?"
   - Missing Result: "Apa hasil akhirnya? Apakah ada metrik atau dampak yang bisa diukur?"
4. After a complete STAR answer, acknowledge it briefly then move to the next question.
5. Keep your responses concise — no more than 2-3 sentences per response.
6. Do NOT reveal that you are an AI. Behave naturally as a human interviewer.
7. Do NOT provide feedback during the interview — only ask questions and follow-ups.

QUESTION BANK (Ask these questions throughout the ${duration} minute interview for this ${seniority.toUpperCase()} level candidate):
${questions}

Start by introducing yourself briefly and asking the first question.`;
}

export function getHRClosingPrompt(): string {
  return `IMPORTANT MODE CHANGE — CLOSING SESSION:
The interview is in its final 5 minutes. Switch to closing mode:
1. Wrap up the current question naturally if one is in progress
2. Ask the candidate: "Apakah ada pertanyaan yang ingin Anda tanyakan kepada saya?"
3. If they ask questions, answer them naturally and professionally
4. Keep responses brief — the session is ending soon
5. End with a professional closing: thank them for their time`;
}
