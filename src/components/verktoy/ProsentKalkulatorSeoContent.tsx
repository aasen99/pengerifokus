import Link from "next/link";

const faqItems = [
  {
    question: "Hvordan regner jeg ut prosent av et tall?",
    answer:
      "Multipliser tallet med prosenten og del på 100. Eksempel: 15 % av 899 = 899 × 15 ÷ 100 = 134,85.",
  },
  {
    question: "Hvordan regner jeg ut prosentøkning?",
    answer:
      "Trekk fra gammel verdi fra ny verdi, del på gammel verdi og gang med 100. Eksempel: fra 450 000 til 495 000 = (45 000 ÷ 450 000) × 100 = 10 % økning.",
  },
  {
    question: "Hvordan regner jeg ut prosentnedgang?",
    answer:
      "Samme formel som prosentøkning. Blir svaret negativt, er det en nedgang. Eksempel: fra 1 200 til 999 = (999 − 1 200) ÷ 1 200 × 100 = −16,75 %.",
  },
  {
    question: "Hva er forskjellen på «X % av Y» og «øk Y med X %»?",
    answer:
      "«15 % av 899» gir selve andelen (134,85). «Reduser 899 med 15 %» gir ny pris etter rabatt (764,15). Kalkulatoren har egne modi for begge.",
  },
  {
    question: "Må jeg logge inn for å bruke kalkulatoren?",
    answer:
      "Nei. Du får live utregning med en gang. Formelen vises under svaret, så du kan lære samtidig.",
  },
];

export const prosentKalkulatorFaq = faqItems;

