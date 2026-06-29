interface SkillBadgeProps {
  name: string;
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-emerald border border-emerald/10 hover:border-emerald/30 hover:bg-emerald/5 transition-all duration-300 cursor-default">
      {name}
    </span>
  );
}
