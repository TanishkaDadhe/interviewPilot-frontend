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

  const sessionId =
    params.sessionId as string;

  const [loading, setLoading] =
    useState(true);

  const [report, setReport] =
    useState<any>(null);
  
  const [user, setUser] =
    useState<any>(null);


  useEffect(() => {
    if (sessionId) {
      fetchReport();
    }
  }, [sessionId]);

  const fetchReport = async () => {
    try {

      const meResponse =
        await api.get("/auth/me");

      setUser(meResponse.data);

      const response =
        await api.get(
          `/interview/${sessionId}/summary`
        );

      console.log(response.data);

      setReport(response.data);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load report"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#081020] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#081020] text-white flex items-center justify-center">
        Report not found
      </div>
    );
  }

  const chartData =
    report.answers.map(
      (
        item: any,
        index: number
      ) => ({
        question: `Q${index + 1}`,
        score: item.score,
      })
    );

  return (
    <div className="min-h-screen bg-[#081020] text-white">

      <Sidebar />
      <Topbar user={user} />

      <main className="ml-[280px] pt-16 p-8">

        {/* HERO */}

        <HeroSection report={report} />

        {/* STATS */}

        <div className="grid grid-cols-4 gap-6 mt-6">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm">
              Duration
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              42m
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm">
              Questions
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {report.total_questions}
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm">
              Hire Confidence
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {report.hire_confidence}%
            </h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-slate-400 text-sm">
              Job Fit
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {report.job_fit_score}%
            </h3>
          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="grid grid-cols-12 gap-6 mt-6">

          {/* LEFT */}

          <div className="col-span-8 space-y-6">

            {/* SUMMARY */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <h2 className="text-3xl font-bold mb-4">
                AI Executive Summary
              </h2>

              <p className="text-slate-300 leading-8 whitespace-pre-wrap">
                {report.overall_feedback}
              </p>

            </div>

            {/* CHART */}

            <ScoreChart
              chartData={chartData}
            />

            {/* QUESTIONS */}

            <QuestionAnalysis
               answers={report.answers}
               coaching={report.per_question}
            />

          </div>

          {/* RIGHT */}

          <div className="col-span-4 space-y-6">

            {/* JOB FIT */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <h3 className="text-2xl font-bold mb-4">
                Candidate Fit
              </h3>

              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{
                    width: `${report.job_fit_score}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-right text-xl font-bold">
                {report.job_fit_score}%
              </p>

            </div>

            {/* STRENGTH */}

            <div className="rounded-3xl border border-indigo-500/30 bg-white/[0.03] p-6">

              <p className="text-xs uppercase tracking-widest text-indigo-300">
                Top Strength
              </p>

              <h3 className="mt-3 text-xl font-bold">
                {report.top_strength}
              </h3>

            </div>

            {/* IMPROVEMENT */}

            <div className="rounded-3xl border border-orange-500/30 bg-white/[0.03] p-6">

              <p className="text-xs uppercase tracking-widest text-orange-300">
                Critical Improvement
              </p>

              <h3 className="mt-3 text-xl font-bold">
                {report.critical_improvement}
              </h3>

            </div>

            {/* ROADMAP */}

            <RoadmapCard
              roadmap={report.roadmap}
            />

          </div>

        </div>

      </main>

    </div>
  );
}