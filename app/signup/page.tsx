"use client";

import { useRouter } from "next/navigation";
import api from "@/src/lib/api";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ fullName: "", email: "", password: "" });

  const validateForm = () => {
    const newErrors = { fullName: "", email: "", password: "" };
    let valid = true;
    if (!fullName.trim()) { newErrors.fullName = "Full name is required"; valid = false; }
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
      await api.post("/auth/signup", { name: fullName, email, password });
      alert("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      alert(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full rounded-xl border bg-black/20 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition";

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthConfig = [
    { label: "", color: "" },
    { label: "Weak", color: "bg-rose-500" },
    { label: "Good", color: "bg-amber-400" },
    { label: "Strong", color: "bg-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-[#060D1F] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.07] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
        <div className="grid lg:grid-cols-2">

          {/* LEFT — form */}
          <div className="p-12 flex items-center justify-center order-2 lg:order-1">
            <div className="w-full max-w-sm">

              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                <p className="text-slate-500 text-sm mt-1.5">Begin your AI interview preparation journey.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>

                {/* FULL NAME */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-slate-500 block mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Arjun Mehta"
                      className={`${inputBase} pl-11 ${errors.fullName ? "border-rose-500/60 focus:border-rose-500" : "border-white/[0.08] focus:border-teal-500/50"}`}
                    />
                  </div>
                  {errors.fullName && <p className="mt-1.5 text-xs text-rose-400">{errors.fullName}</p>}
                </div>

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
                  <label className="text-[11px] uppercase tracking-wider text-slate-500 block mb-2">Password</label>
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

                  {/* Password strength */}
                  {password.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <div key={level} className={`h-1 flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? strengthConfig[passwordStrength].color : "bg-white/[0.06]"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        Strength: <span className={`font-medium ${passwordStrength === 1 ? "text-rose-400" : passwordStrength === 2 ? "text-amber-400" : "text-teal-400"}`}>{strengthConfig[passwordStrength].label}</span>
                      </p>
                    </div>
                  )}
                  {errors.password && <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-violet-600 py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Creating Account..." : "Create Account"}
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

                {/* LOGIN LINK */}
                <Link href="/login">
                  <button
                    type="button"
                    className="w-full rounded-xl border border-white/[0.09] py-3.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:border-white/20 transition active:scale-[0.98]"
                  >
                    Already have an account? Sign in
                  </button>
                </Link>

              </form>
            </div>
          </div>

          {/* RIGHT — branding panel */}
          <div className="relative p-12 flex flex-col justify-between bg-gradient-to-bl from-violet-500/[0.06] to-teal-500/[0.06] border-l border-white/[0.06] overflow-hidden order-1 lg:order-2">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-400/[0.08] blur-3xl pointer-events-none" />
            <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-teal-500/[0.08] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-14">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
                  IP
                </div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent">
                  InterviewPilot
                </span>
              </div>

              <div className="space-y-2 mb-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-violet-400 font-medium">Get Started Free</p>
                <h2 className="text-5xl font-bold text-white leading-tight tracking-tight">
                  Start your<br />
                  <span className="bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                    journey today.
                  </span>
                </h2>
              </div>

              <p className="text-slate-400 text-sm leading-7 max-w-sm">
                Create your account and get personalized AI-powered mock interviews, detailed feedback and coaching reports instantly.
              </p>

              {/* What you get */}
              <div className="mt-10 space-y-4">
                <p className="text-[11px] uppercase tracking-wider text-slate-500">What you get</p>
                {[
                  { text: "Unlimited mock interviews", color: "text-teal-400" },
                  { text: "Detailed per-question analysis", color: "text-violet-400" },
                  { text: "Hire confidence scoring", color: "text-amber-400" },
                  { text: "Personalized growth roadmap", color: "text-rose-400" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <CheckCircle2 size={15} className={item.color} />
                    <span className="text-sm text-slate-300">{item.text}</span>
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
                Join thousands of candidates
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}