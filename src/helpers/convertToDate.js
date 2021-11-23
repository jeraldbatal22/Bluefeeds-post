export const convertToDate = (date) => {
  const dateString = new Date(date)
  return dateString.toDateString()
}