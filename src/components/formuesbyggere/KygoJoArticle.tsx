import Link from "next/link";
import { ArticleSources, formatVerifiedDate } from "@/components/formuesbyggere/ArticleSources";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { Tag } from "@/components/ui/Tag";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";
import {
  HAALAND_PATH,
  kygoJoArticle,
  kygoJoReadTimeMinutes,
} from "@/data/kygo-jo";
import { renderTextWithLinks } from "@/lib/rich-text";

function KygoJoHero() {
  return (
    <div
      className="mt-6 overflow-hidden rounded-xl border border-stone-200"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 220"
        className="h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <linearGradient id="kygo-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="45%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <rect width="800" height="220" fill="url(#kygo-sky)" />
        <circle cx="640" cy="58" r="36" fill="#fde68a" opacity="0.9" />
        <path
          d="M40 168c40-28 80-28 120 0s80 28 120 0 80-28 120 0 80 28 120 0 80-28 120 0 80 28 120 0"
          fill="none"
          stroke="#ecfdf5"
          strokeWidth="5"
          opacity="0.55"
        />
        <path
          d="M40 188c40-20 80-20 120 0s80 20 120 0 80-20 120 0 80 20 120 0 80-20 120 0 80 20 120 0"
          fill="none"
          stroke="#fff7ed"
          strokeWidth="3"
          opacity="0.4"
        />
        <g transform="translate(118 78)">
          <circle cx="36" cy="36" r="34" fill="#fafaf9" />
          <circle cx="36" cy="36" r="28" fill="none" stroke="#1c1917" strokeWidth="3" />
          <path
            d="M36 10c8 8 10 16 10 26s-2 18-10 26c-8-8-10-16-10-26s2-18 10-26z"
            fill="none"
            stroke="#1c1917"
            strokeWidth="2"
          />
          <path
            d="M10 36c8-8 16-10 26-10s18 2 26 10c-8 8-16 10-26 10s-18-2-26-10z"
            fill="none"
            stroke="#1c1917"
            strokeWidth="2"
          />
          <polygon points="36,24 44,32 36,40 28,32" fill="#1c1917" />
        </g>
        <g transform="translate(248 86)" fill="none" stroke="#ecfdf5" strokeWidth="4">
          <path d="M0 24c12-18 24-18 36 0" />
          <path d="M8 24c8-10 16-10 24 0" />
          <path d="M52 24c12-18 24-18 36 0" />
          <path d="M60 24c8-10 16-10 24 0" />
          <path d="M104 24c12-18 24-18 36 0" />
          <path d="M112 24c8-10 16-10 24 0" />
        </g>
        <g transform="translate(470 72)">
          <rect x="38" y="8" width="14" height="52" rx="7" fill="#fafaf9" />
          <circle cx="45" cy="66" r="18" fill="#1c1917" />
          <circle cx="45" cy="66" r="11" fill="#fb7185" />
          <rect x="44" y="8" width="36" height="8" rx="4" fill="#fafaf9" />
        </g>
      </svg>
    </div>
  );
}

function Quote({ children }: { children: string }) {
  return (
    <blockquote className="mt-4 border-l-4 border-orange-400 bg-orange-50/60 px-4 py-3 text-stone-700 italic">
      {children}
    </blockquote>
  );
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-black">
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function SpotifyEmbed({ trackId, title }: { trackId: string; title: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
      <iframe
        className="w-full"
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
        height="152"
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

export function KygoJoArticle() {
  const article = kygoJoArticle;

  return (
    <article>
      <nav aria-label="Du er her" className="text-sm text-stone-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link
              href="/formuesbyggere"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {FORMUESBYGGERE_TITLE}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={HAALAND_PATH}
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Erling Haaland
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-stone-700">Kygo Jo</li>
        </ol>
      </nav>

      <header className="mt-3 border-b border-stone-200 pb-6">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Tag variant="accent">Musikk</Tag>
          <Tag>Sport</Tag>
          <Tag variant="muted">Formuesbyggere</Tag>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {article.pageTitle}
        </h1>
        {article.intro.split(/\n\n+/).map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600"
          >
            {paragraph}
          </p>
        ))}
        <p className="mt-3 text-sm text-stone-500">
          {kygoJoReadTimeMinutes} min lesetid
          {" · "}
          Publisert{" "}
          <time dateTime={article.publishedAt}>
            {formatVerifiedDate(article.publishedAt)}
          </time>
          {" · "}
          Sist kontrollert{" "}
          <time dateTime={article.lastVerified}>
            {formatVerifiedDate(article.lastVerified)}
          </time>
        </p>
      </header>

      <KygoJoHero />

      <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[20rem] text-left text-sm">
          <caption className="sr-only">Fakta om Kygo Jo</caption>
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th scope="col" className="px-4 py-2.5 font-semibold text-stone-900">
                Fakta
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-stone-900">
                Opplysning
              </th>
            </tr>
          </thead>
          <tbody>
            {article.factRows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-stone-100 last:border-0"
              >
                <th
                  scope="row"
                  className="px-4 py-2.5 font-normal text-stone-600"
                >
                  {row.label}
                </th>
                <td className="px-4 py-2.5 font-medium text-stone-900">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-stone-500">
        {article.factsNote}
      </p>

      <aside className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 sm:px-5">
        <h2 className="text-base font-semibold text-stone-900">
          {article.disclaimerTitle}
        </h2>
        <p className="mt-2 leading-relaxed text-stone-700">
          {article.disclaimerBody}
        </p>
      </aside>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Før fotballspilleren kom artisten
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            I august 2016 var Erling Braut Haaland 16 år og på samling med det
            norske ungdomslandslaget. Sammen med lagkameratene Erik Botheim og
            Erik Tobias Sandberg laget han raplåten «Kygo Jo».
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            De tre ble omtalt som Flow Kingz, mens Haaland ble kreditert under
            artistnavnet «Lyng».
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Bakgrunnen var ikke en omfattende forretningsplan, et stort
            plateselskap eller et ønske om å revolusjonere norsk musikk. De
            kjedet seg.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Haaland forklarte senere historien slik:
          </p>
          <Quote>
            «Vi var på en samling, også kjedet vi oss litt. Så fant vi ut at vi
            har et annet talent enn fotball. Og det er å synge.»
          </Quote>
          <p className="mt-3 leading-relaxed text-stone-600">
            Produksjonen var av det enkle slaget. Erik Botheim har fortalt at de
            brukte en mobiltelefon plassert bak en høyttaler fordi de ikke visste
            hva de drev med.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Resultatet ble likevel en låt, en musikkvideo og starten på det som
            skulle vise seg å bli en ekstremt langsiktig lanseringskampanje.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">Musikkvideoen</h2>
          <YouTubeEmbed
            videoId={article.youtubeId}
            title="Flow Kingz – Kygo Jo, original musikkvideo"
          />
          <p className="mt-3 leading-relaxed text-stone-600">
            Videoen viser blant annet en ung Haaland som:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Danser i sakte film",
              "Later som han griller",
              "Kjører rundt i en liten lekebil",
              "Leverer verset sitt med artistnavnet Lyng",
              "Forteller at han ikke kan danse til Kygo",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-stone-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-stone-600">
            Videoen ble publisert 30. august 2016.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            I starten var mottakelsen begrenset. Da Erik Botheim snakket om låten
            i 2019, hadde den rundt 60 000 visninger. Etter at Haaland slo gjennom
            i Borussia Dortmund, passerte den 1,7 millioner visninger i februar
            2020.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Ved starten av juli 2026 hadde videoen mer enn 18 millioner visninger.
            Etter VM, Brasil-kampen og Kygo-remiksen økte tallet til omtrent 28
            millioner.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Det viser at en fotballkarriere kan være en overraskende effektiv
            måte å skaffe organisk trafikk til en gammel YouTube-video på.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Den langsiktige markedsføringsplanen
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Venstre kolonne er dokumentert. Høyre kolonne er vår tolkning.
          </p>
          <ol className="mt-4 space-y-2">
            {article.timeline.map((row) => (
              <li
                key={`${row.year}-${row.event}`}
                className="rounded-xl border border-stone-200 bg-white px-3 py-3 sm:px-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <time className="text-xs font-semibold uppercase tracking-wider text-orange-700">
                      {row.year}
                    </time>
                    <p className="mt-0.5 font-medium text-stone-900">
                      {row.event}
                    </p>
                  </div>
                  <p className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-800 ring-1 ring-inset ring-orange-100 sm:mt-1 sm:max-w-[18rem] sm:text-right">
                    {row.interpretation}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <blockquote className="mt-4 border-l-4 border-orange-300 px-4 py-1 text-stone-700 italic">
            {article.timelineNote}
          </blockquote>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Målet var en norsk toppliste
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            Allerede i 2017 fortalte Erik Botheim at Flow Kingz hadde et mål om å
            få en låt inn på VG-lista.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Han beskrev prosjektet som useriøst, men la samtidig til at gruppen
            likte å tro at det var seriøst.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Det tok nesten ni år, en internasjonal fotballkarriere, et
            verdensmesterskap og hjelp fra en av Norges største artister. De
            nådde ikke akkurat den listen Botheim nevnte, men remiksen gikk helt
            til førsteplass på Spotify Top 50 Norge.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Ambisjonen var altså ikke så dum. Metoden var bare uvanlig
            tidkrevende.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Kygo oppdager planen
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            Under fotball-VM i 2026 fikk «Kygo Jo» nytt liv i sosiale medier.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            4. juli publiserte Kygo en remix av låten på Instagram og spurte om
            den burde gis ut. Samtidig stilte han ett krav:
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Hvis Haaland scoret mot Brasil i åttedelsfinalen, skulle remiksen
            bli lansert.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Haaland svarte raskt:
          </p>
          <Quote>«Få dette ut ASAP, Kygo.»</Quote>
          <p className="mt-3 leading-relaxed text-stone-600">
            Kygo trengte ett mål. Haaland bestemte seg for å være på den sikre
            siden.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            To mål mot Brasil
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            5. juli 2026 møtte Norge Brasil i åttedelsfinalen i VM.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Brasil hadde lenge kontroll, men Haaland scoret to ganger i løpet av
            kampens siste ti minutter. Norge vant 2–1 og gikk til kvartfinalen i
            VM for første gang.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Resultatet fikk flere konsekvenser:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-stone-600">
            <li>Brasil ble slått ut av VM.</li>
            <li>Norge gikk videre til kvartfinalen.</li>
            <li>
              Kygo ble kontraktsmessig bundet av et løfte han hadde gitt på
              Instagram.
            </li>
            <li>Haalands artistkarriere kunne endelig fortsette.</li>
          </ol>
          <p className="mt-3 leading-relaxed text-stone-600">
            Kygo hadde bedt om ett mål. Haaland leverte to. Det er denne typen
            overoppfyllelse som gjør ham attraktiv både for fotballklubber og
            musikkprodusenter.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Artistcomebacket
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            7. juli 2026 ble «Kygo Jo (feat. Lyng) [Kygo Remix]» offisielt
            utgitt.
          </p>
          <SpotifyEmbed
            trackId={article.spotifyTrackId}
            title="Kygo Jo (feat. Lyng) [Kygo Remix] på Spotify"
          />
          <p className="mt-3 leading-relaxed text-stone-600">
            Den offisielle utgivelsen krediterer:
          </p>
          <ul className="mt-4 space-y-2">
            {["Kygo", "Flow Kingz", "JMK", "Lyng"].map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-stone-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-stone-600">
            Remiksen beholdt Haalands originale vokal fra 2016, men ga låten en
            ny produksjon signert Kygo.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Kort tid etter utgivelsen gikk låten til førsteplass på Spotify Top
            50 Norge. Den passerte 14 millioner avspillinger på Spotify i løpet
            av august 2026.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Haaland markerte utgivelsen med spørsmålet:
          </p>
          <Quote>«Does this mean I’m officially an artist now?»</Quote>
          <p className="mt-3 leading-relaxed text-stone-600">
            Svaret er ja. Han står kreditert på en offisiell utgivelse produsert
            av Kygo som har toppet Spotify-listen i Norge. Fotballspilleren
            Erling Haaland har dermed også et dokumenterbart krav på tittelen som
            listetoppende artist.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Hva er økonomien i «Kygo Jo»?
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            Det finnes ingen offentlig oversikt over hvor mye Haaland, Flow
            Kingz eller de andre rettighetshaverne har tjent på låten.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            Vi vet derfor ikke:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Hvordan strømmeinntektene fordeles",
              "Hvem som eier masterrettighetene til originalen",
              "Hvor stor andel Haaland mottar",
              "Hvor mye YouTube-videoen har tjent",
              "Om avtalen med Kygo inneholder andre betalinger",
              "Hvor store inntekter remiksen vil gi over tid",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-stone-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 leading-relaxed text-stone-600">
            Spotify oppgir at 2026-utgivelsen er utgitt gjennom Kygo AS med
            eksklusiv lisens til Sony Music Entertainment Sweden AB.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            {renderTextWithLinks(
              "Unngå å beregne en påstått [inntekt](/ordbok/inntekt) basert utelukkende på antall Spotify-avspillinger. Utbetaling per avspilling varierer, og pengene skal normalt fordeles mellom flere rettighetshavere som [royalties](/ordbok/royalties).",
            )}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Den virkelige verdien
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            Selv om den økonomiske gevinsten ikke er offentlig, har «Kygo Jo»
            skapt betydelig verdi på andre måter.
          </p>
          <h3 className="mt-5 text-base font-semibold text-stone-900">
            En historie ingen andre kan kopiere
          </h3>
          <p className="mt-3 leading-relaxed text-stone-600">
            Det finnes mange fotballspillere og mange artister. Det finnes bare
            én spiller som scoret to mål mot Brasil for å utløse en Kygo-remix av
            en raplåt han spilte inn som 16-åring.
          </p>
          <h3 className="mt-5 text-base font-semibold text-stone-900">
            Oppmerksomhet på tvers av målgrupper
          </h3>
          <p className="mt-3 leading-relaxed text-stone-600">
            Historien kobler sammen:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Fotball",
              "Musikk",
              "Sosiale medier",
              "Norsk landslagsfølelse",
              "VM",
              "Haalands personlige merkevare",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-stone-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-5 text-base font-semibold text-stone-900">
            Gammelt innhold får ny verdi
          </h3>
          <p className="mt-3 leading-relaxed text-stone-600">
            Originalvideoen lå på YouTube i nesten ti år før den fikk sitt
            største løft. Innhold som allerede er produsert kan få ny verdi når
            skaperen, målgruppen eller omgivelsene endrer seg.
          </p>
          <h3 className="mt-5 text-base font-semibold text-stone-900">
            Haaland viser mer personlighet
          </h3>
          <p className="mt-3 leading-relaxed text-stone-600">
            Historien gjør Haaland til mer enn mål, lønn og statistikk.
            Selvironi og viljen til å spille videre på en gammel ungdomsvideo
            gjør merkevaren hans mer menneskelig og lettere å huske.
          </p>
        </section>

        <section className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4">
          <h2 className="text-lg font-semibold text-stone-900">
            Hva kan vanlige mennesker lære?
          </h2>
          <ul className="mt-4 space-y-2">
            {[
              "Ikke alt innhold må være perfekt for å bli verdifullt",
              "En god historie kan være viktigere enn høy produksjonskvalitet",
              "Gamle prosjekter kan få nytt liv",
              "Distribusjon er minst like viktig som selve produktet",
              "Oppmerksomhet fra ett område kan flyttes til et annet",
              "Selvironi kan styrke en merkevare",
              "Det kan lønne seg å la gamle YouTube-videoer ligge",
              "Dersom alt annet mislykkes, kan man forsøke å bli verdens beste spiss",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-stone-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Myte mot virkelighet
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-stone-200 px-4 py-3">
              <p className="text-sm font-medium text-stone-500">Myte</p>
              <p className="mt-1 text-stone-700">
                Haaland ble fotballspiller fordi han var spesielt god i fotball.
              </p>
            </div>
            <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
              <p className="text-sm font-medium text-orange-800">
                Virkelighet, ifølge denne siden
              </p>
              <p className="mt-1 leading-relaxed text-stone-700">
                Fotballkarrieren ga «Kygo Jo» 28 millioner YouTube-visninger, en
                offisiell Kygo-remix og førsteplass på Spotify i Norge.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
              <p className="text-sm font-medium text-stone-500">
                Den faktiske virkeligheten
              </p>
              <p className="mt-1 leading-relaxed text-stone-700">
                Haaland var et enormt fotballtalent. Påstanden om at hele
                karrieren var planlagt som musikkpromotering er en spøk. Effekten
                karrieren har hatt på låtens rekkevidde er derimot høyst reell.
              </p>
            </div>
          </div>
        </section>

        <section id="vanlige-sporsmal">
          <h2 className="text-lg font-semibold text-stone-900">
            Vanlige spørsmål
          </h2>
          <dl className="mt-4 space-y-4">
            {article.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-stone-900">{item.question}</dt>
                <dd className="mt-1.5 leading-relaxed text-stone-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <ArticleSources
        sources={article.sources}
        lastVerified={article.lastVerified}
        intro={article.sourcesIntro}
        groupByTier={false}
      />

      <RelatedLinks links={article.relatedLinks} />
    </article>
  );
}
