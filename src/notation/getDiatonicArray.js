var ibn = require('is-bounded-number')

var texts = require('../constants/text')
var peos = require('../constants/peo')
var getErrorNotation = require('./getErrorNotation')
var errorNotation = getErrorNotation("3")

var numError = Math.pow(10, texts.MAX_ERROR_DIGITS_3_DIATONIC)


var getDiatonicArray = function(exp3) {

  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name (F, C... B)

  // Deal with error cases
  if (!ibn(exp3, numError)) {
    // Error output
    return [errorNotation, peos.PEO_DIATONIC_C]
  }
  // Have a number
  exp3 = Math.round(exp3)
  if (exp3 < -1) {
    return [errorNotation, peos.PEO_DIATONIC_C]
  }
  if (exp3 > 5) {
    return [errorNotation, peos.PEO_DIATONIC_C]
  }

  // Give some output
  var result = null
  switch (exp3) {
    case -1: return ["F", peos.PEO_DIATONIC_F.copy()]
    case 0: return ["C", peos.PEO_DIATONIC_C.copy()]
    case 1: return ["G", peos.PEO_DIATONIC_G.copy()]
    case 2: return ["D", peos.PEO_DIATONIC_D.copy()]
    case 3: return ["A", peos.PEO_DIATONIC_A.copy()]
    case 4: return ["E", peos.PEO_DIATONIC_E.copy()]
    case 5: return ["B", peos.PEO_DIATONIC_B.copy()]
  }
}

module.exports = getDiatonicArray
