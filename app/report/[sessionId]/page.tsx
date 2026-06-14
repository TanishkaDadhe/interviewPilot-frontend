"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import HeroSection from "@/components/report/HeroSection";
import ScoreChart from "@/components/report/ScoreChart";
import QuestionAnalysis from "@/components/report/QuestionAnalysis";
import RoadmapCard from "@/components/report/RoadmapCard";
import api from "@/src/lib/api";

export default function ReportPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (sessionId) fetchReport();
  }, [sessionId]);

  const fetchReport = async () => {
    try {
      const meResponse = await api.get("/auth/me");
      setUser(meResponse.data);
      const response = await api.get(`/interview/${sessionId}/summary`);
      setReport(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060D1F] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#060D1F] text-white flex items-center justify-center text-slate-400">
        Report not found
      </div>
    );
  }

  const chartData = report.answers.map((item: any, index: number) => ({
    question: `Q${index + 1}`,
    score: item.score,
  }));

  return (
    <div className="min-h-screen bg-[#060D1F] text-white">
      <Sidebar />
      <Topbar user={user} />

      <main className="ml-[280px] pt-22 p-8">
        <HeroSection report={report} />

        {/* STATS ROW */}
        <div className="grid grid-cols-4 gap-5 mt-6">
          {[
            {
              label: "Highest Score",
              value: `${Math.max(...report.answers.map((a: any) => a.score))}/10`,
              accent: "before:from-teal-400/40",
              icon: "text-teal-400",
            },
            { label: "Questions", value: report.answers?.length, accent: "before:from-violet-400/40", icon: "text-violet-400" },
            { label: "Hire Confidence", value: `${report.hire_confidence}%`, accent: "before:from-amber-400/40", icon: "text-amber-400" },
            { label: "Job Fit", value: `${report.job_fit_score}%`, accent: "before:from-rose-400/40", icon: "text-rose-400" },
          ].map((s) => (
            <div key={s.label} className={`relative rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r ${s.accent} before:to-transparent`}>
              <p className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</p>
              <h3 className={`mt-2 text-4xl font-bold tracking-tight ${s.icon}`}>{s.value}</h3>
            </div>
          ))}
        </div>

        {/* METRICS EXPLAINER */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-5 py-4">
          <span className="text-slate-500 text-lg mt-0.5">ℹ️</span>
          <p className="text-xs text-slate-500 leading-6">
            <span className="text-slate-300 font-medium">Job Fit</span> is based on your resume vs. the job description — measured before the interview.{" "}
            <span className="text-slate-300 font-medium">Hire Confidence</span> is based on how you actually performed during the interview. A high Job Fit with a low Hire Confidence means your background is relevant, but your answers didn't fully demonstrate it yet.
          </p>
        </div>


        {/* MAIN CONTENT */}
        <div className="grid grid-cols-12 gap-6 mt-6">

          {/* LEFT */}
          <div className="col-span-8 space-y-6">

            {/* SUMMARY */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8">
              <h2 className="text-2xl font-bold mb-4 tracking-tight">AI Executive Summary</h2>
              <p className="text-slate-300 leading-8 whitespace-pre-wrap text-sm">{report.overall_feedback}</p>
            </div>

            <ScoreChart chartData={chartData} />
            <QuestionAnalysis answers={report.answers} coaching={report.per_question} />
          </div>

          {/* RIGHT */}
          <div className="col-span-4 space-y-5">

            {/* JOB FIT */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold mb-4 tracking-tight">Interview Readiness</h3>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-violet-500 transition-all duration-700"
                  style={{ width: `${report.hire_confidence}%` }}
                />
              </div>
              <p className="mt-2 text-right text-2xl font-bold text-teal-400">{report.hire_confidence}%</p>
            </div>

            {/* STRENGTH */}
            <div className="rounded-3xl border border-teal-500/20 bg-teal-500/[0.04] p-6">
              <p className="text-[10px] uppercase tracking-widest text-teal-400 mb-3">Top Strength</p>
              <h3 className="text-base font-semibold text-slate-200">{report.top_strength}</h3>
            </div>

            {/* IMPROVEMENT */}
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
              <p className="text-[10px] uppercase tracking-widest text-amber-400 mb-3">Critical Improvement</p>
              <h3 className="text-base font-semibold text-slate-200">{report.critical_improvement}</h3>
            </div>

            <RoadmapCard roadmap={report.roadmap} />
          </div>

        </div>
      </main>
    </div>
  );
}