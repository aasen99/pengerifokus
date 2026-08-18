import Link from "next/link";
import {
  getRelatedFormuesbyggerReason,
} from "@/lib/formuesbyggere";
import type { Formuesbygger } from "@/types/formuesbygger";

interface RelatedFormuesbyggereProps {
  current: Formuesbygger;
  related: Formuesbygger[];
}

export function RelatedFormuesbyggere({
  current,
  related,
}: RelatedFormuesbyggereProps) {
  if (related.length === 0) return null;

  return (
    <nav aria-label="Relaterte formuesbyggere" className="mt-10">
      <h2 className="text-lg font-semibold text-stone-900">
        Relaterte formuesbyggere
      </h2>
      <ul className="mt-4 space-y-3">
        {related.map((profile) => (
          <li
            key={profile.slug}
            className="rounded-xl border border-stone-200 px-4 py-3"
          >
            <Link
              href={`/formuesbyggere/${profile.slug}`}
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {profile.name}
            </Link>
            <p className="mt-1 text-sm text-stone-600">
              {getRelatedFormuesbyggerReason(current, profile)}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
