var primeToCommaDR = require('./private/primeToCommaDR')

var primeToComma = function(p, type) {

  var defaultResult = [1, 1]

  // p has got to be a number
  if (!(typeof(p)==="number")) {
    return defaultResult
  }

  // p forced to integer
  p = Math.round(p)

  // p ought to be between 5 and upper limit of integer precision
  if (p<5) {
    return defaultResult
  } else if (p>5e15) {
    // Integer arithmetic starts failing above this number
    return defaultResult
  }

  // Currently assuming that if p>=5 then its prime
  // In fact it might not be.
  // However, the function will succeed if p is prime.

  // Types include: DR (default), SAG, KG2
  var lowerType = (type || "DR").toLowerCase()

  if (lowerType.includes("sag")) {
    // console.log("Algorithm SAG not implemented yet")
    return primeToCommaDR(p)
  } else if (lowerType.includes("kg")) {
    // console.log("Algorithm KG2 not implemented yet")
    return primeToCommaDR(p)
  } else {
    // Use algorithm DR by default
    return primeToCommaDR(p)
  }

}

module.exports = primeToComma
