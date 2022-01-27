const convertText = (text: string | undefined) => {
  if (text) {
    let readableText = text
    return readableText
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toUpperCase()
      })
  } else {
    return '-'
  }
}

export default convertText
