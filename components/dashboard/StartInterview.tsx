"use client";

import { useState } from "react";

type Props = {
  interviewType: string;
  setInterviewType: React.Dispatch<
    React.SetStateAction<string>
  >;

  difficulty: string;
  setDifficulty: React.Dispatch<
    React.SetStateAction<string>
  >;

  numQuestions: number;
  setNumQuestions: React.Dispatch<
    React.SetStateAction<number>
  >;

  focusArea: string;
  setFocusArea: React.Dispatch<
    React.SetStateAction<string>
  >;

  starting: boolean;

  handleStartInterview: () => void;
};

export default function StartInterview({
  interviewType,
  setInterviewType,
  difficulty,
  setDifficulty,
  numQuestions,
  setNumQuestions,
  focusArea,
  setFocusArea,
  starting,
  handleStartInterview,
}: Props) {
  

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold">
          2
        </div>

        <h2 className="text-3xl font-semibold">
          Start New Interview
        </h2>
      </div>

      <div className="space-y-5">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-slate-400">
              Interview Type
            </label>

            <select
              value={interviewType}
              onChange={(e) =>
                setInterviewType(e.target.value)
              }
              className="w-full mt-2 rounded-xl bg-[#0b1326] border border-slate-700 p-3"
            >
              <option value="technical">
                Technical
              </option>

              <option value="behavioral">
                Behavioral
              </option>

              <option value="hr">
                HR
              </option>

              <option value="mixed">
                Mixed
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-400">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="w-full mt-2 rounded-xl bg-[#0b1326] border border-slate-700 p-3"
            >
              <option value="easy">
                Easy
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="hard">
                Hard
              </option>
            </select>
          </div>

        </div>

        <div>
          <label className="text-sm text-slate-400">
            Number of Questions
          </label>

          <input
            type="range"
            min={1}
            max={15}
            value={numQuestions}
            onChange={(e) =>
              setNumQuestions(
                Number(e.target.value)
              )
            }
            className="w-full mt-4"
          />

          <div className="flex justify-between text-sm text-slate-500">
            <span>1</span>
            <span>{numQuestions}</span>
            <span>15</span>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Focus Area
          </label>

          <input
            type="text"
            value={focusArea}
            onChange={(e) =>
              setFocusArea(e.target.value)
            }
            placeholder="System Design, React, DSA..."
            className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-700
              bg-[#0b1326]
              p-3
            "
          />
        </div>

        <div className="rounded-xl border border-white/10 p-4 text-sm text-slate-400">
          AI will generate interview questions based on your resume and job description.
        </div>

        <button
          onClick={handleStartInterview}
          disabled={starting}
          className={`
            w-full
            rounded-2xl
            py-5
            text-lg
            font-semibold
            transition
            ${
              starting
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
            }
          `}
        >
          {starting ? (
            <div className="flex items-center justify-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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