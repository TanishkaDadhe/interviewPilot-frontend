"use client";

import {
  Bell,
  Settings,
  Search,
} from "lucide-react";

type Props = {
  user?: {
    name?: string;
    email?: string;
  } | null;
};

export default function Topbar({
  user,
}: Props) {
  return (
    <header className="fixed top-0 left-[280px] right-0 h-16 border-b border-white/10 bg-[#081020]/80 backdrop-blur-xl z-50">
      <div className="h-full flex items-center justify-between px-8">

        <div className="relative w-80">
          {/* so that the bell + settings and all go to right side  */}
        </div>

        <div className="flex items-center gap-6">

          <Bell
            className="cursor-pointer text-slate-400 hover:text-white"
            size={20}
          />

          <Settings
            className="cursor-pointer text-slate-400 hover:text-white"
            size={20}
          />

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-3">

            <div className="text-right">
              <p className="text-sm font-medium">
                {user?.name || "Candidate"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email}
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "C"}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}