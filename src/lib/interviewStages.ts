export type InterviewStage = "intro" | "main" | "closing";

export interface StageConfig {
  id: InterviewStage;
  label: string;
  durationRange: string;
  wordCountTarget: string;
  tips: string[];
}

export const getStageConfig = (duration: number): Record<InterviewStage, StageConfig> => {
  if (duration === 10) {
    return {
      intro: {
        id: "intro",
        label: "Perkenalan Diri",
        durationRange: "1–2 menit",
        wordCountTarget: "80–180 kata",
        tips: ["Sebutkan background", "Ceritakan pengalaman", "Sebut skill utama"]
      },
      main: {
        id: "main",
        label: "Pertanyaan HRD",
        durationRange: "6–7 menit",
        wordCountTarget: "100–250 kata per jawaban",
        tips: ["Gunakan metode STAR (Situation, Task, Action, Result)", "Jawab dengan ringkas namun berbobot", "Hubungkan dengan role yang dilamar"]
      },
      closing: {
        id: "closing",
        label: "Q&A + Closing",
        durationRange: "1–2 menit",
        wordCountTarget: "50–100 kata",
        tips: ["Siapkan minimal 1 pertanyaan untuk interviewer", "Tunjukkan ketertarikan pada perusahaan", "Tutup dengan ucapan terima kasih"]
      }
    };
  }

  if (duration === 15) {
    return {
      intro: {
        id: "intro",
        label: "Perkenalan Diri",
        durationRange: "2 menit",
        wordCountTarget: "100–200 kata",
        tips: ["Sebutkan background", "Ceritakan pengalaman", "Sebut skill utama", "Jelaskan career goal"]
      },
      main: {
        id: "main",
        label: "Pertanyaan HRD",
        durationRange: "9–10 menit",
        wordCountTarget: "150–300 kata per jawaban",
        tips: ["Gunakan metode STAR detail", "Sebutkan angka atau metrik dalam hasil", "Tunjukkan problem solving skill"]
      },
      closing: {
        id: "closing",
        label: "Q&A + Closing",
        durationRange: "3 menit",
        wordCountTarget: "100–150 kata",
        tips: ["Tanya hal mendalam tentang role/culture", "Sampaikan antusiasme", "Tanyakan next step proses rekrutmen"]
      }
    };
  }
  
  if (duration === 20) {
      return {
      intro: {
        id: "intro",
        label: "Intro",
        durationRange: "2–3 menit",
        wordCountTarget: "150–250 kata",
        tips: ["Sebutkan background", "Ceritakan pengalaman relevan", "Sebut skill dan tools", "Jelaskan career goal"]
      },
      main: {
        id: "main",
        label: "Main Questions",
        durationRange: "13–14 menit",
        wordCountTarget: "200–350 kata per jawaban",
        tips: ["Gunakan metode STAR sangat detail", "Jelaskan tantangan terbesar", "Fokus pada kontribusi individual dan tim"]
      },
      closing: {
        id: "closing",
        label: "Closing",
        durationRange: "3–4 menit",
        wordCountTarget: "100–200 kata",
        tips: ["Eksplorasi culture tim", "Tanyakan tech stack / current challenge", "Closing statement yang kuat"]
      }
    };
  }
  
  // Default 30 min
  return {
    intro: {
      id: "intro",
      label: "Intro",
      durationRange: "3–4 menit",
      wordCountTarget: "200–300 kata",
      tips: ["Berikan elevator pitch yang kuat", "Ceritakan journey karier", "Highlight pencapaian terbesar", "Jelaskan relevansi dengan role"]
    },
    main: {
      id: "main",
      label: "Main Questions",
      durationRange: "20–22 menit",
      wordCountTarget: "250–400 kata per jawaban",
      tips: ["Eksplorasi STAR method mendalam", "Cover konflik, gagal, dan sukses", "Tunjukkan business logic/impact", "Buktikan leadership skill"]
    },
    closing: {
      id: "closing",
      label: "Closing",
      durationRange: "4–5 menit",
      wordCountTarget: "150–250 kata",
      tips: ["Buat diskusi 2 arah", "Tanyakan visi produk/perusahaan", "Tanyakan ekspektasi 3 bulan pertama", "Tinggalkan kesan positif"]
    }
  };
};
