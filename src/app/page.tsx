import type { Metadata } from "next";
import { FeaturedGuides } from "@/components/home/FeaturedGuides";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { Hero } from "@/components/home/Hero";
import { HomeStats } from "@/components/home/HomeStats";
import { QuickPaths } from "@/components/home/QuickPaths";
import { SloseTeller } from "@/components/home/SloseTeller";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { FORDELSPROGRAMMER_TITLE, TILBUD_TITLE } from "@/data/content-labels";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Personlig økonomi i Norge",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "penger i fokus",
    "økonomiguider",
    "personlig økonomi norge",
    "sparekalkulator",
    "prosentkalkulator",
    "eie eller leie",
    "bonuspoeng",
    "økonomisk røntgen",
    "ordbok økonomi",
  ],
});

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <Hero />

      <div className="mt-8">
        <SloseTeller />
      </div>

      <div className="mt-12 space-y-12">
        <QuickPaths />
        <FeaturedGuides />
        <FeaturedTools />
        <HomeStats />
      </div>

      <HubCrossLinks
        links={[
          { href: "/emner", label: "Emner" },
          { href: "/fordeler", label: FORDELSPROGRAMMER_TITLE },
          { href: "/tilbud", label: TILBUD_TITLE },
          { href: "/ordbok", label: "Ordbok" },
          { href: "/formuesbyggere", label: FORMUESBYGGERE_TITLE },
        ]}
      />
    </div>
  );
}
