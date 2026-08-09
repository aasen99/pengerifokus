import Link from "next/link";
import { Tag } from "./Tag";

interface ContentCardProps {
  title: string;
  description: string;
  tags?: string[];
  meta?: string;
  badge?: string;
  actionLabel?: string;
  disabled?: boolean;
  href?: string;
}

export function ContentCard({
  title,
  description,
  tags,
  meta,
  badge,
  actionLabel = "Les mer",
  disabled = false,
  href,
}: ContentCardProps) {
  const className =
    "group flex h-full flex-col rounded-xl border border-stone-200 bg-white p-3.5 transition-colors hover:border-orange-300";

  const visibleTags = tags?.slice(0, 1) ?? [];

  const content = (
    <>
      {(meta || badge || visibleTags.length > 0) && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {meta && <Tag>{meta}</Tag>}
          {badge && <Tag variant="accent">{badge}</Tag>}
          {visibleTags.map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
      )}

      <h2 className="text-base font-semibold text-stone-900 group-hover:text-orange-700">
        {title}
      </h2>
      <p className="mt-1 line-clamp-2 flex-1 text-sm leading-snug text-stone-600">
        {description}
      </p>

      <div className="mt-3">
        {disabled ? (
          <span className="text-sm font-medium text-stone-400">
            {actionLabel}
          </span>
        ) : (
          <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-700">
            {actionLabel} →
          </span>
        )}
      </div>
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
