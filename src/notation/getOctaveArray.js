var ibn = require('is-bounded-number')
var Peo = require('peo')

var constants = require('../constants/general')

var bl = constants.BRACKET_2_OCTAVE_LEFT
var on = constants.NAME_2_OCTAVE
var su = constants.SYMBOL_2_OCTAVE_UP
var sd = constants.SYMBOL_2_OCTAVE_DOWN
var br = constants.BRACKET_2_OCTAVE_RIGHT
var ot = constants.OVERFLOW_TEXT

var numError = 10 ** constants.MAX_ERROR_DIGITS_2_OCTAVE
var numOverflow = 10 ** constants.MAX_OVERFLOW_DIGITS_2_OCTAVE

var getOctaveArray = function(exp2) {

  // Returns an octave number corresponding to a 2-exponent.
  // Note: 1 = 2^0 is in octave 4
  // Simpler format for octaves 0 to 9 (just use a single digit)
  // Full format for outside of this range, like (o+10) or (o-4321)

  // Deal with error cases
  if (!ibn(exp2, numError)) {
    // Error output
    return ["" + bl + constants.ERROR_TEXT_2_OCTAVE + br, new Peo()]
  }

  // Its a valid number
  exp2 = Math.round(exp2)
  var peo = new Peo(constants.PEO_2_OCTAVE, exp2)
  standardOctaveNumber = exp2 + 4     // For 1/1, exp2=0, and octave is 4 (e.g. C4)
  if (standardOctaveNumber >= numOverflow) {
    // Case 1000000...
    return ["" + bl + on + su + ot + br, peo]
  } else if (standardOctaveNumber > 9) {
    // Case 10...999999
    return ["" + bl + on + su + standardOctaveNumber + br, peo]
  } else if (standardOctaveNumber >= 0) {
    // Case 0..9
    return ["" + standardOctaveNumber, peo]
  } else if (standardOctaveNumber <= -numOverflow) {
    // Case ...-1000000
    return ["" + bl + on + sd + ot + br, peo]
  } else {
    // Case -999999...-1. Minus sign already there! Don't need sd in middle
    return ["" + bl + on + standardOctaveNumber + br, peo]
  }
}

module.exports = getOctaveArray