export function ProsentKalkulatorSeoContent() {
  return (
    <div className="mt-10 space-y-8">
      <section>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Hvordan bruke prosentkalkulatoren
        </h2>
        <p className="mt-3 max-w-3xl text-stone-600 leading-relaxed">
          Velg modus øverst i kalkulatoren, fyll inn tallene, og se svaret med
          en gang. Under svaret står formelen, slik at du både får resultatet og
          forstår utregningen.
        </p>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-stone-600">
          <li>
            <strong className="font-medium text-stone-900">X % av Y:</strong>{" "}
            finn andelen, for eksempel rabattbeløp
          </li>
          <li>
            <strong className="font-medium text-stone-900">X er % av Y:</strong>{" "}
            finn hvor mange prosent en del er av det hele
          </li>
          <li>
            <strong className="font-medium text-stone-900">Finn hele:</strong>{" "}
            når du vet delen og prosenten, men mangler totalsummen
          </li>
          <li>
            <strong className="font-medium text-stone-900">Endring:</strong>{" "}
            prosentøkning eller prosentnedgang mellom to tall
          </li>
          <li>
            <strong className="font-medium text-stone-900">Øk / reduser:</strong>{" "}
            ny verdi etter prosentvis justering
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Formler for prosentregning
        </h2>
        <p className="mt-3 max-w-3xl text-stone-600 leading-relaxed">
          Prosentregning handler om forholdet mellom en del og det hele. Her er
          formlene kalkulatoren bruker, skrevet slik du kan gjøre dem for hånd.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FormulaCard
            title="Prosent av et tall"
            formula="(prosent ÷ 100) × tall"
            example="15 % av 899 = 134,85"
          />
          <FormulaCard
            title="Hvor mange prosent er X av Y?"
            formula="(del ÷ hele) × 100"
            example="15 000 av 500 000 = 3 %"
          />
          <FormulaCard
            title="Finn det hele tallet"
            formula="(del ÷ prosent) × 100"
            example="250 000 er 10 % → hele = 2 500 000"
          />
          <FormulaCard
            title="Prosentendring"
            formula="((ny − gammel) ÷ gammel) × 100"
            example="450 000 → 495 000 = 10 % økning"
          />
          <FormulaCard
            title="Øk med prosent"
            formula="tall × (1 + prosent ÷ 100)"
            example="520 000 økt med 3 % = 535 600"
          />
          <FormulaCard
            title="Reduser med prosent"
            formula="tall × (1 − prosent ÷ 100)"
            example="899 redusert med 15 % = 764,15"
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Prosentøkning og prosentnedgang
        </h2>
        <p className="mt-3 max-w-3xl text-stone-600 leading-relaxed">
          Prosentøkning og prosentnedgang er samme utregning: differansen mellom
          ny og gammel verdi, delt på den gamle verdien, ganget med 100. Positivt
          svar er økning. Negativt svar er nedgang. Bruk modus{" "}
          <em>Endring</em> i kalkulatoren for å få både prosent og kronebeløp.
        </p>
        <div className="mt-5 max-w-3xl space-y-4 text-stone-600 leading-relaxed">
          <p>
            <strong className="font-medium text-stone-900">Lønnsøkning:</strong>{" "}
            Går lønnen fra 450 000 til 495 000 kroner, er økningen 45 000 kroner,
            altså 10 %.
          </p>
          <p>
            <strong className="font-medium text-stone-900">Prisnedgang:</strong>{" "}
            Faller en vare fra 1 200 til 999 kroner, er nedgangen 201 kroner,
            altså 16,75 %.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Praktiske eksempler fra hverdagsøkonomien
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExampleCard
            title="Rabatt i butikk"
            body="15 % rabatt på 899 kr gir 134,85 kr i avslag. Ny pris blir 764,15 kr."
          />
          <ExampleCard
            title="Lønnstillegg"
            body="15 000 kr i tillegg på 500 000 kr i årslønn er 3 % lønnsøkning."
          />
          <ExampleCard
            title="Moms og avgift"
            body="25 % av 800 kr er 200 kr. Pris med moms blir 1 000 kr."
          />
          <ExampleCard
            title="Budsjettandeler"
            body="Bruker du 12 000 kr av 40 000 kr i månedsinntekt på bolig, er det 30 %."
          />
          <ExampleCard
            title="Porteføljeendring"
            body="Fondet ditt går fra 100 000 til 112 000 kr. Det er 12 % oppgang."
          />
          <ExampleCard
            title="Feriepenger"
            body="12 % feriepenger av 500 000 kr i grunnlag gir 60 000 kr. Prøv også feriepengekalkulatoren."
            href="/verktoy/feriepenge-kalkulator"
            hrefLabel="Feriepengekalkulator"
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Mer om prosentkalkulatoren
        </h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-stone-600">
          <li>Live svar mens du skriver</li>
          <li>Fem modi som dekker vanlige prosentproblemer</li>
          <li>Formelen under svaret, så du lærer utregningen</li>
          <li>
            Egen{" "}
            <Link
              href="/verktoy/prosentokning"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              prosentøkning
            </Link>{" "}
            og{" "}
            <Link
              href="/verktoy/prosentnedgang"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              prosentnedgang
            </Link>
            , pluss guide om{" "}
            <Link
              href="/guider/prosentregning"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              prosentregning
            </Link>
          </li>
          <li>
            Koblet til resten av{" "}
            <Link
              href="/verktoy"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              økonomiverktøyene
            </Link>
            , blant annet{" "}
            <Link
              href="/verktoy/sparekalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              sparekalkulator
            </Link>{" "}
            og{" "}
            <Link
              href="/verktoy/feriepenge-kalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              feriepengekalkulator
            </Link>
          </li>
        </ul>
      </section>

      <section id="ofte-stilte-sporsmal">
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          Ofte stilte spørsmål om prosentregning
        </h2>
        <dl className="mt-4 space-y-4">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-stone-600">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function FormulaCard({
  title,
  formula,
  example,
}: {
  title: string;
  formula: string;
  example: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-3.5">
      <h3 className="font-semibold text-stone-900">{title}</h3>
      <p className="mt-1.5 font-mono text-sm text-orange-800">{formula}</p>
      <p className="mt-1.5 text-sm text-stone-600">{example}</p>
    </div>
  );
}

function ExampleCard({
  title,
  body,
  href,
  hrefLabel,
}: {
  title: string;
  body: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5">
      <h3 className="font-semibold text-stone-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{body}</p>
      {href && hrefLabel && (
        <Link
          href={href}
          className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
