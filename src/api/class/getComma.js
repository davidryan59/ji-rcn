var Peo = require('peo')

var getCommaDR = require('../../commas/getCommaDR')
var getCommaSAG = require('../../commas/getCommaSAG')
var getCommaKG2 = require('../../commas/getCommaKG2')
var getCommaBAD = require('../../commas/getCommaBAD')

var getComma = function(p, algType) {
  // Calculate a prime comma, according to the specified algorithm

  var defaultResult = function() {return new Peo(1)}

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

  // Although non-prime p could potentially be inputted,
  // this function is private and will only be passed
  // values in the list 1, 2, 3, 5, 7, 11, 13... (primes continue)

  // Algorithm types include: DR (default), SAG, KG2
  // Also have DK as an alias for SAG
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
