"use client";

type Props = {
  interviewType: string;
  setInterviewType: React.Dispatch<React.SetStateAction<string>>;
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  numQuestions: number;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  focusArea: string;
  setFocusArea: React.Dispatch<React.SetStateAction<string>>;
  starting: boolean;
  handleStartInterview: () => void;
};

export default function StartInterview({
  interviewType, setInterviewType, difficulty, setDifficulty,
  numQuestions, setNumQuestions, focusArea, setFocusArea,
  starting, handleStartInterview,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white">
          2
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Start New Interview</h2>
      </div>

      <div className="space-y-5">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-slate-500">Interview Type</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full mt-2.5 rounded-xl bg-black/20 border border-white/[0.08] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-violet-500/40 transition"
            >
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="hr">HR</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-slate-500">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-2.5 rounded-xl bg-black/20 border border-white/[0.08] px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-violet-500/40 transition"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider text-slate-500">Number of Questions</label>
          <input
            type="range"
            min={1}
            max={15}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full mt-3 accent-violet-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>1</span>
            <span className="text-slate-300 font-medium">{numQuestions} questions</span>
            <span>15</span>
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider text-slate-500">Focus Area</label>
          <input
            type="text"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            placeholder="System Design, React, DSA..."
            className="mt-2.5 w-full rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/40 transition"
          />
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs text-slate-500 leading-relaxed">
          AI will generate interview questions based on your resume and job description.
        </div>

        <button
          onClick={handleStartInterview}
          disabled={starting}
          className={`w-full rounded-2xl py-4 text-base font-semibold transition ${
            starting
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 text-white"
          }`}
        >
          {starting ? (
            <div className="flex items-center justify-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Loading Interview...
            </div>
          ) : (
            "Start Interview"
          )}
        </button>

      </div>
    </div>
  );
}