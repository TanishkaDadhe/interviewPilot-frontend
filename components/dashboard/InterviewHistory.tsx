"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

export default function InterviewHistory() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/interview/history");
      setInterviews(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const difficultyClass = (d: string) => {
    if (d === "easy") return "bg-teal-500/10 text-teal-400";
    if (d === "hard") return "bg-rose-500/10 text-rose-400";
    return "bg-amber-500/10 text-amber-400";
  };

  const scoreClass = (score: number) => {
    if (score >= 8) return "text-teal-400 font-semibold";
    if (score >= 6) return "text-amber-400 font-semibold";
    return "text-rose-400 font-semibold";
  };

  const statusClass = (s: string) =>
    s === "completed"
      ? "bg-teal-500/10 text-teal-400"
      : "bg-violet-500/10 text-violet-400";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">

      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Interview History
        </h2>
      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-500">
          Loading interviews...
        </div>
      ) : interviews.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No interviews found
        </div>
      ) : (
        <table className="w-full">

          <thead className="bg-white/[0.03]">
            <tr className="text-left">
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-500">Type</th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-500">Difficulty</th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-500">Score</th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-500">Verdict</th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-500">Status</th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-slate-500">Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((item, index) => (
              <tr
                key={index}
                className="border-t border-white/[0.04] hover:bg-white/[0.02] transition"
              >
                <td className="px-5 py-3.5 capitalize text-slate-300 text-sm">
                  {item.interview_type}
                </td>

                <td className="px-5 py-3.5">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${difficultyClass(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </td>

                <td className={`px-5 py-3.5 text-sm ${item.average_score != null ? scoreClass(item.average_score) : "text-slate-500"}`}>
                  {item.average_score ?? "-"}
                </td>

                <td className="px-5 py-3.5 capitalize text-sm text-slate-300">
                  {item.overall_verdict ?? "-"}
                </td>

                <td className="px-5 py-3.5">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-3.5 text-sm text-slate-500">
                  {new Date(item.started_at).toLocaleDateString()}
                </td>

                <td className="px-5 py-3.5">
                  {item.status === "completed" && (
                    <button
                      onClick={() => router.push(`/report/${item.session_id}`)}
                      className="border border-white/10 px-4 py-1.5 rounded-lg text-sm text-slate-300 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10 transition"
                    >
                      View Report
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}