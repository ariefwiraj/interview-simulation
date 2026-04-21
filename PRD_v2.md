Bisa banget. Justru diskusi terakhir kita **sangat penting** karena menambah diferensiasi produk kamu: bukan cuma chatbot interview, tapi **adaptive interview simulation with structured timing + guided hint system**.

PRD lama kamu sudah bagus, sekarang kita upgrade dengan fitur:

# 🔥 Tambahan Penting dari Diskusi Terakhir

### NEW Differentiator:

✅ Hint Box Session Guidance
✅ Dynamic Stage Transition
✅ Time-based realistic interview flow
✅ Text-mode duration estimation
✅ Adaptive closing logic

---

# 📄 PRODUCT REQUIREMENT DOCUMENT (ENHANCED MVP)

## 🧠 Nama Produk

**InterviewSim AI**
Tagline: *Practice smarter, not harder.*

---

# 🎯 1. OBJECTIVE

Menyediakan platform simulasi interview AI yang:

* Realistis seperti HRD sungguhan
* Terstruktur dengan flow interview nyata
* Menggunakan STAR method
* Memiliki progress sesi & estimasi waktu
* Memberikan feedback actionable

---

# 💡 2. UNIQUE VALUE PROPOSITION

Berbeda dari chatbot biasa:

### ✅ Real Interview Flow Engine

Interview dibagi ke sesi nyata:

1. Perkenalan diri
2. Pertanyaan HRD
3. Q&A + Closing

---

### ✅ Smart Hint Box

User selalu tahu sedang berada di tahap mana.

Contoh:

```text id="k69wdl"
Perkenalan Diri
Estimasi: 1–2 menit verbal
Target text: 80–180 kata
```

---

### ✅ Adaptive Time Transition

Jika jawaban sudah cukup → lanjut otomatis.
Jika terlalu lama → AI menutup dengan natural.

---

### ✅ STAR Coaching

Khusus HR mode.

---

# ⚙️ 3. CORE FEATURES

---

# 3.1 Landing Page

(sama seperti sebelumnya)

---

# 3.2 Interview Setup

User memilih:

### Input:

* Job Role
* Interview Type:

  * HR
  * Technical
* Duration:

  * 10 / 15 / 20 / 30 menit
* Experience Level:

  * Fresh Graduate
  * 1–3 Tahun
  * 3+ Tahun

---

# 3.3 Interview Session (UPGRADED CORE)

## UI Layout

### Main Area:

* Chat AI ↔ User

### Side / Top Panel:

## Hint Box (NEW)

Menampilkan sesi aktif:

```text id="8h1j6d"
Sekarang: Perkenalan Diri
Estimasi verbal: 1–2 menit
Target text: 80–180 kata
Tips:
• Sebut background
• Pengalaman
• Skill utama
```

---

## Progress Bar (NEW)

```text id="zyeqpj"
[Intro ✅] [HR Questions 🔄] [Q&A ⏳]
```

---

# 🤖 AI INTERVIEW FLOW ENGINE (NEW)

## Session Structure

---

## Interview 10 Menit

| Sesi            | Durasi    |
| --------------- | --------- |
| Perkenalan diri | 1–2 menit |
| Pertanyaan HRD  | 6–7 menit |
| Q&A + Closing   | 1–2 menit |

---

## Interview 15 Menit

| Sesi            | Durasi     |
| --------------- | ---------- |
| Perkenalan diri | 2 menit    |
| Pertanyaan HRD  | 9–10 menit |
| Q&A + Closing   | 3 menit    |

---

## Interview 20 Menit

| Sesi           | Durasi      |
| -------------- | ----------- |
| Intro          | 2–3 menit   |
| Main Questions | 13–14 menit |
| Closing        | 3–4 menit   |

---

## Interview 30 Menit

| Sesi           | Durasi      |
| -------------- | ----------- |
| Intro          | 3–4 menit   |
| Main Questions | 20–22 menit |
| Closing        | 4–5 menit   |

