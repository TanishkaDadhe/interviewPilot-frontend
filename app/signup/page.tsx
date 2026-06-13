"use client";

import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Rocket,
} from "lucide-react";


export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
    };

    let valid = true;

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await api.post("/auth/signup", {
        name: fullName,
        email,
        password,
      });

      alert("Account created successfully!");

      router.push("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.detail ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]/40 backdrop-blur-xl shadow-2xl">
        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}

          <div className="p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white">
                  InterviewPilot
                </h1>
              </div>

              <h2 className="text-6xl font-bold text-white leading-tight">
                Start your
                <span className="block italic text-indigo-300">
                  interview
                </span>
                journey today.
              </h2>

              <p className="mt-6 text-slate-400 text-lg max-w-lg">
                Create your account and get personalized
                AI-powered mock interviews, detailed feedback,
                and coaching reports.
              </p>

              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/ai-interview.jpg"
                  alt="AI Interview"
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="h-10 w-10 rounded-full bg-indigo-500 border border-white"></div>
                <div className="h-10 w-10 rounded-full bg-purple-500 border border-white"></div>
                <div className="h-10 w-10 rounded-full bg-pink-500 border border-white"></div>
              </div>

              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Trusted by 10k+ candidates
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="p-12 flex items-center justify-center">
            <div className="w-full max-w-md">

              <div className="mb-10">
                <h2 className="text-4xl font-bold text-white">
                  Create Account
                </h2>

                <p className="text-slate-400 mt-2">
                  Begin your AI interview preparation journey.
                </p>
              </div>

              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >

                {/* FULL NAME */}

                <div>
                  <label className="text-sm text-slate-400">
                    Full Name
                  </label>

                  <div className="relative mt-2">
                    <User className="absolute right-4 top-4 h-5 w-5 text-slate-500" />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="John Doe"
                      className={`w-full rounded-xl border bg-[#0b1326] p-4 text-white outline-none ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-slate-700 focus:border-indigo-500"
                      }`}
                    />
                  </div>

                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* EMAIL */}

                <div>
                  <label className="text-sm text-slate-400">
                    Email Address
                  </label>

                  <div className="relative mt-2">
                    <Mail className="absolute right-4 top-4 h-5 w-5 text-slate-500" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="name@company.com"
                      className={`w-full rounded-xl border bg-[#0b1326] p-4 text-white outline-none ${
                        errors.email
                          ? "border-red-500"
                          : "border-slate-700 focus:border-indigo-500"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="text-sm text-slate-400">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <Lock className="absolute right-4 top-4 h-5 w-5 text-slate-500" />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="••••••••"
                      className={`w-full rounded-xl border bg-[#0b1326] p-4 text-white outline-none ${
                        errors.password
                          ? "border-red-500"
                          : "border-slate-700 focus:border-indigo-500"
                      }`}
                    />
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* CREATE ACCOUNT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-500
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:opacity-90
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading ? "Creating..." : "Create Account"}
                    <ArrowRight size={18} />
                  </div>
                </button>

                {/* BACK TO LOGIN */}

                <Link href="/login" className="block">
                  <button
                    type="button"
                    className="
                      mt-4
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      py-4
                      text-white
                      transition-all
                      duration-300
                      hover:bg-slate-800
                      hover:border-indigo-500
                      hover:shadow-lg
                      hover:shadow-indigo-500/20
                      hover:scale-[1.02]
                      active:scale-[0.98]
                    "
                  >
                    Back to Login
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