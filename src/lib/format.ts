/** Format a GNF price, or fall back to "Prix sur demande" when null. */
export function formatPrice(price: number | null, currency = "GNF"): string {
  if (price == null) return "Prix sur demande";
  const formatted = new Intl.NumberFormat("fr-FR").format(price);
  return `${formatted} ${currency}`;
}

const TRANSACTION_LABELS: Record<string, string> = {
  vente: "À vendre",
  location: "À louer",
};

export function transactionLabel(transaction: string): string {
  return TRANSACTION_LABELS[transaction] ?? transaction;
}
