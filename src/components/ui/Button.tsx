import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

const variants = {
  primary:
    "bg-stone-800 text-white hover:bg-stone-900 shadow-sm shadow-stone-900/10",
  secondary:
    "bg-orange-600 text-white hover:bg-orange-700 shadow-sm shadow-orange-900/10",
  outline:
    "border border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:text-orange-700",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
