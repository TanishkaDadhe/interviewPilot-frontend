"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

export default function InterviewHistory() {
  const router = useRouter();

  const [interviews, setInterviews] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response =
        await api.get(
          "/interview/history"
        );

      setInterviews(
        response.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">

      <div className="p-6 border-b border-white/10">
        <h2 className="text-3xl font-semibold">
          Recent Interview History
        </h2>
      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-400">
          Loading interviews...
        </div>
      ) : interviews.length === 0 ? (
        <div className="p-10 text-center text-slate-400">
          No interviews found
        </div>
      ) : (
        <table className="w-full">

          <thead className="bg-white/5">
            <tr className="text-left text-slate-400">
              <th className="p-4">
                Type
              </th>

              <th>
                Difficulty
              </th>

              <th>
                Score
              </th>

              <th>
                Verdict
              </th>

              <th>
                Status
              </th>

              <th>
                Date
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody>

            {interviews.map(
              (item, index) => (
                <tr
                  key={index}
                  className="border-t border-white/5"
                >
                  <td className="p-4 capitalize">
                    {item.interview_type}
                  </td>

                  <td className="capitalize">
                    {item.difficulty}
                  </td>

                  <td>
                    {item.average_score ?? "-"}
                  </td>

                  <td className="capitalize">
                    {item.overall_verdict ??
                      "-"}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>
                    {new Date(
                      item.started_at
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    {item.status ===
                      "completed" && (
                      <button
                        onClick={() =>
                          router.push(
                            `/report/${item.session_id}`
                          )
                        }
                        className="
                          border
                          border-slate-700
                          px-4
                          py-2
                          rounded-lg
                          hover:bg-slate-800
                        "
                      >
                        View Report
                      </button>
                    )}

                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>
      )}
    </div>
  );
}