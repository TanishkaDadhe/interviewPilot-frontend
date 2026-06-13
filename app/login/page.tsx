"use client";

import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  Rocket,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let valid = true;

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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      localStorage.setItem(
        "user_name",
        response.data.name
      );

      router.push("/dashboard");

    } catch (error: any) {
      alert(
        error.response?.data?.detail ||
        "Invalid credentials"
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
                Master your next
                <span className="block italic text-indigo-300">
                  interview
                </span>
                with AI.
              </h2>

              <p className="mt-6 text-slate-400 text-lg max-w-lg">
                Leverage advanced AI to simulate high-stakes interviews
                and receive personalized coaching and evaluation.
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
                  Welcome back
                </h2>

                <p className="text-slate-400 mt-2">
                  Secure access to your preparation dashboard.
                </p>
              </div>

              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >

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
                  <div className="flex justify-between">
                    <label className="text-sm text-slate-400">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot?
                    </button>
                  </div>

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

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-4 font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-2">
                    Login
                    <ArrowRight size={18} />
                  </div>
                </button>

                {/* CREATE ACCOUNT */}

                <Link href="/signup" className="block">
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