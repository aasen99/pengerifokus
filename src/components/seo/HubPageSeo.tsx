import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbJsonLd,
  getCollectionPageJsonLd,
} from "@/lib/structured-data";

interface HubItem {
  name: string;
  path: string;
  description?: string;
}

interface HubPageSeoProps {
  name: string;
  description: string;
  path: string;
  items: HubItem[];
}

export function HubPageSeo({
  name,
  description,
  path,
  items,
}: HubPageSeoProps) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name, path },
        ])}
      />
      <JsonLd
        data={getCollectionPageJsonLd({
          name,
          description,
          path,
          items,
        })}
      />
    </>
  );
}
