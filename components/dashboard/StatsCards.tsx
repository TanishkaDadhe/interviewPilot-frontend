import {
  CheckSquare,
  TrendingUp,
  BadgeCheck,
  Star,
} from "lucide-react";

type Props = {
  stats: {
    completedInterviews: number;
    averageScore: number;
    hireConfidence: number;
    bestScore: number;
    thisWeek: number;
  };
};

export default function StatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Interviews Completed",
      value: stats.completedInterviews,
      icon: CheckSquare,
      sub: `+${stats.thisWeek} this week`,
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}/10`,
      icon: TrendingUp,
      sub: "Overall Average",
    },
    {
      title: "Hire Confidence",
      value: `${stats.hireConfidence}%`,
      icon: BadgeCheck,
      sub: "AI Assessment",
    },
    {
      title: "Current Best",
      value: `${stats.bestScore}/10`,
      icon: Star,
      sub: "Personal Record",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <div className="flex justify-between mb-6">
              <Icon className="text-indigo-400" />

              <span className="text-xs text-slate-500">
                {card.sub}
              </span>
            </div>

            <p className="text-slate-400 text-sm">
              {card.title}
            </p>

            <h3 className="text-5xl font-bold mt-2">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}