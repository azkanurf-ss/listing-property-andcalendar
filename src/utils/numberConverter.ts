export const numberWithCommas = (num: number | string | undefined) => {
  if (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return 0
  }
}
