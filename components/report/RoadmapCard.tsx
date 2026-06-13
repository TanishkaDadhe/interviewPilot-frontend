"use client";

import {
  Target,
  CheckCircle2,
} from "lucide-react";

type Props = {
  roadmap: string[];
};

export default function RoadmapCard({
  roadmap,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
          <Target
            size={20}
            className="text-indigo-300"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Growth Roadmap
          </h2>

          <p className="text-slate-400 text-sm">
            Personalized improvement plan
          </p>
        </div>

      </div>

      <div className="space-y-5">

        {roadmap?.map(
          (item, index) => (
            <div
              key={index}
              className="relative pl-10"
            >
              {/* Vertical Line */}

              {index !==
                roadmap.length -
                  1 && (
                <div
                  className="
                    absolute
                    left-[15px]
                    top-8
                    h-full
                    w-px
                    bg-white/10
                  "
                />
              )}

              {/* Dot */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-8
                  w-8
                  rounded-full
                  bg-indigo-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <CheckCircle2
                  size={16}
                  className="text-indigo-300"
                />
              </div>

              {/* Content */}

              <div
                className="
                  rounded-2xl
                  bg-[#0b1326]
                  p-4
                "
              >
                <p className="text-sm leading-7 text-slate-300">
                  {item}
                </p>
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}