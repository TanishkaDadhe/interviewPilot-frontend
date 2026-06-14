"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

type Props = {
  chartData: { question: string; score: number }[];
};

export default function ScoreChart({ chartData }: Props) {
  const getBarColor = (score: number) => {
    if (score >= 8) return "#2dd4bf"; // teal
    if (score >= 6) return "#a78bfa"; // violet
    if (score >= 4) return "#fbbf24"; // amber
    return "#fb7185";                 // rose
  };

  const highest = Math.max(...chartData.map((q) => q.score));
  const lowest = Math.min(...chartData.map((q) => q.score));

  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Performance Breakdown</h2>
        <p className="text-slate-500 text-sm mt-1">Score achieved per question</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="question" stroke="rgba(160,180,220,0.3)" tick={{ fill: "rgba(160,180,220,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} stroke="rgba(160,180,220,0.3)" tick={{ fill: "rgba(160,180,220,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0C1528",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
              }}
              labelStyle={{
                color: "#ffffff",
              }}
              itemStyle={{
                color: "#ffffff",
              }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.score)} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-5 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block"></span>8–10 Excellent</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block"></span>6–7 Good</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>4–5 Fair</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>0–3 Needs work</span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { label: "Highest Score", value: `${highest}/10`, color: "text-teal-400" },
          { label: "Lowest Score",  value: `${lowest}/10`,  color: "text-rose-400" },
          { label: "Questions",     value: chartData.length, color: "text-violet-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</p>
            <h3 className={`mt-1.5 text-3xl font-bold tracking-tight ${s.color}`}>{s.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}