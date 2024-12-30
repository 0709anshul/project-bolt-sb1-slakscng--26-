export function calculateRequiredQuantity(
  formulaQuantity: number,
  orderQuantity: number
): number {
  return Number((formulaQuantity * orderQuantity).toFixed(3));
}

export function calculateShortage(
  required: number,
  available: number
): number {
  return Number(Math.max(0, required - available).toFixed(3));
}