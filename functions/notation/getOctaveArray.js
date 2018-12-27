var ibn = require('is-bounded-number')
var Peo = require('peo')

var constants = require('../constants')


var getOctaveArray = function(exp2) {

  // Returns an octave number corresponding to a 2-exponent.
  // Note: 1 = 2^0 is in octave 4
  // Simpler format for octaves 0 to 9 (just use a single digit)
  // Full format for outside of this range, like (o+10) or (o-4321)

  // Deal with error cases
  if (!ibn(exp2, constants.MAX_ERROR_2_OCTAVE)) {
    // Error output
    return ["(" + constants.ERROR_TEXT_2_OCTAVE + ")", new Peo()]
  }

  // Its a valid number
  exp2 = Math.round(exp2)
  var peo = new Peo(constants.PEO_2_OCTAVE, exp2)
  standardOctaveNumber = exp2 + 4     // For 1/1, exp2=0, and octave is 4 (e.g. C4)
  if (standardOctaveNumber >= constants.MAX_OVERFLOW_2_OCTAVE) {
    // Case 1000000...
    return ["(" + constants.NAME_2_OCTAVE + "+" + constants.OVERFLOW_TEXT + ")", peo]
  } else if (standardOctaveNumber > 9) {
    // Case 10...999999
    return ["(" + constants.NAME_2_OCTAVE + "+" + standardOctaveNumber + ")", peo]
  } else if (standardOctaveNumber >= 0) {
    // Case 0..9
    return ["" + standardOctaveNumber, peo]
  } else if (standardOctaveNumber <= -constants.MAX_OVERFLOW_2_OCTAVE) {
    // Case ...-1000000
    return ["(" + constants.NAME_2_OCTAVE + "-" + constants.OVERFLOW_TEXT + ")", peo]
  } else {
    // Case -999999...-1. Minus sign already there!
    return ["(" + constants.NAME_2_OCTAVE + standardOctaveNumber + ")", peo]
  }
}

module.exports = getOctaveArray
