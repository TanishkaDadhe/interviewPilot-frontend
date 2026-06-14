import { CheckSquare, TrendingUp, BadgeCheck, Star } from "lucide-react";

type Props = {
  stats: {
    completedInterviews: number;
    averageScore: number;
    hireConfidence: number;
    bestScore: number;
    thisWeek: number;
  };
};

export default function StatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Interviews Completed",
      value: stats.completedInterviews,
      icon: CheckSquare,
      sub: `+${stats.thisWeek} this week`,
      accent: "text-teal-400",
      glow: "before:from-teal-400/40",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}/10`,
      icon: TrendingUp,
      sub: "Overall average",
      accent: "text-violet-400",
      glow: "before:from-violet-400/40",
    },
    {
      title: "Hire Confidence",
      value: `${stats.hireConfidence}%`,
      icon: BadgeCheck,
      sub: "AI assessment",
      accent: "text-amber-400",
      glow: "before:from-amber-400/40",
    },
    {
      title: "Current Best",
      value: `${stats.bestScore}/10`,
      icon: Star,
      sub: "Personal record",
      accent: "text-rose-400",
      glow: "before:from-rose-400/40",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`relative rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl p-6 overflow-hidden
              before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r ${card.glow} before:to-transparent`}
          >
            <div className="flex justify-between items-start mb-5">
              <Icon size={18} className={card.accent} />
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">{card.sub}</span>
            </div>
            <p className="text-sm text-slate-400">{card.title}</p>
            <h3 className="text-4xl font-bold mt-1 tracking-tight text-white">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}