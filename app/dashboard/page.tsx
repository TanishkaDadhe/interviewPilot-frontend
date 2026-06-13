"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatsCards from "@/components/dashboard/StatsCards";
import PrepareInterview from "@/components/dashboard/PrepareInterview";
import StartInterview from "@/components/dashboard/StartInterview";
import InterviewHistory from "@/components/dashboard/InterviewHistory";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [isSaved, setIsSaved] =
  useState(false);

  const [resumeUploaded, setResumeUploaded] =
  useState(false);

  const [interviewType, setInterviewType] =
  useState("mixed");

  const [difficulty, setDifficulty] =
    useState("medium");

  const [numQuestions, setNumQuestions] =
    useState(5);

  const [focusArea, setFocusArea] =
    useState("");

  const [starting, setStarting] =
    useState(false);



  const handleProfileSetup = async () => {
    if (!resumeFile) {
      alert("Please upload a resume PDF");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append(
        "resume",
        resumeFile
      );

      formData.append(
        "job_description",
        jobDescription
      );

      const response =
        await api.post(
          "/profile/setup",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(
        response.data.message
      );
      setIsSaved(true);

    } catch (error: any) {
      alert(
        error.response?.data?.detail ||
        "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await api.get("/auth/me");

        setUser(response.data);

        const profileResponse =
          await api.get("/profile");

        const profile =
          profileResponse.data;

        const historyResponse =
          await api.get("/interview/history");

        const sessions =
          historyResponse.data || [];

        const completed =
          sessions.filter(
            (s: any) =>
              s.status === "completed"
          );

        const completedInterviews =
          completed.length;

        const averageScore =
          completed.length > 0
            ? Math.round(
                completed.reduce(
                  (sum: number, s: any) =>
                    sum + (s.average_score || 0),
                  0
                ) / completed.length
              )
            : 0;

        const bestScore =
          completed.length > 0
            ? Math.max(
                ...completed.map(
                  (s: any) =>
                    s.average_score || 0
                )
              )
            : 0;

        const hireConfidence =
          completed.length > 0
            ? Math.round(
                completed.reduce(
                  (sum: number, s: any) =>
                    sum +
                    (s.hire_confidence || 0),
                  0
                ) / completed.length
              )
            : 0;

        const oneWeekAgo =
          new Date();

        oneWeekAgo.setDate(
          oneWeekAgo.getDate() - 7
        );

        const thisWeek =
          completed.filter(
            (s: any) =>
              s.completed_at &&
              new Date(
                s.completed_at
              ) >= oneWeekAgo
          ).length;

        setStats({
          completedInterviews,
          averageScore,
          hireConfidence,
          bestScore,
          thisWeek,
        });

        setJobDescription(
          profile.job_description || ""
        );

        if (profile.resume_text) {
          setResumeUploaded(true);
        }

      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");

        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleStartInterview =
  async () => {
    if (starting) return;
    
    try {
      setStarting(true);

      const response =
        await api.post(
          "/interview/start",
          {
            interview_type:
              interviewType,

            difficulty,

            num_questions:
              numQuestions,

            focus_area:
              focusArea,
          }
        );

      router.push(
        `/interview/${response.data.session_id}`
      );
    } catch (error: any) {
      alert(
        error.response?.data?.detail ||
        "Failed to start interview"
      );
    } finally {
      setStarting(false);
    }
  };
  
  const [stats, setStats] = useState({
    completedInterviews: 0,
    averageScore: 0,
    hireConfidence: 0,
    bestScore: 0,
    thisWeek: 0,
  });



  return (
    <div className="min-h-screen bg-[#0b1326] text-white">
      <Sidebar />

      <div className="ml-[280px]">
        <Topbar user={user} />

        <main className="p-8 pt-24">
          <div className="mb-8">
            <h1 className="text-5xl font-bold">
              Welcome back, {user?.name || "Candidate"} 👋
            </h1>

            <p className="text-slate-400 mt-2">
              You're in the top 5% of candidates this week.
            </p>
          </div>

          <StatsCards stats={stats} />

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <PrepareInterview
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              handleProfileSetup={handleProfileSetup}
              uploading={uploading}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
              resumeUploaded={resumeUploaded}
              setResumeUploaded={setResumeUploaded}
            />
            <StartInterview
              interviewType={interviewType}
              setInterviewType={setInterviewType}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              numQuestions={numQuestions}
              setNumQuestions={setNumQuestions}
              focusArea={focusArea}
              setFocusArea={setFocusArea}
              starting={starting}
              handleStartInterview={handleStartInterview}
            />
          </div>

          <div className="mt-8">
            <InterviewHistory />
          </div>
        </main>
      </div>
    </div>
  );
}