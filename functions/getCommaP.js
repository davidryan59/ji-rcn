var Fraction = require('fraction.js')
var getCommaDR = require('./getCommaDR')
var getCommaSAG = require('./getCommaSAG')
var getCommaKG2 = require('./getCommaKG2')

var defaultResult = function() {
  return new Fraction(1, 1)
}

var getCommaP = function(p, algType) {

  // p has got to be a number
  if (!(typeof(p)==="number")) {
    return defaultResult()
  }

  // p forced to integer
  p = Math.round(p)

  // p ought to be between 5 and upper limit of integer precision
  if (p<5) {
    return defaultResult()
  } else if (p>5e15) {
    // Integer arithmetic starts failing above this number
    return defaultResult()
  }

  // Currently assuming that if p>=5 then its prime
  // In fact it might not be.
  // However, the function will succeed if p is prime.

  // Types include: DR (default), SAG, KG2
  // Also have DK as an alias for SAG
  var lowerAlgType = (algType || "DR").toLowerCase()

  if (lowerAlgType.includes("sag") || lowerAlgType.includes("dk")) {
    return getCommaSAG(p)
  } else if (lowerAlgType.includes("kg")) {
    return getCommaKG2(p)
  } else {
    // Use algorithm DR by default
    return getCommaDR(p)
  }

}

module.exports = getCommaP
