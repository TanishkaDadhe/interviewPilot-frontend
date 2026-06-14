"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Brain, MessageSquare, Lightbulb, Trophy } from "lucide-react";

type QuestionItem = { question: string; answer: string; score: number; verdict?: string; what_was_good?: string; what_was_missing?: string };
type CoachingItem = { encouragement?: string; top_tip?: string; better_answer_structure?: string; example_talking_point?: string; ideal_answer_framework?: string };
type Props = { answers: QuestionItem[]; coaching: CoachingItem[] };

export default function QuestionAnalysis({ answers, coaching }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const scoreColor = (s: number) => s >= 8 ? "text-teal-400 bg-teal-500/10 border-teal-500/20" : s >= 6 ? "text-violet-400 bg-violet-500/10 border-violet-500/20" : s >= 4 ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-rose-400 bg-rose-500/10 border-rose-500/20";

  return (
    <div className="space-y-4">
      {answers.map((item, index) => {
        const coach = coaching?.[index] || {};
        const isOpen = openIndex === index;

        return (
          <div key={index} className="rounded-3xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">

            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full p-6 flex justify-between items-center text-left hover:bg-white/[0.02] transition"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain size={16} className="text-violet-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5">Question {index + 1}</p>
                  <p className="text-slate-200 text-sm leading-6 truncate pr-4">{item.question}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className={`px-3 py-1 rounded-full border text-sm font-semibold ${scoreColor(item.score)}`}>
                  {item.score}/10
                </div>
                {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-white/[0.06] p-6 space-y-5">

                {/* Your Answer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={15} className="text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-300">Your Answer</h4>
                  </div>
                  <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5">
                    <p className="text-sm leading-7 text-slate-400 whitespace-pre-wrap">{item.answer}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-teal-500/15 bg-teal-500/[0.04] p-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-3">✅ What Went Well</h4>
                    <p className="text-sm text-slate-300 leading-6">{item.what_was_good}</p>
                  </div>
                  <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.04] p-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3">⚠️ What Was Missing</h4>
                    <p className="text-sm text-slate-300 leading-6">{item.what_was_missing}</p>
                  </div>
                </div>

                {/* Coaching Grid */}
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-teal-500/15 bg-teal-500/[0.04] p-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-3">Encouragement</h4>
                    <p className="text-sm text-slate-300 leading-6">{coach.encouragement}</p>
                  </div>
                  <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">Top Tip</h4>
                    <p className="text-sm text-slate-300 leading-6">{coach.top_tip}</p>
                  </div>
                </div>

                {/* Better Structure */}
                <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={15} className="text-amber-400" />
                    <h4 className="text-sm font-semibold text-slate-300">Better Answer Structure</h4>
                  </div>
                  <p className="text-sm leading-7 text-slate-400">{coach.better_answer_structure}</p>
                </div>

                {/* Missing Point */}
                <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3">Talking Point You Missed</h4>
                  <p className="text-sm leading-7 text-slate-300">{coach.example_talking_point}</p>
                </div>

                {/* Ideal Answer */}
                <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/[0.06] to-violet-500/[0.06] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={16} className="text-teal-400" />
                    <h4 className="text-sm font-semibold text-slate-200">Ideal Answer Framework</h4>
                  </div>
                  <p className="text-sm leading-7 text-slate-300 whitespace-pre-wrap">{coach.ideal_answer_framework}</p>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}