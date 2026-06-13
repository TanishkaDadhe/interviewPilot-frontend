"use client";

import { Upload } from "lucide-react";

type Props = {
  resumeFile: File | null;

  setResumeFile:
    React.Dispatch<
      React.SetStateAction<File | null>
    >;

  jobDescription: string;

  setJobDescription:
    React.Dispatch<
      React.SetStateAction<string>
    >;

  handleProfileSetup: () => void;

  uploading: boolean;

  isSaved: boolean;
  setIsSaved: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  resumeUploaded: boolean;

    setResumeUploaded: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function PrepareInterview({
  resumeFile,
  setResumeFile,
  jobDescription,
  setJobDescription,
  handleProfileSetup,
  uploading,
  isSaved,
  setIsSaved,
  resumeUploaded,
  setResumeUploaded,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">
          1
        </div>

        <h2 className="text-3xl font-semibold">
          Prepare Your Interview
        </h2>
      </div>

      <div className="space-y-6">

        {/* Resume Upload */}

        <div>
          <label className="text-slate-400 text-sm">
            Resume Upload
          </label>

          <div className="mt-3 border-2 border-dashed border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition">

            <Upload className="h-10 w-10 text-indigo-400 mb-4" />

            <p className="text-lg">
              Drag & drop your resume here
            </p>

            <p className="text-slate-500 text-sm">
              PDF only
            </p>

            {resumeUploaded && !resumeFile && (
              <div className="mt-3 text-center">
                <p className="text-green-400 text-sm font-medium">
                  ✓ Resume already uploaded
                </p>

                <p className="text-slate-500 text-xs">
                  Upload another resume to replace it
                </p>
              </div>
            )}

            {resumeFile && (
              <p className="mt-3 text-indigo-300 text-sm">
                {resumeFile.name}
              </p>
            )}

            <input
              className="mt-4"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setResumeFile(
                  e.target.files?.[0] || null
                );

                setResumeUploaded(false);

                setIsSaved(false);
              }}
            />
          </div>
        </div>

        {/* Job Description */}

        <div>
          <label className="text-slate-400 text-sm">
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(
                e.target.value
              );

              setIsSaved(false);
            }}
            rows={6}
            placeholder="Paste the job description here..."
            className="
              mt-3
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-[#0b1326]
              p-4
              text-white
              outline-none
              focus:border-indigo-500
            "
          />
        </div>

        {/* Save Button */}

        <button
          onClick={handleProfileSetup}
          disabled={uploading}
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            py-4
            hover:bg-slate-800
            transition
            disabled:opacity-50
          "
        >
          {uploading
            ? "Uploading..."
            : isSaved
            ? "✓ Saved"
            : "Save Preparation Context"}
        </button>

      </div>
    </div>
  );
}