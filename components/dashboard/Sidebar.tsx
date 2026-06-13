"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import api from "@/src/lib/api";

import {
  LayoutDashboard,
  History,
  User,
  LogOut,
} from "lucide-react";

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
      const response =
        await api.get(
          "/interview/history"
        );

      const sessions =
        response.data;

      if (sessions.length === 0) {
        alert(
          "No interviews found"
        );
        return;
      }

      router.push(
        `/report/${sessions[0].session_id}`
      );
    } catch {
      alert(
        "Failed to load history"
      );
    }
  };
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-white/10 bg-[#081020]">
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          InterviewPilot
        </h1>

        <p className="text-slate-400">
          AI Interview Prep
        </p>
      </div>

      <nav className="px-4 space-y-3">

        <Link href="/dashboard">
          <button
            className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${
              pathname === "/dashboard"
                ? "bg-indigo-500/10 border border-indigo-500/20"
                : "hover:bg-white/5"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
        </Link>

        <button
          onClick={handleHistoryClick}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${
            pathname.startsWith("/report")
              ? "bg-indigo-500/10 border border-indigo-500/20"
              : "hover:bg-white/5"
          }`}
        >
          <History size={20} />
          Interview History
        </button>

        <Link href="/dashboard/profile">
          <button
            className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${
              pathname.startsWith("/dashboard/profile")
                ? "bg-indigo-500/10 border border-indigo-500/20"
                : "hover:bg-white/5"
            }`}
          >
            <User size={20} />
            Profile
          </button>
        </Link>

      </nav>

      <div className="absolute bottom-8 left-4 right-4">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/5">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}