---

# 🧠 TEXT MODE DURATION ENGINE (NEW)

Karena MVP masih text-based:

Durasi verbal disimulasikan dengan:

### 1. Word Count

### 2. Typing Time

### 3. Answer Completeness

### 4. AI Semantic Quality Check

---

## Example Logic:

```text id="w2i2m6"
if intro_answer.score > 75:
 move_to_next_stage()
```

---

# 📌 Intro Completeness Score

Dicek apakah user menjelaskan:

* Background
* Pengalaman
* Skill
* Career Goal

---

# 🔄 AUTO STAGE TRANSITION (NEW)

## Jika Jawaban Sudah Cukup Cepat:

AI:

> Terima kasih atas perkenalannya. Kita lanjut ke pertanyaan berikutnya.

---

## Jika Jawaban Kurang:

AI:

> Bisa diceritakan juga pengalaman yang paling relevan?

---

## Jika Terlalu Lama:

AI:

> Terima kasih atas penjelasannya. Saya akan masuk ke pertanyaan berikutnya.

---

# ⏰ SMART TIME LIMIT LOGIC

Jika sesi pertanyaan melebihi waktu:

AI otomatis:

> Karena waktu terbatas, saya akan masuk ke sesi terakhir.

---

# 3.4 Interview Modes

---

## HR Mode

Behavioral interview + STAR follow-up.

---

## Technical Mode

Role specific technical questions.

---

# 3.5 Summary & Feedback

### Standard Feedback:

* Communication
* Clarity
* Relevance
* Confidence (text proxy)

---

### STAR Analysis

Situation
Task
Action
Result

---

### NEW: Time Management Score

Contoh:

```text id="1vq7rw"
Anda menjawab cukup efektif dan terstruktur.
Durasi jawaban sesuai simulasi interview nyata.
```

---

# 🗄️ DATABASE UPDATE

## sessions

Tambah:

* experience_level
* interview_stage
* completed_on_time (bool)

---

## messages

Tambah:

* word_count
* response_time_seconds

---

## summaries

Tambah:

* time_management_score
* communication_score

---

# 🧠 PROMPT ENGINEERING UPDATE

## Base Prompt HR

```txt id="b5u76y"
You are a realistic HR interviewer.

Interview structure:
1. Self introduction
2. Main questions
3. Candidate Q&A

Rules:
- Ask one question at a time
- Move stages naturally
- If answer is enough, continue
- If too long, politely redirect
- Use STAR follow-up when needed
- Last stage is Q&A closing
```

---

# 🚀 MVP SCOPE (UPDATED)

## MUST HAVE

✅ Landing Page
✅ Setup Page
✅ AI Chat Interview
✅ Hint Box
✅ Progress Flow
✅ Stage Auto Transition
✅ STAR Guidance
✅ Summary Feedback

---

## NICE TO HAVE

* Save session history
* Dark mode
* Export report

---

## NOT MVP

* Speech to text
* Voice interview
* Camera analysis
* Emotion detection

---

# 🎯 WHY THIS IS STRONGER NOW

Dulu hanya chatbot interview.

Sekarang jadi:

## AI Interview Simulator

yang punya:

* Flow realistis
* Waktu realistis
* Progress realistis
* Hint coaching
* Adaptive interviewer

---

# 🔥 HIGH VALUE POSITIONING

> “Practice interviews that feel real — with structured timing, smart feedback, and adaptive AI interviewers.”

---

# 📌 RECOMMENDATION MVP BUILD ORDER

1. Setup Page
2. Chat UI
3. Hint Box
4. AI Flow Logic
5. Summary
6. Styling polish

---

# 🚀 Kalau kamu mau, next step saya sarankan:

## FULL APP FLOW SCREEN PER SCREEN

atau

## Database schema production level

atau

## Prompt Gemini paling optimal agar interviewer terasa manusia asli

atau

## PRD v2 Siap Dikirim ke AI agent Antigravity / Lovable / Bolt.
