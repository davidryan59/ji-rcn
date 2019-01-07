var Peo = require('peo')

var getCommaDR = require('../../commas/getCommaDR')
var getCommaSAG = require('../../commas/getCommaSAG')
var getCommaKG2 = require('../../commas/getCommaKG2')
var getCommaBAD = require('../../commas/getCommaBAD')

var defaultResult = function() {return new Peo(1)}

var getComma = function(p, algType) {
  // Calculate a prime comma, according to the specified algorithm
  // This function is only intended to have prime numbers inputted as p.
  // It will allow composite numbers such as 77 to pass, since primality checking
  // would slow the algorithm down, however it will not guarantee correct results,
  // e.g. getComma(77) is not guaranteed to equal getComma(7)*getComma(11)

  // All prime numbers are finite integers
  // Return default if p is not a finite integer
  if (!Number.isInteger(p)) {
    return defaultResult()
  }

  // p ought to be between 5 and upper limit of integer precision.
  // Otherwise return the default.
  if (p<5) {
    return defaultResult()
  } else if (p>5e15) {
    // Integer arithmetic starts failing above this number,
    // which is nearly Number.MAX_SAFE_INTEGER
    return defaultResult()
  }

  // Algorithm types include: DR (default), SAG, KG2
  // Also have DK as an alias for SAG
  // Algorithm BAD added to test bad value for getComma(5) parses correctly
  var lowerAlgType = (algType || "DR").toLowerCase()

  if (lowerAlgType.includes("sag") || lowerAlgType.includes("dk")) {
    return getCommaSAG(p)
  } else if (lowerAlgType.includes("kg")) {
    return getCommaKG2(p)
  } else if (lowerAlgType.includes("bad")) {
    return getCommaBAD(p)
  } else {
    // Use algorithm DR by default
    return getCommaDR(p)
  }
}

module.exports = getComma
