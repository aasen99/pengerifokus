import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbJsonLd,
  getSoftwareApplicationJsonLd,
} from "@/lib/structured-data";

interface ToolPageSeoProps {
  name: string;
  description: string;
  path: string;
}

export function ToolPageSeo({ name, description, path }: ToolPageSeoProps) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Verktøy", path: "/verktoy" },
          { name, path },
        ])}
      />
      <JsonLd
        data={getSoftwareApplicationJsonLd({ name, description, path })}
      />
    </>
  );
}
