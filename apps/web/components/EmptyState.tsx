

interface Props {
  icon: string;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: Props): React.ReactNode {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted text-center leading-relaxed">{description}</p>
    </div>
  );
}
