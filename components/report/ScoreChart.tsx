"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  chartData: {
    question: string;
    score: number;
  }[];
};

export default function ScoreChart({
  chartData,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Performance Breakdown
          </h2>

          <p className="text-slate-400 mt-2">
            Score achieved in each interview question
          </p>
        </div>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="question"
              stroke="#94a3b8"
              tick={{
                fill: "#94a3b8",
              }}
            />

            <YAxis
              domain={[0, 10]}
              stroke="#94a3b8"
              tick={{
                fill: "#94a3b8",
              }}
            />

            <Tooltip
              contentStyle={{
                background:
                  "#081020",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius:
                  "16px",
                color: "white",
              }}
            />

            <Bar
              dataKey="score"
              radius={[10, 10, 0, 0]}
              fill="#6366f1"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-[#0b1326] p-4">

          <p className="text-slate-400 text-sm">
            Highest Score
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {Math.max(
              ...chartData.map(
                (q) => q.score
              )
            )}
            /10
          </h3>

        </div>

        <div className="rounded-2xl bg-[#0b1326] p-4">

          <p className="text-slate-400 text-sm">
            Lowest Score
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {Math.min(
              ...chartData.map(
                (q) => q.score
              )
            )}
            /10
          </h3>

        </div>

        <div className="rounded-2xl bg-[#0b1326] p-4">

          <p className="text-slate-400 text-sm">
            Questions
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {chartData.length}
          </h3>

        </div>

      </div>

    </div>
  );
}