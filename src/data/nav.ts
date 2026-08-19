export interface NavItem {
  href: string;
  label: string;
}

export const primaryNav: NavItem[] = [
  { href: "/guider", label: "Guider" },
  { href: "/verktoy", label: "Verktøy" },
  { href: "/tilbud", label: "Tilbud" },
];

export const secondaryNav: NavItem[] = [
  { href: "/fordeler", label: "Fordelsprogrammer" },
  { href: "/formuesbyggere", label: "Formuesbyggere" },
  { href: "/ordbok", label: "Ordbok" },
];

export const extraNav: NavItem[] = [
  { href: "/emner", label: "Emner" },
];

export const popularTools: NavItem[] = [
  { href: "/verktoy/okonomisk-rontgen", label: "Økonomisk røntgen" },
  { href: "/verktoy/gjeldsbremsen", label: "Gjeldsbremsen" },
  { href: "/verktoy/eie-leie-kalkulator", label: "Eie vs. leie" },
  { href: "/verktoy/prosentkalkulator", label: "Prosentkalkulator" },
  { href: "/verktoy/sifo-kalkulator", label: "SIFO-kalkulator" },
  { href: "/verktoy/bonuskalkulator", label: "Bonuskalkulator" },
  { href: "/verktoy/nedbetalingskalkulator", label: "Nedbetalingskalkulator" },
  { href: "/verktoy/bsu-kalkulator", label: "BSU-kalkulator" },
  { href: "/verktoy/sparekalkulator", label: "Sparekalkulator" },
];
