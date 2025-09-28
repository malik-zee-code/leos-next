interface NavigationSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NavigationSection({ title, children }: NavigationSectionProps) {
  return (
    <div>
      <p className="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </p>
      {children}
    </div>
  );
}
