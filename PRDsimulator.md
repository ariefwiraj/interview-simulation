Oke, kita upgrade PRD kamu supaya **lebih matang, realistis, dan punya diferensiasi kuat (STAR-based AI interview)**. Ini versi yang sudah disesuaikan dengan semua diskusi kita tadi.

---

# 📄 PRODUCT REQUIREMENT DOCUMENT (UPDATED)

## 🧠 Nama Produk (sementara)

**InterviewSim AI**
Tagline: *Practice smarter, not harder.*

---

# 🎯 1. OBJECTIVE

Menyediakan platform simulasi interview berbasis AI yang:

* Realistis (seperti interview asli)
* Terstruktur (menggunakan **STAR method**)
* Adaptif (berdasarkan role & tipe interviewer)
* Memberikan feedback actionable

---

# 👥 2. TARGET USERS

### Primary:

* Fresh graduate
* Mahasiswa tingkat akhir

### Secondary:

* Junior–mid professional
* Career switcher

---

# 💡 3. VALUE PROPOSITION

Berbeda dari chatbot biasa, aplikasi ini:

* Simulasi interview **berbasis waktu**
* AI interviewer dengan **persona (HR / Technical)**
* Melatih user menjawab dengan **framework STAR**
* Memberikan **feedback terstruktur**

---

# ⚙️ 4. CORE FEATURES

## 4.1 Landing Page

Tujuan: Convert user → mulai interview

### Sections:

* Hero (headline + CTA)
* Feature highlights:

  * AI Interviewer
  * STAR-based training
  * Real-time simulation
* CTA: **Start Interview**

---

## 4.2 Interview Setup

User memilih:

### Input:

* Job Role (Frontend, Backend, Data, dll)
* Interview Type:

  * HR (behavioral → STAR)
  * Technical (user interview)
* Duration:

  * 15 / 20 / 30 menit

### Output:

* Create interview session

---

## 4.3 Interview Session (CORE)

### UI:

* Chat interface (AI ↔ User)
* Timer countdown
* Status indicator:

  * “Interview in progress”
  * “Last 5 minutes”

---

### Behavior AI:

#### Mode HR:

* Pertanyaan behavioral
* Wajib dorong jawaban pakai STAR
* Follow-up jika tidak lengkap:

  * “Apa situasinya?”
  * “Apa hasilnya?”

---

#### Mode Technical:

* Pertanyaan konsep & problem solving
* Bisa mix:

  * teori
  * pengalaman (optional STAR)

---

### Flow:

1. AI tanya 1 pertanyaan
2. User jawab
3. AI:

   * follow-up atau lanjut
4. Loop sampai waktu habis

---

### Last 5 Minutes:

* AI masuk mode:

  * Closing
  * User boleh tanya balik

---

## 4.4 Summary & Feedback

### Output:

* Overall feedback
* Strengths
* Weaknesses
* Improvement suggestions

---

### ⭐ STAR Analysis (UNIQUE FEATURE)

Untuk HR mode:

* Evaluate:

  * Situation
  * Task
  * Action
  * Result

Contoh output:

* “Action kamu sudah jelas”
* “Result belum terukur”

---

# 🧩 5. SYSTEM DESIGN

## Frontend

* Next.js (App Router)
* Tailwind CSS
* Framer Motion

---

## Backend (Serverless Style)

* Next.js API Routes

---

## Database

* Supabase PostgreSQL

---

## AI Integration

* Gemini API (Flash model)

---

# 🗄️ 6. DATABASE SCHEMA

## Table: sessions

* id
* role
* interviewer_type (hr / technical)
* duration
* start_time
* end_time

---

## Table: messages

* id
* session_id
* sender (user / ai)
* message
* created_at

---

## Table: summaries

* session_id
* feedback
* star_analysis (json)
* score (optional)

---

# 🔄 7. APP FLOW

## 1. Landing

User klik “Start Interview”

---

## 2. Setup

User pilih config → create session

---

## 3. Interview

Loop:

```
AI → Question
User → Answer
AI → Follow-up / Next
```

---

## 4. Timer Logic

Frontend:

* Countdown berjalan

Backend:

* Kirim flag:

  * `is_last_5_minutes`

---

## 5. End Session

* Stop chat
* Generate summary via AI
* Save ke DB

---

## 6. Summary Page

* Tampilkan feedback
* STAR evaluation

---

# 🧠 8. PROMPT ENGINEERING (CRITICAL)

## Base Prompt HR

```txt
You are a professional HR interviewer.

Goals:
- Conduct realistic behavioral interview
- Encourage STAR method answers

Rules:
- Ask one question at a time
- Ask follow-up questions to complete STAR:
  - Situation
  - Task
  - Action
  - Result

Job Role: {role}

If last 5 minutes:
Switch to closing session.
```

---

## Base Prompt Technical

```txt
You are a technical interviewer.

Goals:
- Assess technical knowledge
- Ask problem-solving questions

Rules:
- Ask one question at a time
- Increase difficulty gradually
- Use STAR only for experience questions

Job Role: {role}
```

---

# 🚀 9. MVP SCOPE

## ✅ MUST HAVE

* Landing page
* Interview setup
* Chat interview
* Timer
* AI integration
* Summary basic
* STAR guidance (HR mode)

---

## ❌ NOT IN MVP

* Auth system
* Voice AI
* Emotion detection
* Advanced analytics

---

# ⚠️ 10. RISKS & MITIGATION

## ❌ AI terlalu generic

✔️ Gunakan:

* Role-specific prompt
* Conversation history

---

## ❌ Interview terasa tidak real

✔️ Batasi:

* 1 question per response
* Gunakan follow-up

---

## ❌ User tidak paham STAR

✔️ Solusi:

* AI guide secara aktif

---

# 🗺️ 11. ROADMAP

## Phase 2

* Auth (Supabase)
* Save history
* Dashboard

## Phase 3

* Voice interview
* AI scoring advanced

## Phase 4

* SaaS monetization

---

# 🔥 FINAL TAKE

PRD ini sekarang:

* Lebih **tajam positioning-nya**
* Ada **diferensiasi nyata (STAR-based coaching)**
* Lebih **implementable (tidak over-engineered)**
