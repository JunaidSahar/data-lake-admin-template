export const useFormatNumPKR = (price: any) => {
  const formatter = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
  })
  return formatter.format(price)
}