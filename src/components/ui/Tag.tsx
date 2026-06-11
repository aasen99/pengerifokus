interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}

const variants = {
  default: "bg-stone-100 text-stone-800 ring-stone-200",
  accent: "bg-orange-50 text-orange-800 ring-orange-100",
  muted: "bg-stone-50 text-stone-600 ring-stone-200",
};

export function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
