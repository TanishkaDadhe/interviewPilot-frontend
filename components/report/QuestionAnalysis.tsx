"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Brain,
  MessageSquare,
  Lightbulb,
  Trophy,
} from "lucide-react";

type QuestionItem = {
  question: string;
  answer: string;
  score: number;
  evaluation?: string;
};

type CoachingItem = {
  encouragement?: string;
  top_tip?: string;
  better_answer_structure?: string;
  example_talking_point?: string;
  ideal_answer_framework?: string;
};

type Props = {
  answers: QuestionItem[];
  coaching: CoachingItem[];
};

export default function QuestionAnalysis({
  answers,
  coaching,
}: Props) {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <div className="space-y-6">

      {answers.map((item, index) => {
        const coach =
          coaching?.[index] || {};

        return (
          <div
            key={index}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              overflow-hidden
            "
          >
            {/* HEADER */}

            <button
              onClick={() =>
                setOpenIndex(
                  openIndex === index
                    ? null
                    : index
                )
              }
              className="
                w-full
                p-6
                flex
                justify-between
                items-center
                text-left
              "
            >
              <div>

                <div className="flex items-center gap-4 mb-3">

                  <div
                    className="
                      h-10
                      w-10
                      rounded-xl
                      bg-indigo-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Brain
                      size={18}
                      className="text-indigo-300"
                    />
                  </div>

                  <h3 className="text-xl font-semibold">
                    Question {index + 1}
                  </h3>

                </div>

                <p className="text-slate-300 max-w-4xl">
                  {item.question}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-indigo-500/20
                    text-indigo-300
                    font-semibold
                  "
                >
                  {item.score}/10
                </div>

                {openIndex === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}

              </div>
            </button>

            {/* BODY */}

            {openIndex === index && (
              <div className="border-t border-white/10 p-6 space-y-6">

                {/* Candidate Answer */}

                <div>

                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare
                      size={18}
                    />
                    <h4 className="font-semibold text-lg">
                      Your Answer
                    </h4>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-[#0b1326]
                      border
                      border-white/5
                      p-5
                    "
                  >
                    <p className="leading-7 text-slate-300 whitespace-pre-wrap">
                      {item.answer}
                    </p>
                  </div>

                </div>

                {/* Evaluation */}

                <div>

                  <div className="flex items-center gap-2 mb-3">
                    <Brain
                      size={18}
                    />
                    <h4 className="font-semibold text-lg">
                      AI Evaluation
                    </h4>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-[#0b1326]
                      border
                      border-white/5
                      p-5
                    "
                  >
                    <p className="leading-7 whitespace-pre-wrap text-slate-300">
                      {item.evaluation}
                    </p>
                  </div>

                </div>

                {/* Coaching Grid */}

                <div className="grid lg:grid-cols-2 gap-6">

                  <div
                    className="
                      rounded-2xl
                      bg-[#0b1326]
                      border
                      border-green-500/20
                      p-5
                    "
                  >
                    <h4 className="font-semibold text-green-300 mb-3">
                      Encouragement
                    </h4>

                    <p className="text-slate-300 leading-7">
                      {coach.encouragement}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-[#0b1326]
                      border
                      border-yellow-500/20
                      p-5
                    "
                  >
                    <h4 className="font-semibold text-yellow-300 mb-3">
                      Top Tip
                    </h4>

                    <p className="text-slate-300 leading-7">
                      {coach.top_tip}
                    </p>
                  </div>

                </div>

                {/* Better Structure */}

                <div
                  className="
                    rounded-2xl
                    bg-[#0b1326]
                    border
                    border-white/5
                    p-5
                  "
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb
                      size={18}
                    />
                    <h4 className="font-semibold">
                      Better Answer Structure
                    </h4>
                  </div>

                  <p className="leading-7 text-slate-300">
                    {coach.better_answer_structure}
                  </p>
                </div>

                {/* Missing Point */}

                <div
                  className="
                    rounded-2xl
                    bg-[#0b1326]
                    border
                    border-white/5
                    p-5
                  "
                >
                  <h4 className="font-semibold mb-3 text-indigo-300">
                    Important Talking Point You Missed
                  </h4>

                  <p className="leading-7 text-slate-300">
                    {coach.example_talking_point}
                  </p>
                </div>

                {/* Ideal Answer */}

                <div
                  className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-500/10
                    to-purple-500/10
                    border
                    border-indigo-500/20
                    p-6
                  "
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy
                      size={18}
                    />

                    <h4 className="font-semibold text-lg">
                      Ideal Answer Framework
                    </h4>
                  </div>

                  <p className="leading-8 text-slate-200 whitespace-pre-wrap">
                    {coach.ideal_answer_framework}
                  </p>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}