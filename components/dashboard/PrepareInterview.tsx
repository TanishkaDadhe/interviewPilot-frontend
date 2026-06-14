"use client";
import { Upload } from "lucide-react";

type Props = {
  resumeFile: File | null;
  setResumeFile: React.Dispatch<React.SetStateAction<File | null>>;
  jobDescription: string;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  handleProfileSetup: () => void;
  uploading: boolean;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  resumeUploaded: boolean;
  setResumeUploaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PrepareInterview({
  resumeFile, setResumeFile, jobDescription, setJobDescription,
  handleProfileSetup, uploading, isSaved, setIsSaved,
  resumeUploaded, setResumeUploaded,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-400 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
          1
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Prepare Your Interview</h2>
      </div>

      <div className="space-y-5">

        <div>
          <label
            htmlFor="resume-upload"
            className="
              mt-2.5
              border-2 border-dashed border-violet-500/20
              rounded-2xl
              p-8
              flex flex-col items-center justify-center text-center
              hover:border-teal-500/40
              hover:bg-teal-500/[0.02]
              transition
              cursor-pointer
            "
          >
            <Upload className="h-8 w-8 text-violet-400 mb-3" />

            <p className="text-sm text-slate-300">
              Drag & drop your resume here
            </p>

            <p className="text-xs text-teal-400 mt-1">
              or click anywhere to browse
            </p>

            <p className="text-xs text-slate-600 mt-1">
              PDF only
            </p>

            {resumeUploaded && !resumeFile && (
              <div className="mt-3 text-center">
                <p className="text-teal-400 text-xs font-medium">
                  ✓ Resume already uploaded
                </p>
                <p className="text-slate-600 text-xs mt-0.5">
                  Upload another to replace it
                </p>
              </div>
            )}

            {resumeFile && (
              <p className="mt-3 text-violet-400 text-xs">
                {resumeFile.name}
              </p>
            )}

            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                setResumeFile(e.target.files?.[0] || null);
                setResumeUploaded(false);
                setIsSaved(false);
              }}
            />
          </label>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider text-slate-500">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => { setJobDescription(e.target.value); setIsSaved(false); }}
            rows={6}
            placeholder="Paste the job description here..."
            className="mt-2.5 w-full rounded-2xl border border-white/[0.08] bg-black/20 p-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-teal-500/40 transition resize-none"
          />
        </div>

        <button
          onClick={handleProfileSetup}
          disabled={uploading}
          className="w-full rounded-2xl border border-white/[0.09] py-4 text-sm text-slate-300 hover:bg-white/[0.04] hover:border-white/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : isSaved ? "✓ Saved" : "Save Preparation Context"}
        </button>

      </div>
    </div>
  );
}