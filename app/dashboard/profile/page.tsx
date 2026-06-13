"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";


export default function ProfilePage() {
  const [targetRole, setTargetRole] = useState("");

  const [experiences, setExperiences] = useState([
    {
        company: "",
        role: "",
        duration: "",
        description: "",
    },
  ]);

  const [education, setEducation] = useState("");

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [skills, setSkills] = useState([
    "React.js",
    "Node.js",
    "TypeScript",
  ]);

  const [newSkill, setNewSkill] = useState("");

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const response =
        await api.get("/auth/me");

      setUser(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUser();
  }, []);

  const addSkill = () => {
    if (!newSkill.trim()) return;

    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const addExperience = () => {
    setExperiences([
        ...experiences,
        {
        company: "",
        role: "",
        duration: "",
        description: "",
        },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(
        experiences.filter((_, i) => i !== index)
    );
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string
    ) => {
    const updated = [...experiences];

    updated[index] = {
        ...updated[index],
        [field]: value,
    };

    setExperiences(updated);
  };

  const handleCancel = () => {
    fetchProfile();
  };

  const fetchProfile = async () => {
    try {
        const response = await api.get("/profile");

        const profile = response.data;

        setTargetRole(profile.target_role || "");

        setSkills(profile.skills || []);

        setEducation(profile.education || "");

        setResumeText(profile.resume_text || "");

        setJobDescription(
        profile.job_description || ""
        );

        // Experience
        setExperiences(
        profile.experience?.length
            ? profile.experience
            : [
                {
                company: "",
                role: "",
                duration: "",
                description: "",
                },
            ]
        );

    } catch (error) {
        console.error(
        "Failed to load profile",
        error
        );
    }
  };

  const handleSave = async () => {
    try {
        await api.put("/profile", {
        target_role: targetRole,

        skills,

        education,

        experience: experiences,

        resume_text: resumeText,

        job_description: jobDescription,
        });

        alert(
        "Profile updated successfully"
        );

    } catch (error) {
        alert(
        "Failed to save profile"
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-white">
      <Sidebar />

      <div className="ml-[280px]">
        <Topbar user={user} />

        <main className="pt-24 px-8">
          <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-4xl font-bold">
            Your Professional Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your experience, target role and
            preparation details.
          </p>
        </div>

        {/* TARGET ROLE */}

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold">
            Target Role & Skills
          </h2>

          <div>
            <label className="text-slate-400">
              Target Role
            </label>

            <input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Software Engineer"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-700
                bg-[#060e20]
                px-4 
                py-3
              "
            />
          </div>

          {/* SKILLS */}

          <div className="mt-6">
            <label className="text-slate-400">
              Key Skills
            </label>

            <div className="mt-3 flex flex-wrap gap-2">

              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="
                    rounded-full
                    bg-indigo-500/20
                    px-4
                    py-2
                    text-sm
                  "
                >
                  {skill}
                </span>
              ))}

            </div>

            <div className="mt-4 flex gap-3">

              <input
                value={newSkill}
                onChange={(e) =>
                  setNewSkill(e.target.value)
                }
                placeholder="Add Skill"
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#060e20]
                  p-3
                "
              />

              <button
                onClick={addSkill}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-500
                  px-6
                "
              >
                Add
              </button>

            </div>
          </div>
        </div>

        {/* EXPERIENCE */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">

        <div className="mb-6">
            <h2 className="text-lg font-semibold">
                Experience
            </h2>
        </div>

        {experiences.map((exp, index) => (
            <div
            key={index}
            className="
                mb-6
                rounded-2xl
                border
                border-white/10
                p-4
            "
            >

            <div className="mb-3 flex justify-between">

                <h3 className="font-semibold">
                Experience #{index + 1}
                </h3>

                {experiences.length > 1 && (
                <button
                    onClick={() =>
                    removeExperience(index)
                    }
                    className="text-red-400"
                >
                    Remove
                </button>
                )}

            </div>

            <div className="grid grid-cols-2 gap-4">

                <input
                value={exp.company}
                onChange={(e) =>
                    updateExperience(
                    index,
                    "company",
                    e.target.value
                    )
                }
                placeholder="Company Name"
                className="
                    rounded-xl
                    border
                    border-slate-700
                    bg-[#060e20]
                    px-4
                    py-3
                "
                />

                <input
                value={exp.role}
                onChange={(e) =>
                    updateExperience(
                    index,
                    "role",
                    e.target.value
                    )
                }
                placeholder="Role"
                className="
                    rounded-xl
                    border
                    border-slate-700
                    bg-[#060e20]
                    px-4
                    py-3
                "
                />

            </div>

            <input
                value={exp.duration}
                onChange={(e) =>
                updateExperience(
                    index,
                    "duration",
                    e.target.value
                )
                }
                placeholder="Duration"
                className="
                mt-4
                w-full
                rounded-xl
                border
                border-slate-700
                bg-[#060e20]
                px-4
                py-3
                "
            />

            <textarea
                value={exp.description}
                onChange={(e) =>
                updateExperience(
                    index,
                    "description",
                    e.target.value
                )
                }
                rows={4}
                placeholder="Description"
                className="
                mt-4
                w-full
                rounded-xl
                border
                border-slate-700
                bg-[#060e20]
                px-4
                py-3
                "
            />

            </div>
        ))}

        <div className="flex justify-center mt-4">
        <button
            onClick={addExperience}
            className="
            rounded-xl
            bg-gradient-to-r
            from-indigo-500
            to-purple-500
            px-6
            py-3
            font-medium
            transition-all
            duration-300
            hover:scale-[1.02]
            "
        >
            + Add Experience
        </button>
        </div>

        </div>

        {/* EDUCATION */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Education
          </h2>

          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            rows={3}
            placeholder="Educational Background"
            className="w-full rounded-xl border border-slate-700 bg-[#060e20] px-4 py-3"
          />
        </div>

        {/* RESUME + JD */}

        <div className="mt-6 grid lg:grid-cols-2 gap-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Stored Resume Text
            </h2>

            <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={7}
                className="w-full rounded-xl border border-slate-700 bg-[#060e20] px-4 py-3"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Active Job Description
            </h2>

            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={7}
                className="w-full rounded-xl border border-slate-700 bg-[#060e20] px-4 py-3"
            />
          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={handleCancel}
            className="
                px-6
                py-3
                text-slate-400
                transition
                hover:text-white
            "
            >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-purple-500
              px-8
              py-4
              font-semibold
            "
          >
            Save Profile Changes
          </button>

        </div>
      
              </div>
      </main>
    </div>
    </div>
  );
}
