"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { X, Plus, User, Briefcase, GraduationCap, FileText, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const [targetRole, setTargetRole] = useState("");
  const [experiences, setExperiences] = useState([{ company: "", role: "", duration: "", description: "" }]);
  const [education, setEducation] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState(["React.js", "Node.js", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchProfile(); fetchUser(); }, []);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  const addExperience = () => setExperiences([...experiences, { company: "", role: "", duration: "", description: "" }]);

  const removeExperience = (index: number) => setExperiences(experiences.filter((_, i) => i !== index));

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleCancel = () => fetchProfile();

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      const profile = response.data;
      setTargetRole(profile.target_role || "");
      setSkills(profile.skills || []);
      setEducation(profile.education || "");
      setResumeText(profile.resume_text || "");
      setJobDescription(profile.job_description || "");
      setExperiences(profile.experience?.length ? profile.experience : [{ company: "", role: "", duration: "", description: "" }]);
    } catch (error) { console.error("Failed to load profile", error); }
  };

  const handleSave = async () => {
    try {
      await api.put("/profile", { target_role: targetRole, skills, education, experience: experiences, resume_text: resumeText, job_description: jobDescription });
      alert("Profile updated successfully");
    } catch (error) { alert("Failed to save profile"); }
  };

  const inputClass = "w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-teal-500/40 transition";
  const textareaClass = `${inputClass} resize-none`;

  return (
    <div className="min-h-screen bg-[#060D1F] text-white">
      <Sidebar />

      <div className="ml-[280px]">
        <Topbar user={user} />

        <main className="pt-24 px-8 pb-12">
          <div className="mx-auto max-w-6xl">

            {/* HEADER */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight">Your Professional Profile</h1>
              <p className="mt-2 text-slate-500 text-sm">Manage your experience, target role and preparation details.</p>
            </div>

            {/* TARGET ROLE & SKILLS */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/[0.05] blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <User size={16} className="text-teal-400" />
                </div>
                <h2 className="text-base font-semibold tracking-tight">Target Role & Skills</h2>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-500">Target Role</label>
                <input
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className={`mt-2 ${inputClass}`}
                />
              </div>

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-wider text-slate-500">Key Skills</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 text-xs text-teal-400 font-medium">
                      {skill}
                      <button onClick={() => removeSkill(index)} className="hover:text-teal-200 transition">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill..."
                    className={`flex-1 ${inputClass}`}
                  />
                  <button
                    onClick={addSkill}
                    className="rounded-xl bg-gradient-to-r from-teal-500 to-violet-600 px-5 text-sm font-semibold hover:opacity-90 transition flex items-center gap-2"
                  >
                    <Plus size={15} /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Briefcase size={16} className="text-violet-400" />
                </div>
                <h2 className="text-base font-semibold tracking-tight">Experience</h2>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="rounded-2xl border border-white/[0.07] bg-black/15 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Experience #{index + 1}</span>
                      {experiences.length > 1 && (
                        <button onClick={() => removeExperience(index)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition">
                          <Trash2 size={13} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 block">Company</label>
                        <input value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} placeholder="Company name" className={inputClass} />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 block">Role</label>
                        <input value={exp.role} onChange={(e) => updateExperience(index, "role", e.target.value)} placeholder="Your role" className={inputClass} />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 block">Duration</label>
                      <input value={exp.duration} onChange={(e) => updateExperience(index, "duration", e.target.value)} placeholder="e.g. Jan 2022 – Dec 2023" className={inputClass} />
                    </div>

                    <div className="mt-4">
                      <label className="text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 block">Description</label>
                      <textarea value={exp.description} onChange={(e) => updateExperience(index, "description", e.target.value)} rows={4} placeholder="What you worked on..." className={textareaClass} />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addExperience}
                className="mt-4 w-full rounded-2xl border border-dashed border-violet-500/25 py-3.5 text-sm text-violet-400 hover:bg-violet-500/[0.04] hover:border-violet-500/40 transition flex items-center justify-center gap-2"
              >
                <Plus size={15} /> Add Experience
              </button>
            </div>

            {/* EDUCATION */}
            <div className="mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <GraduationCap size={16} className="text-amber-400" />
                </div>
                <h2 className="text-base font-semibold tracking-tight">Education</h2>
              </div>
              <label className="text-[11px] uppercase tracking-wider text-slate-500 mb-2 block">Educational Background</label>
              <textarea value={education} onChange={(e) => setEducation(e.target.value)} rows={3} placeholder="e.g. B.Tech Computer Science, IIT Bombay, 2020–2024" className={textareaClass} />
            </div>

            {/* RESUME + JD */}
            <div className="mt-6 grid lg:grid-cols-2 gap-5">
              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-8 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <FileText size={16} className="text-rose-400" />
                  </div>
                  <h2 className="text-base font-semibold tracking-tight">Stored Resume Text</h2>
                </div>
                <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={8} placeholder="Your resume text will appear here..." className={textareaClass} />
              </div>

              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-8 rounded-xl bg-teal-500/10 flex items-center justify-center">
                    <Briefcase size={16} className="text-teal-400" />
                  </div>
                  <h2 className="text-base font-semibold tracking-tight">Active Job Description</h2>
                </div>
                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={8} placeholder="Paste the job description here..." className={textareaClass} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3 pb-4">
              <button onClick={handleCancel} className="px-6 py-3 text-sm text-slate-500 hover:text-slate-200 transition rounded-xl hover:bg-white/[0.04]">
                Cancel
              </button>
              <button onClick={handleSave} className="rounded-xl bg-gradient-to-r from-teal-500 to-violet-600 px-8 py-3 text-sm font-semibold hover:opacity-90 transition">
                Save Profile Changes
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}