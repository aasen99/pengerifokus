import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site";

interface PageSeoOptions {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function trimMetaDescription(text: string, maxLength = 155): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const trimmed = normalized.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  const cut = lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed;

  return `${cut.trimEnd()}…`;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
}: PageSeoOptions): Metadata {
  const allKeywords = [...siteConfig.keywords, ...keywords];
  const canonicalPath = path || "/";
  const metaDescription = trimMetaDescription(description);

  return {
    title,
    description: metaDescription,
    keywords: allKeywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: metaDescription,
      url: canonicalPath,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: openGraphType,
      ...(openGraphType === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: metaDescription,
    },
  };
}

export function getWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/ordbok?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteUrl,
        description: siteConfig.description,
      },
    ],
  };
}
