"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  Sparkles,
  Brain,
  Mic,
  Send,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import api from "@/src/lib/api";
import Topbar from "@/components/dashboard/Topbar";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();
  const params = useParams();

  const sessionId =
    params.sessionId as string;
    
  const [loading, setLoading] =
    useState(true);

  const [questions, setQuestions] =
    useState<string[]>([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(1);

  const [interviewType, setInterviewType] =
    useState("");

  const [answer, setAnswer] = useState("");

  const totalQuestions =
    questions.length;

  const progress =
    totalQuestions > 0
      ? (
          currentQuestion /
          totalQuestions
        ) * 100
      : 0;

  
  const isLastQuestion = currentQuestion === totalQuestions;

  const [completing, setCompleting] =
  useState(false);

  const [submitting, setSubmitting] =
  useState(false);


  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const response =
        await api.get(
          `/interview/${sessionId}`
        );

      console.log("SESSION DATA");
      const session =
        response.data;

      setQuestions(
        session.questions
      );

      setCurrentQuestion(
        session.current_index + 1
      );

      setInterviewType(
        session.interview_type
      );
    } catch (error) {
      alert(
        "Failed to load interview"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer =
  async () => {
    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }
    if (submitting || completing) return;
    try {
      setSubmitting(true);
      const response =
        await api.post(
          "/interview/answer",
          {
            session_id:
              sessionId,
            answer,
          }
        );

      if (
        response.data.session_complete
      ) {

        setCompleting(true);

        const completeResponse =
          await api.post(
            "/interview/complete",
            {
              session_id: sessionId,
            }
          );

        router.push(
          `/report/${sessionId}`
        );

        return;
      }

      setAnswer("");

      setCurrentQuestion(
        (prev) => prev + 1
      );
    } catch (error) {
      alert(
        "Failed to submit answer"
      );
    }finally {
       setSubmitting(false);
    }
    
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1326] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (completing) {
    return (
      <div className="min-h-screen bg-[#0b1326] flex flex-col items-center justify-center text-white">

        <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />

        <h2 className="mt-8 text-3xl font-bold">
          Generating Your Interview Report
        </h2>

        <p className="mt-3 text-slate-400">
          This may take 2-3 minutes...
        </p>

        <p className="mt-2 text-slate-500 text-sm">
          Evaluating answers, generating coaching insights, and preparing your report.
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd]">

      {/* TOPBAR */}

      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-[#081020]/80 backdrop-blur-xl z-50">
        <div className="h-full flex items-center justify-between px-8">

          <div className="relative w-80">
          </div>

          <div className="flex items-center gap-6">
            <Bell className="cursor-pointer text-slate-400 hover:text-white" size={20} />
            <Settings className="cursor-pointer text-slate-400 hover:text-white" size={20} />
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <span>Tanishka</span>
              <div className="w-8 h-8 rounded-full bg-indigo-500" />
            </div>
          </div>

        </div>
      </header>
            

      {/* CONTENT */}

      <div className="mx-auto max-w-6xl px-8 py-8 pt-20">

        {/* HEADER */}

        <div className="mb-6 flex items-end justify-between">

          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-indigo-300">
              Behavioral Assessment
            </p>

            <h1 className="text-4xl font-bold">
              Question {currentQuestion} of {totalQuestions}
            </h1>
          </div>

          <p className="font-mono text-slate-400">
            Estimated time: 15 mins
          </p>
        </div>

        {/* PROGRESS */}

        <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* QUESTION CARD */}

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
            backdrop-blur-xl
          "
        >
          <Brain
            size={90}
            className="
              absolute
              right-10
              top-10
              text-white/10
            "
          />

          <div className="relative z-10">

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/20 p-2">
                <Sparkles className="text-indigo-300" />
              </div>

              <span className="font-mono text-indigo-300">
                AI Generated Question
              </span>
            </div>

            <h2 className="max-w-4xl text-4xl font-bold leading-tight">
              {questions[
                currentQuestion - 1
              ]}
            </h2>

            <div className="mt-6 flex gap-3">

              <span className="rounded-full bg-slate-800 px-5 py-2 font-mono text-sm">
                #softskills
              </span>

              <span className="rounded-full bg-slate-800 px-5 py-2 font-mono text-sm">
                #leadership
              </span>

            </div>

          </div>
        </div>

        {/* ANSWER SECTION */}

        <div
          className="
            mt-6
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
            backdrop-blur-xl
          "
        >
          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <Send size={18} />
              <span className="font-mono text-lg">
                Your Detailed Response
              </span>
            </div>

            <button
              disabled={submitting || completing}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-purple-500/20
                px-4
                py-2
                text-purple-300
                transition
                hover:bg-purple-500/30
              "
            >
              <Mic size={18} />
              Voice-to-Text
            </button>

          </div>

          <div className="relative">

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
              disabled={submitting || completing}
              maxLength={2000}
              placeholder="Start typing your answer here... Use the STAR method (Situation, Task, Action, Result) for the best evaluation."
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-slate-700
                bg-[#060e20]
                p-5
                text-base
                outline-none
                focus:border-indigo-500
              "
            />

            <div className="absolute bottom-5 right-5 font-mono text-slate-500">
              {answer.length} / 2000 characters
            </div>

          </div>
        </div>

        {/* BUTTON */}

        <div className="mt-6 flex justify-end">

          <button
            onClick={handleSubmitAnswer}
            disabled={submitting || completing}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-indigo-400
              to-purple-500
              px-10
              py-4
              text-lg
              font-semibold
              text-white
              shadow-lg
              transition
              hover:scale-[1.02]
            "
          >
            {completing ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Loading Result (2-3 mins)...
              </>
            ) : (
              <>
                {submitting
                  ? "Submitting..."
                  : isLastQuestion
                  ? "Complete Interview"
                  : "Next Question"}

                {!submitting && <Send />}
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}