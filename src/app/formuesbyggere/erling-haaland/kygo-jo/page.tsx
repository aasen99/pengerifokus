import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { KygoJoArticle } from "@/components/formuesbyggere/KygoJoArticle";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";
import { HAALAND_PATH, kygoJoArticle } from "@/data/kygo-jo";
import { createPageMetadata } from "@/lib/seo";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getFaqPageJsonLd,
} from "@/lib/structured-data";

const path = kygoJoArticle.path;

export const metadata: Metadata = createPageMetadata({
  title: kygoJoArticle.seoTitle,
  description: kygoJoArticle.metaDescription,
  path,
  keywords: kygoJoArticle.seoKeywords,
  openGraphType: "article",
  publishedTime: kygoJoArticle.publishedAt,
  modifiedTime: kygoJoArticle.lastVerified,
});

export default function KygoJoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: FORMUESBYGGERE_TITLE, path: "/formuesbyggere" },
          { name: "Erling Haaland", path: HAALAND_PATH },
          { name: "Kygo Jo", path },
        ])}
      />
      <JsonLd
        data={getArticleJsonLd({
          title: kygoJoArticle.seoTitle,
          description: kygoJoArticle.metaDescription,
          path,
          datePublished: kygoJoArticle.publishedAt,
          dateModified: kygoJoArticle.lastVerified,
          about: {
            name: "Erling Braut Haaland",
            birthDate: "2000-07-21",
          },
        })}
      />
      <JsonLd data={getFaqPageJsonLd(kygoJoArticle.faq)} />
      <KygoJoArticle />
    </div>
  );
}
