import Link from "next/link";

interface ToolPageHeaderProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

export function ToolPageHeader({
  title,
  description,
  backHref = "/verktoy",
  backLabel = "Tilbake til verktøy",
}: ToolPageHeaderProps) {
  return (
    <>
      <Link
        href={backHref}
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← {backLabel}
      </Link>

      <header className="mt-3 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-stone-600">{description}</p>
      </header>
    </>
  );
}
