var primeToCommaDR = require('./private/primeToCommaDR')

var primeToComma = function(p, type) {

  // Don't allow some values for p through
  var defaultResult = [1, 1]
  if (!(typeof(p)==="number")) {
    return defaultResult
  }
  p = Math.round(p)
  if (p<5) {
    return defaultResult
  }

  // Types include: DR (default), SAG, KG2
  var lowerType = (type || "DR").toLowerCase()

  if (lowerType.includes("sag")) {
    console.log("Algorithm SAG not implemented yet")
    return primeToCommaDR(p)
  } else if (lowerType.includes("kg")) {
    console.log("Algorithm KG2 not implemented yet")
    return primeToCommaDR(p)
  } else {
    // Use algorithm DR by default
    return primeToCommaDR(p)
  }

}

module.exports = primeToComma
