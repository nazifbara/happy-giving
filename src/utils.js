const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function dollarFormat(amount) {
  return moneyFormatter.format(amount);
}
