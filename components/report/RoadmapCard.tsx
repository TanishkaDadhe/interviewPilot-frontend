"use client";
import { Target, CheckCircle2 } from "lucide-react";

type Props = { roadmap: string[] };

export default function RoadmapCard({ roadmap }: Props) {
  const dotColors = [
    "bg-teal-500/15 text-teal-400",
    "bg-violet-500/15 text-violet-400",
    "bg-amber-500/15 text-amber-400",
    "bg-rose-500/15 text-rose-400",
  ];

  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-9 w-9 rounded-xl bg-teal-500/10 flex items-center justify-center">
          <Target size={18} className="text-teal-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight">Growth Roadmap</h2>
          <p className="text-slate-500 text-xs mt-0.5">Personalized improvement plan</p>
        </div>
      </div>

      <div className="space-y-4">
        {roadmap?.map((item, index) => (
          <div key={index} className="relative pl-10">
            {index !== roadmap.length - 1 && (
              <div className="absolute left-[15px] top-8 h-full w-px bg-white/[0.06]" />
            )}
            <div className={`absolute left-0 top-0 h-7 w-7 rounded-full flex items-center justify-center ${dotColors[index % dotColors.length]}`}>
              <CheckCircle2 size={14} />
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
              <p className="text-xs leading-6 text-slate-400">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}