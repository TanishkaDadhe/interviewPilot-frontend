"use client";

import { useRouter } from "next/navigation";
import api from "@/src/lib/api";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let valid = true;
    if (!email.trim()) { newErrors.email = "Email is required"; valid = false; }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) { newErrors.email = "Please enter a valid email address"; valid = false; }
    if (!password) { newErrors.password = "Password is required"; valid = false; }
    else if (password.length < 6) { newErrors.password = "Password must be at least 6 characters"; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("user_name", response.data.name);
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full rounded-xl border bg-black/20 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition";

  return (
    <div className="min-h-screen bg-[#060D1F] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-indigo-500/[0.04] blur-[80px] pointer-events-none" />

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
        <div className="grid lg:grid-cols-2">

          {/* LEFT — branding panel */}
          <div className="relative p-12 flex flex-col justify-between bg-gradient-to-br from-teal-500/[0.06] to-violet-500/[0.06] border-r border-white/[0.06] overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-400/[0.08] blur-3xl pointer-events-none" />
            <div className="absolute -left-10 bottom-10 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-14">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
                  IP
                </div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
                  InterviewPilot
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2 mb-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-teal-400 font-medium">AI-Powered Prep</p>
                <h2 className="text-5xl font-bold text-white leading-tight tracking-tight">
                  Master your<br />
                  <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
                    next interview.
                  </span>
                </h2>
              </div>

              <p className="text-slate-400 text-sm leading-7 max-w-sm">
                Simulate high-stakes interviews with advanced AI, get detailed evaluations and personalized coaching reports.
              </p>

              {/* Feature pills */}
              <div className="mt-10 space-y-3">
                {[
                  { label: "AI-generated questions from your resume", color: "bg-teal-500/10 border-teal-500/20 text-teal-400" },
                  { label: "Per-question coaching & ideal frameworks", color: "bg-violet-500/10 border-violet-500/20 text-violet-400" },
                  { label: "Hire confidence score & growth roadmap", color: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
                ].map((f) => (
                  <div key={f.label} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${f.color} block w-fit`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                    {f.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom avatars */}
            <div className="relative z-10 mt-14 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {["bg-teal-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"].map((c, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full ${c} border-2 border-[#060D1F]`} />
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-widest text-slate-500">
                Confidence starts with practice
              </span>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="p-12 flex items-center justify-center">
            <div className="w-full max-w-sm">

              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
                <p className="text-slate-500 text-sm mt-1.5">Sign in to your preparation dashboard.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-500 block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className={`${inputBase} pl-11 ${errors.email ? "border-rose-500/60 focus:border-rose-500" : "border-white/[0.08] focus:border-teal-500/50"}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] uppercase tracking-wider text-slate-500">Password</label>
                    <button type="button" className="text-xs text-teal-400 hover:text-teal-300 transition">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`${inputBase} pl-11 pr-11 ${errors.password ? "border-rose-500/60 focus:border-rose-500" : "border-white/[0.08] focus:border-teal-500/50"}`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-violet-600 py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Signing in..." : "Sign In"}
                    {!loading && <ArrowRight size={16} />}
                  </span>
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#060D1F] px-3 text-xs text-slate-600">or</span>
                  </div>
                </div>

                {/* SIGNUP LINK */}
                <Link href="/signup">
                  <button
                    type="button"
                    className="w-full rounded-xl border border-white/[0.09] py-3.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:border-white/20 transition active:scale-[0.98]"
                  >
                    Create an Account
                  </button>
                </Link>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}