import type { FormuesbyggerQuote } from "@/types/formuesbygger";
import { norskeFormuesbyggerQuotes } from "@/data/formuesbygger-articles/quotes-norske";

/**
 * Kun sitater med dokumentert kilde (sourceUrl + sourceLabel).
 * Engelske sitater har norsk oversettelse i translation.
 */
export const formuesbyggerQuotes: Record<string, FormuesbyggerQuote[]> = {
  ...norskeFormuesbyggerQuotes,
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
      sourceUrl: "https://www.youtube.com/watch?v=T6HHwOoq9M4",
      sourceLabel: "PBS, Adam Smith's Money World, 1985",
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
      text: "The stock market serves as a relocation center at which money is moved from the active to the patient.",
      translation:
        "Aksjemarkedet fungerer som et omplasseringssted der penger flyttes fra de aktive til de tålmodige.",
      sourceUrl:
        "https://www.berkshirehathaway.com/letters/1991.html",
      sourceLabel: "Berkshire Hathaway, 1991",
    },
    {
      text: "Risk comes from not knowing what you're doing.",
      translation: "Risiko kommer fra ikke å vite hva du gjør.",
      sourceUrl:
        "https://books.google.com/books?id=Hayx0w8S1tcC&pg=PA94",
      sourceLabel:
        "The Warren Buffett Way (Robert Hagstrom, 1994) — fra foredrag ved Columbia University, 1993",
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
  ],
  "jeff-bezos": [
    {
      text: "Your margin is my opportunity.",
      translation: "Din margin er min mulighet.",
      sourceUrl:
        "https://fortune.com/2012/11/16/amazons-jeff-bezos-the-ultimate-disrupter/",
      sourceLabel: "Fortune, 2012",
    },
    {
      text: "We are stubborn on vision. We are flexible on details.",
      translation: "Vi er sta på visjon, fleksible på detaljer.",
      sourceUrl:
        "https://www.geekwire.com/2011/amazons-bezos-innovation/",
      sourceLabel: "GeekWire, Amazon shareholder meeting, 2011",
    },
  ],
  "bill-gates": [
    {
      text: "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten.",
      translation:
        "Vi overvurderer alltid endringen de neste to årene og undervurderer endringen de neste ti.",
      sourceUrl:
        "https://www.penguinrandomhouse.com/books/17414/the-road-ahead-by-bill-gates-and-nathan-myhrvold-and-peter-rinearson/",
      sourceLabel: "The Road Ahead (1996)",
    },
    {
      text: "Your most unhappy customers are your greatest source of learning.",
      translation:
        "Dine mest misfornøyde kunder er din største læringskilde.",
      sourceUrl:
        "https://www.penguinrandomhouse.com/books/180871/business-the-speed-of-thought-by-bill-gates/",
      sourceLabel: "Business @ the Speed of Thought (1999)",
    },
  ],
  "mark-zuckerberg": [
    {
      text: "The biggest risk is not taking any risk.",
      translation: "Den største risikoen er å ikke ta noen risiko.",
      sourceUrl:
        "https://www.youtube.com/watch?v=ngX92fP0XUk",
      sourceLabel: "Y Combinator, How to Build the Future, 2016",
    },
    {
      text: "Move fast and break things.",
      translation: "Beveg deg raskt og bryt ting.",
      sourceUrl:
        "https://www.sec.gov/Archives/edgar/data/1326801/000119312512034517/d287954ds1.htm",
      sourceLabel: "Facebook S-1 (SEC), 2012",
    },
  ],
  "michael-jordan": [
    {
      text: "I've missed more than 9,000 shots in my career. I've lost almost 300 games. I've failed over and over and over again in my life. And that is why I succeed.",
      translation:
        "Jeg har bommet på over 9 000 skudd i karrieren. Jeg har tapt nesten 300 kamper. Jeg har feilet om og om igjen i livet. Det er derfor jeg lykkes.",
      sourceUrl:
        "https://www.paleycenter.org/collection/item?item=AT%3A49338.013",
      sourceLabel: "Nike «Failure»-reklame, 1997",
    },
    {
      text: "Never say never. Because limits, like fears, are often just an illusion.",
      translation:
        "Aldri si aldri. For begrensninger, som frykt, er ofte bare en illusjon.",
      sourceUrl:
        "https://speakola.com/sports/michael-jordan-hall-of-fame-induction-2009",
      sourceLabel: "Naismith Memorial Basketball Hall of Fame, 2009",
    },
  ],
  "cristiano-ronaldo": [
    {
      text: "Talent without hard work is useless. Nothing falls from the sky.",
      translation:
        "Talent uten hardt arbeid er ubrukelig. Ingenting faller fra himmelen.",
      sourceUrl:
        "https://www.francefootball.fr/news/Cristiano-ronaldo-en-interview-exclusive-pour-france-football-il-faut-etre-intelligent-pour-durer/1074235",
      sourceLabel: "France Football, 2019",
    },
  ],
  "oprah-winfrey": [
    {
      text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
      translation:
        "Jo mer du lovpriser og feirer livet ditt, jo mer er det å feire.",
      sourceUrl:
        "https://us.macmillan.com/books/9781250353160/whatiknowforsure/",
      sourceLabel: "What I Know for Sure (2014)",
    },
  ],
  "jay-z": [
    {
      text: "I'm not a businessman, I'm a business, man.",
      translation: "Jeg er ikke en forretningsmann. Jeg er en business, mann.",
      sourceUrl:
        "https://genius.com/Kanye-west-diamonds-from-sierra-leone-remix-lyrics",
      sourceLabel: "Diamonds from Sierra Leone (Remix), 2005",
    },
  ],
};
