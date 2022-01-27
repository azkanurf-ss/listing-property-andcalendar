export const currencyConverter = (
  amount: number | undefined,
  currency: string | undefined
) => {
  if (amount && currency) {
    return amount.toLocaleString('EN-gb', {
      style: 'currency',
      currency,
    })
  }
  return 0
}
