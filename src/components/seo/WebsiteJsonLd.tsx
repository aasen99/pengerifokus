import { getWebsiteJsonLd } from "@/lib/seo";

export function WebsiteJsonLd() {
  const data = getWebsiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
