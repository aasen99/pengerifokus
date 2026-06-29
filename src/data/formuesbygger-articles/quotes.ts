import type { FormuesbyggerQuote } from "@/types/formuesbygger";

/**
 * Kun sitater med dokumentert kilde (sourceUrl + sourceLabel).
 * Engelske sitater har norsk oversettelse i translation.
 */
export const formuesbyggerQuotes: Record<string, FormuesbyggerQuote[]> = {
  "petter-stordalen": [
    {
      text: "Livet er for kort til å ta til takke med dårlige sjefer, dårlige miljøer, dårlige kulturer og angre på alle de mulighetene du takket nei til.",
      sourceUrl:
        "https://www.obforum.com/lederskap/petter-stordalen-7-tips-bedre-business",
      sourceLabel: "Oslo Business Forum",
    },
    {
      text: "Jeg vil gjerne kunne se barna i øynene i fremtiden. De skal kunne si at pappa gjorde noe mer enn å bygge hoteller, at han tok ansvar for samfunnet.",
      sourceUrl: "https://no.wikiquote.org/wiki/Petter_Stordalen",
      sourceLabel: "Wikiquote",
    },
  ],
  "torstein-hagen": [
    {
      text: "It's no fun being number two. You have to be number one to succeed.",
      translation:
        "Det er ikke moro å være nummer to. Du må være nummer én for å lykkes.",
      sourceUrl:
        "https://www.forbes.com/sites/christopherhelman/2012/10/08/viking-cruises-torstein-hagen-is-the-anti-carnival/",
      sourceLabel: "Forbes, 2012",
    },
  ],
  "odd-reitan": [
    {
      text: "Lave priser og god service vinner på lang sikt.",
      sourceUrl: "https://www.reitangruppen.no/om-oss/var-historie",
      sourceLabel: "Reitan Gruppen",
    },
  ],
  "warren-buffett": [
    {
      text: "Be fearful when others are greedy and greedy when others are fearful.",
      translation:
        "Vær fryktløs når andre er grådige, og grådig når andre er fryktløse.",
      sourceUrl:
        "https://www.berkshirehathaway.com/letters/2004ltr.pdf",
      sourceLabel: "Berkshire Hathaway, 2004",
    },
    {
      text: "Price is what you pay. Value is what you get.",
      translation: "Pris er det du betaler. Verdi er det du får.",
      sourceUrl:
        "https://www.berkshirehathaway.com/letters/2008ltr.pdf",
      sourceLabel: "Berkshire Hathaway, 2008",
    },
    {
      text: "Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.",
      translation:
        "Regel nummer én: Aldri tape penger. Regel nummer to: Aldri glem regel nummer én.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Warren_Buffett",
      sourceLabel: "Wikiquote",
      note: "Ofte gjengitt i Buffett-sammenheng",
    },
    {
      text: "Someone is sitting in the shade today because someone planted a tree a long time ago.",
      translation:
        "Noen sitter i skyggen i dag fordi noen plantet et tre for lenge siden.",
      sourceUrl:
        "https://www.berkshirehathaway.com/letters/1991ltr.pdf",
      sourceLabel: "Berkshire Hathaway, 1991",
    },
    {
      text: "The stock market is a device for transferring money from the impatient to the patient.",
      translation:
        "Aksjemarkedet er et apparat for å overføre penger fra de utålmodige til de tålmodige.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Warren_Buffett",
      sourceLabel: "Wikiquote",
      note: "Tilskrevet Buffett; ofte knyttet til Benjamin Graham",
    },
    {
      text: "Risk comes from not knowing what you're doing.",
      translation: "Risiko kommer fra ikke å vite hva du gjør.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Warren_Buffett",
      sourceLabel: "Wikiquote",
    },
  ],
  "elon-musk": [
    {
      text: "When something is important enough, you do it even if the odds are not in your favor.",
      translation:
        "Når noe er viktig nok, gjør du det selv om oddsen er mot deg.",
      sourceUrl:
        "https://www.cbsnews.com/news/elon-musk-at-spacex-hq-60-minutes-2014-03-30/",
      sourceLabel: "CBS News, 2014",
    },
    {
      text: "Persistence is very important. You should not give up unless you are forced to give up.",
      translation:
        "Utholdenhet er veldig viktig. Du bør ikke gi opp med mindre du er tvunget til det.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Elon_Musk",
      sourceLabel: "Wikiquote",
    },
  ],
  "jeff-bezos": [
    {
      text: "Your margin is my opportunity.",
      translation: "Din margin er min mulighet.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Jeff_Bezos",
      sourceLabel: "Wikiquote",
      note: "Bezos om konkurransen i handel",
    },
    {
      text: "We are stubborn on vision. We are flexible on details.",
      translation: "Vi er sta på visjon, fleksible på detaljer.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Jeff_Bezos",
      sourceLabel: "Wikiquote",
    },
  ],
  "bill-gates": [
    {
      text: "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten.",
      translation:
        "Vi overvurderer alltid endringen de neste to årene og undervurderer endringen de neste ti.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Bill_Gates",
      sourceLabel: "Wikiquote",
      note: "Fra The Road Ahead (1996)",
    },
    {
      text: "Your most unhappy customers are your greatest source of learning.",
      translation:
        "Dine mest misfornøyde kunder er din største læringskilde.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Bill_Gates",
      sourceLabel: "Wikiquote",
    },
  ],
  "mark-zuckerberg": [
    {
      text: "The biggest risk is not taking any risk.",
      translation: "Den største risikoen er å ikke ta noen risiko.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Mark_Zuckerberg",
      sourceLabel: "Wikiquote",
    },
    {
      text: "Move fast and break things.",
      translation: "Beveg deg raskt og bryt ting.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Mark_Zuckerberg",
      sourceLabel: "Wikiquote",
      note: "Tidlig Facebook-mantra om tempo i vekst",
    },
  ],
  "larry-ellison": [
    {
      text: "When you innovate, you've got to be prepared for people telling you that you are nuts.",
      translation:
        "Når du innoverer, må du være forberedt på at folk sier at du er gal.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Larry_Ellison",
      sourceLabel: "Wikiquote",
    },
  ],
  "michael-jordan": [
    {
      text: "I've missed more than 9,000 shots in my career. I've lost almost 300 games. I've failed over and over and over again in my life. And that is why I succeed.",
      translation:
        "Jeg har bommet på over 9 000 skudd i karrieren. Jeg har tapt nesten 300 kamper. Jeg har feilet om og om igjen i livet. Det er derfor jeg lykkes.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Michael_Jordan",
      sourceLabel: "Wikiquote",
      note: "Nike «Failure»-kampanje",
    },
    {
      text: "Limits, like fears, are often just an illusion.",
      translation: "Begrensninger, som frykt, er ofte bare en illusjon.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Michael_Jordan",
      sourceLabel: "Wikiquote",
    },
  ],
  "cristiano-ronaldo": [
    {
      text: "Talent without working hard is nothing.",
      translation: "Talent uten hardt arbeid er ingenting.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Cristiano_Ronaldo",
      sourceLabel: "Wikiquote",
    },
  ],
  "oprah-winfrey": [
    {
      text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
      translation:
        "Jo mer du lovpriser og feirer livet ditt, jo mer er det å feire.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Oprah_Winfrey",
      sourceLabel: "Wikiquote",
    },
  ],
  "taylor-swift": [
    {
      text: "If somebody tells you that you can't do something, do it twice and take pictures.",
      translation:
        "Hvis noen forteller deg at du ikke kan gjøre noe, gjør det to ganger og ta bilde.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Taylor_Swift",
      sourceLabel: "Wikiquote",
    },
  ],
  "jay-z": [
    {
      text: "I'm not a businessman, I'm a business, man.",
      translation: "Jeg er ikke en forretningsmann. Jeg er en business, mann.",
      sourceUrl:
        "https://en.wikiquote.org/wiki/Jay-Z",
      sourceLabel: "Wikiquote",
      note: "Fra «Diamonds from Sierra Leone (Remix)»",
    },
  ],
};
