"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import api from "@/src/lib/api";
import { LayoutDashboard, History, User, LogOut } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    router.replace("/login");
  };

  const handleHistoryClick = async () => {
    try {
      const response = await api.get("/interview/history");
      const sessions = response.data;
      if (sessions.length === 0) { alert("No interviews found"); return; }
      router.push(`/report/${sessions[0].session_id}`);
    } catch {
      alert("Failed to load history");
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-white/[0.07] bg-[#081020] flex flex-col">

      <div className="p-8 border-b border-white/[0.06]">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
          InterviewPilot
        </h1>
        <p className="text-slate-500 text-sm mt-1">AI Interview Prep</p>
      </div>

      <nav className="px-4 pt-4 space-y-1 flex-1">
        <Link href="/dashboard">
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition relative ${
            pathname === "/dashboard"
              ? "bg-teal-500/[0.07] border border-teal-500/20 text-teal-400 before:absolute before:left-[-1px] before:top-1/4 before:bottom-1/4 before:w-[3px] before:bg-teal-400 before:rounded-r"
              : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
          }`}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>
        </Link>

        <button
          onClick={handleHistoryClick}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition relative ${
            pathname.startsWith("/report")
              ? "bg-teal-500/[0.07] border border-teal-500/20 text-teal-400"
              : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
          }`}>
          <History size={18} />
          Interview History
        </button>

        <Link href="/dashboard/profile">
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition relative ${
            pathname.startsWith("/dashboard/profile")
              ? "bg-teal-500/[0.07] border border-teal-500/20 text-teal-400"
              : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
          }`}>
            <User size={18} />
            Profile
          </button>
        </Link>
      </nav>

      <div className="p-4 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-500 hover:bg-rose-500/[0.07] hover:text-rose-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}