// Spec uses "1 290 €" — thin space (U+202F), euro suffix.
export function formatEUR(amount: number): string {
  return amount.toLocaleString("fr-FR") + " €";
}
