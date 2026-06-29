import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

interface ProjectLink {
  label: string;
  url: string;
  icon?: "github" | "external";
}

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  links: ProjectLink[];
  accentColor?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  techStack,
  links,
}: ProjectCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald/5 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-emerald font-medium">{subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
        {description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-cyan border border-cyan/10 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald transition-colors duration-200"
          >
            {link.icon === "github" ? (
              <GithubIcon size={14} />
            ) : (
              <ExternalLink size={14} />
            )}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
