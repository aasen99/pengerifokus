import { RelatedLinks } from "@/components/ui/RelatedLinks";

interface RelatedGuide {
  label: string;
  href: string;
}

interface ToolRelatedGuidesProps {
  guides: RelatedGuide[];
}

export function ToolRelatedGuides({ guides }: ToolRelatedGuidesProps) {
  return <RelatedLinks links={guides} />;
}
