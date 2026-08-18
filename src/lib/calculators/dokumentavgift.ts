import { DOCUMENT_FEE_RATE } from "../../data/eie-leie";

export { DOCUMENT_FEE_RATE };

/** Andelsbolig and aksjeleilighet are typically exempt; selveier is not. */
export type DocumentFeeHousingType =
  | "selveier"
  | "andelsbolig"
  | "aksjeleilighet";

export function isDocumentFeeExempt(
  housingType: DocumentFeeHousingType,
): boolean {
  return housingType !== "selveier";
}

/** 2,5 % of purchase price for selveier; 0 for andelsbolig/aksjeleilighet. */
export function calculateDocumentFeeForPrice(
  purchasePrice: number,
  housingTypeOrExempt: DocumentFeeHousingType | boolean = false,
): number {
  const exempt =
    typeof housingTypeOrExempt === "boolean"
      ? housingTypeOrExempt
      : isDocumentFeeExempt(housingTypeOrExempt);

  if (exempt) return 0;
  return Math.round(Math.max(0, purchasePrice) * DOCUMENT_FEE_RATE);
}
