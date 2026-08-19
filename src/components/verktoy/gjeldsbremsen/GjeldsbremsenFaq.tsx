import { gjeldsbremsenFaq } from "@/data/gjeldsbremsen";

export function GjeldsbremsenFaq() {
  return (
    <section id="ofte-stilte-sporsmal" className="mt-10">
      <h2 className="text-lg font-semibold tracking-tight text-stone-900">
        Ofte stilte spørsmål
      </h2>
      <dl className="mt-4 space-y-4">
        {gjeldsbremsenFaq.map((item) => (
          <div key={item.question}>
            <dt className="font-medium text-stone-900">{item.question}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-stone-600">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
