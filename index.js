const primeToComma = (p) => {
  // This function maps a prime number
  // to a 2-element array containing its prime comma

  // Dummy return
  return [p, 80]
}

const commaToText = (commaArray) => {
  return commaArray[0] + "/" + commaArray[1]
}

module.exports = {
  primeToComma: primeToComma,
  commaToText: commaToText
}
