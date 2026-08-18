import Link from "next/link";
import { getCardMeta } from "@/lib/card-meta";
import { Tag } from "./Tag";

interface ContentCardProps {
  title: string;
  description: string;
  tags?: string[];
  meta?: string;
  badge?: string;
  contentType?: string;
  year?: string | number;
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
  contentType,
  year,
  actionLabel = "Åpne",
  disabled = false,
  href,
}: ContentCardProps) {
  const className =
    "group flex h-full flex-col rounded-xl border border-stone-200 bg-white p-3.5 transition-colors hover:border-orange-300";

  const { category, secondary } = getCardMeta(meta, tags, {
    type: contentType,
    year,
  });

  const content = (
    <>
      {(category || badge || secondary) && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {category && <Tag>{category}</Tag>}
          {badge && <Tag variant="accent">{badge}</Tag>}
          {secondary && <Tag variant="muted">{secondary}</Tag>}
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
