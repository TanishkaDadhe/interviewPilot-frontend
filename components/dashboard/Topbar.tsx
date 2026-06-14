"use client";
import { Bell, Settings } from "lucide-react";

type Props = {
  user?: { name?: string; email?: string } | null;
};

export default function Topbar({ user }: Props) {
  return (
    <header className="fixed top-0 left-[280px] right-0 h-16 border-b border-white/[0.07] bg-[#081020]/80 backdrop-blur-xl z-50">
      <div className="h-full flex items-center justify-end px-8 gap-5">

        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:border-teal-500/40 hover:text-teal-400 transition">
          <Bell size={16} />
        </button>

        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:border-teal-500/40 hover:text-teal-400 transition">
          <Settings size={16} />
        </button>

        <div className="w-px h-5 bg-white/[0.08]" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">
              {user?.name || "Candidate"}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center text-xs font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() || "C"}
          </div>
        </div>

      </div>
    </header>
  );
}