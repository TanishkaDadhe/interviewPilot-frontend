"use client";
import { Award, TrendingUp, TrendingDown } from "lucide-react";

type Props = { report: any };

export default function HeroSection({ report }: Props) {
  const verdictConfig: Record<string, { classes: string; label: string }> = {
    hire:         { classes: "bg-teal-500/10 text-teal-400 border-teal-500/25",    label: "Hire" },
    lean_hire:    { classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", label: "Lean Hire" },
    lean_no_hire: { classes: "bg-amber-500/10 text-amber-400 border-amber-500/25", label: "Lean No Hire" },
    no_hire:      { classes: "bg-rose-500/10 text-rose-400 border-rose-500/25",    label: "No Hire" },
  };

  const verdict = verdictConfig[report.overall_verdict] ?? verdictConfig["lean_no_hire"];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8">
      {/* background glow */}
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-teal-500/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-violet-500/[0.06] blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Award size={20} className="text-teal-400" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Interview Report</h1>
            </div>
            <p className="text-slate-500 text-sm">AI-powered evaluation of your interview performance</p>
          </div>

          <div className={`rounded-full border px-5 py-2 text-sm font-semibold ${verdict.classes}`}>
            {verdict.label}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-8">
          {/* Average Score */}
          <div className="rounded-2xl bg-black/20 border border-white/[0.06] p-5">
            <p className="text-[11px] uppercase tracking-wider text-slate-500">Average Score</p>
            <div className="mt-2 flex items-end gap-1.5">
              <h2 className="text-5xl font-bold tracking-tight text-white">{report.average_score}</h2>
              <span className="pb-1.5 text-slate-500 text-lg">/10</span>
            </div>
          </div>

          {/* Hire Confidence */}
          <div className="rounded-2xl bg-black/20 border border-white/[0.06] p-5">
            <p className="text-[11px] uppercase tracking-wider text-slate-500">Hire Confidence</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-5xl font-bold tracking-tight text-teal-400">{report.hire_confidence}%</h2>
              <TrendingUp className="text-teal-400" size={22} />
            </div>
          </div>

          {/* Growth Potential */}
          <div className="rounded-2xl bg-black/20 border border-white/[0.06] p-5">
            <p className="text-[11px] uppercase tracking-wider text-slate-500">Growth Potential</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-5xl font-bold tracking-tight text-amber-400">{100 - report.hire_confidence}%</h2>
              <TrendingDown className="text-amber-400" size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}