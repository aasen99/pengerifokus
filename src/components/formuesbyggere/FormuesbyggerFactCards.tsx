import type { FormuesbyggerFactCard } from "@/types/formuesbygger";

interface FormuesbyggerFactCardsProps {
  cards: FormuesbyggerFactCard[];
  note?: string;
}

export function FormuesbyggerFactCards({
  cards,
  note,
}: FormuesbyggerFactCardsProps) {
  return (
    <div className="mt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {card.label}
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-stone-900">
              {card.value}
            </p>
            {card.note && (
              <p className="mt-1 text-xs leading-relaxed text-stone-500">
                {card.note}
              </p>
            )}
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-3 text-sm leading-relaxed text-stone-600">{note}</p>
      )}
    </div>
  );
}
