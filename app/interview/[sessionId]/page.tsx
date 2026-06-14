"use client";

import { useState, useEffect } from "react";
import { Brain, Sparkles, Send, Mic, MicOff, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { Bell, Settings } from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [interviewType, setInterviewType] = useState("");
  const [answer, setAnswer] = useState("");
  const [completing, setCompleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;
  const isLastQuestion = currentQuestion === totalQuestions;

  useEffect(() => {
    if (sessionId) fetchSession();
  }, [sessionId]);

  // Setup speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";
        rec.onresult = (event: any) => {
          let transcript = "";
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setAnswer(transcript);
        };
        rec.onend = () => setMicActive(false);
        setRecognition(rec);
      }
    }
  }, []);

  const toggleMic = () => {
    if (!recognition) { alert("Speech recognition not supported in this browser."); return; }
    if (micActive) { recognition.stop(); setMicActive(false); }
    else { recognition.start(); setMicActive(true); }
  };

  const fetchSession = async () => {
    try {
      const response = await api.get(`/interview/${sessionId}`);
      const session = response.data;
      setQuestions(session.questions);
      setCurrentQuestion(session.current_index + 1);
      setInterviewType(session.interview_type);
    } catch (error) {
      alert("Failed to load interview");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) { alert("Please enter an answer"); return; }
    if (submitting || completing) return;
    if (micActive && recognition) { recognition.stop(); setMicActive(false); }
    try {
      setSubmitting(true);
      const response = await api.post("/interview/answer", { session_id: sessionId, answer });
      if (response.data.session_complete) {
        setCompleting(true);
        await api.post("/interview/complete", { session_id: sessionId });
        router.push(`/report/${sessionId}`);
        return;
      }
      setAnswer("");
      setCurrentQuestion((prev) => prev + 1);
    } catch (error: any) {

      if (error.response?.status === 429) {
        alert(
          error.response?.data?.detail ||
          "AI service daily quota is exhausted. Please try again in 24 hours."
        );
        return;
      }

      alert(
        error.response?.data?.detail ||
        "Failed to submit answer"
      );
    }finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060D1F] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
      </div>
    );
  }

  if (completing) {
    return (
      <div className="min-h-screen bg-[#060D1F] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.06] blur-[120px] pointer-events-none" />

        <div className="relative flex items-center justify-center mb-8">
          <div className="h-20 w-20 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" />
          <div className="absolute h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tight mb-3">Generating Your Report</h2>
        <p className="text-slate-400 text-sm">Evaluating answers and preparing your coaching insights...</p>
        <p className="text-slate-600 text-xs mt-2">This may take 2–3 minutes</p>

        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 w-8 rounded-full bg-teal-400/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060D1F] text-white relative overflow-hidden">

      {/* Subtle background orbs */}
      <div className="fixed top-0 right-0 h-96 w-96 rounded-full bg-violet-500/[0.04] blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 h-96 w-96 rounded-full bg-teal-500/[0.04] blur-[100px] pointer-events-none" />

      {/* TOPBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/[0.07] bg-[#060D1F]/80 backdrop-blur-xl z-50">
        <div className="h-full flex items-center justify-between px-8">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center text-xs font-bold">IP</div>
            <span className="text-sm font-semibold tracking-tight bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">InterviewPilot</span>
          </div>

          {/* Session badge */}
          <div className="flex items-center gap-2 bg-teal-500/[0.08] border border-teal-500/20 rounded-full px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-teal-400 font-medium">Live Interview Session</span>
          </div>

          <div className="flex items-center gap-5">
            <button className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/30 transition">
              <Bell size={15} />
            </button>
            <button className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/30 transition">
              <Settings size={15} />
            </button>
            <div className="w-px h-5 bg-white/[0.08]" />
            <div className="flex items-center gap-2.5">
              <span className="text-sm text-slate-300">Tanishka</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center text-xs font-bold">T</div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-8 pt-28 pb-12">

        {/* HEADER ROW */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium mb-2 capitalize">
              {interviewType || "AI"} Assessment
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Question <span className="text-teal-400">{currentQuestion}</span>
              <span className="text-slate-600"> / {totalQuestions}</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Suggested length</p>
            <p className="text-sm font-medium text-slate-300 mt-0.5">150 – 300 words</p>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8 space-y-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-violet-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>{Math.round(progress)}% complete</span>
            <span>{totalQuestions - currentQuestion} remaining</span>
          </div>
        </div>

        {/* QUESTION CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl mb-5">
          {/* decorative brain watermark */}
          <Brain size={120} className="absolute right-6 top-6 text-white/[0.03]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-teal-400/30 via-violet-400/20 to-transparent" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Sparkles size={15} className="text-violet-400" />
              </div>
              <span className="text-xs uppercase tracking-wider text-violet-400 font-medium">AI Generated Question</span>
            </div>

            <h2 className="text-2xl font-bold leading-relaxed text-slate-100 max-w-2xl">
              {questions[currentQuestion - 1]}
            </h2>

        
          </div>
        </div>

        {/* ANSWER SECTION */}
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl overflow-hidden mb-5">

          {/* Answer header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.05]">
            <div className="flex items-center gap-2.5">
              <Send size={15} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Your Response</span>
            </div>
            <span className="text-xs font-mono text-slate-600">{answer.length} / 2000</span>
          </div>

          <div className="p-5">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={7}
              disabled={submitting || completing}
              maxLength={2000}
              placeholder="Start typing your answer here... Use the STAR method (Situation, Task, Action, Result) for the best evaluation."
              className="w-full resize-none rounded-2xl border border-white/[0.07] bg-black/20 p-5 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-teal-500/40 transition leading-7 disabled:opacity-50"
            />

            {/* MIC BUTTON — main emphasis */}
            <div className="mt-4 flex flex-col items-center gap-3">

              <button
                onClick={toggleMic}
                disabled={submitting || completing}
                className={`relative group flex flex-col items-center gap-3 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {/* Outer pulse rings when active */}
                {micActive && (
                  <>
                    <span className="absolute h-20 w-20 rounded-full bg-teal-400/10 animate-ping" />
                    <span className="absolute h-16 w-16 rounded-full bg-teal-400/10 animate-ping" style={{ animationDelay: "0.15s" }} />
                  </>
                )}

                {/* Mic button */}
                <div className={`relative h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  micActive
                    ? "bg-teal-400 shadow-lg shadow-teal-400/40 scale-110"
                    : "bg-white/[0.05] border-2 border-dashed border-white/20 group-hover:border-teal-400/50 group-hover:bg-teal-500/[0.06]"
                }`}>
                  {micActive
                    ? <MicOff size={22} className="text-[#060D1F]" />
                    : <Mic size={22} className="text-slate-400 group-hover:text-teal-400 transition" />
                  }
                </div>

                <div className="text-center">
                  <p className={`text-sm font-semibold transition ${micActive ? "text-teal-400" : "text-slate-400 group-hover:text-teal-400"}`}>
                    {micActive ? "● Recording — tap to stop" : "Tap to speak your answer"}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {micActive ? "Speak clearly into your microphone" : "Voice-to-text · hands-free answering"}
                  </p>
                </div>
              </button>

              {/* Waveform animation when mic is active */}
              {micActive && (
                <div className="flex items-center gap-1 mt-1">
                  {[3, 5, 8, 5, 7, 4, 9, 6, 4, 7, 5, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-teal-400 animate-pulse"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 0.07}s` }}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* TIPS STRIP */}
        <div className="mb-5 rounded-2xl border border-amber-500/[0.12] bg-amber-500/[0.04] px-5 py-3.5 flex items-start gap-3">
          <Sparkles size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-5">
            <span className="text-amber-400 font-medium">Tip: </span>
            Use the <span className="text-slate-300 font-medium">STAR method</span> — Situation, Task, Action, Result — for structured, high-scoring answers.
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmitAnswer}
            disabled={submitting || completing || !answer.trim()}
            className={`flex items-center gap-3 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
              !answer.trim()
                ? "bg-white/[0.05] border border-white/[0.08]"
                : "bg-gradient-to-r from-teal-500 to-violet-600 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/20"
            }`}
          >
            {completing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating report...
              </>
            ) : submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Submitting...
              </>
            ) : (
              <>
                {isLastQuestion ? "Complete Interview" : "Next Question"}
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}