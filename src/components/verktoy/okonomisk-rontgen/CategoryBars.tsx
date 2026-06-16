import type { RontgenCategoryScore } from "@/types/okonomisk-rontgen";

interface CategoryBarsProps {
  categories: RontgenCategoryScore[];
}

export function CategoryBars({ categories }: CategoryBarsProps) {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.category}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium text-stone-900">{category.label}</span>
            <span className="tabular-nums text-stone-600">{category.percent} %</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-700"
              style={{ width: `${category.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
