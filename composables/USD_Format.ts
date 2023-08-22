export const useFormatNumUSD = (price: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
  return formatter.format(price)
}