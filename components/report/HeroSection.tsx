"use client";

import {
  Award,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type Props = {
  report: any;
};

export default function HeroSection({
  report,
}: Props) {
  const verdictColors: Record<
    string,
    string
  > = {
    hire:
      "bg-green-500/20 text-green-300 border-green-500/30",

    lean_hire:
      "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",

    lean_no_hire:
      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",

    no_hire:
      "bg-red-500/20 text-red-300 border-red-500/30",
  };

  const verdictText: Record<
    string,
    string
  > = {
    hire: "Hire",

    lean_hire:
      "Lean Hire",

    lean_no_hire:
      "Lean No Hire",

    no_hire:
      "No Hire",
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-8
      "
    >
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <Award
                size={28}
                className="text-indigo-400"
              />

              <h1 className="text-5xl font-bold">
                Interview Report
              </h1>

            </div>

            <p className="mt-4 text-slate-400 text-lg">
              AI-powered evaluation
              of your interview
              performance
            </p>

          </div>

          <div
            className={`
              rounded-full
              border
              px-6
              py-3
              text-lg
              font-semibold
              ${
                verdictColors[
                  report.overall_verdict
                ] ||
                verdictColors[
                  "lean_no_hire"
                ]
              }
            `}
          >
            {
              verdictText[
                report.overall_verdict
              ]
            }
          </div>

        </div>

        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* SCORE */}

          <div className="rounded-3xl bg-[#0b1326] p-6">

            <p className="text-slate-400">
              Average Score
            </p>

            <div className="mt-3 flex items-end gap-2">

              <h2 className="text-5xl font-bold">
                {report.average_score}
              </h2>

              <span className="pb-2 text-slate-500">
                /10
              </span>

            </div>

          </div>

          {/* HIRE */}

          <div className="rounded-3xl bg-[#0b1326] p-6">

            <p className="text-slate-400">
              Hire Confidence
            </p>

            <div className="mt-3 flex items-center gap-3">

              <h2 className="text-5xl font-bold">
                {
                  report.hire_confidence
                }
                %
              </h2>

              <TrendingUp
                className="text-green-400"
                size={24}
              />

            </div>

          </div>

          {/* IMPROVEMENT */}

          <div className="rounded-3xl bg-[#0b1326] p-6">

            <p className="text-slate-400">
              Growth Potential
            </p>

            <div className="mt-3 flex items-center gap-3">

              <h2 className="text-5xl font-bold">
                {100 -
                  report
                    .hire_confidence}
                %
              </h2>

              <TrendingDown
                className="text-orange-400"
                size={24}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}