interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-gradient inline-block">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-emerald to-cyan rounded-full" />
    </div>
  );
}
