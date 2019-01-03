var ibn = require('is-bounded-number')
var Peo = require('peo')

var texts = require('../constants/text')
var getErrorNotation = require('./getErrorNotation')

var bl = texts.BRACKET_LEFT_STANDARD
var on = texts.CHAR_OCTAVE_MARK
var su = texts.CHAR_OCTAVE_UP
var sd = texts.CHAR_OCTAVE_DOWN
var br = texts.BRACKET_RIGHT_STANDARD
var ot = texts.OVERFLOW_TEXT
var errorNotationSize = getErrorNotation(on)
var errorNotationUp = getErrorNotation(on + su)
var errorNotationDown = getErrorNotation(on + sd)

var numError = Math.pow(10, texts.MAX_ERROR_DIGITS_2_OCTAVE)
var numOverflow = Math.pow(10, texts.MAX_OVERFLOW_DIGITS_2_OCTAVE)

var getOctaveArray = function(exp2) {

  // Returns an octave number corresponding to a 2-exponent.
  // Note: 1 = 2^0 is in octave 4
  // Simpler format for octaves 0 to 9 (just use a single digit)
  // Full format for outside of this range, like (o+10) or (o-4321)

  // Deal with error cases
  if (!ibn(exp2, numError)) {
    // Error output
    return [errorNotationSize, new Peo()]
  }

  // Its a valid number
  exp2 = Math.round(exp2)
  var peo = new Peo(texts.PEO_OCTAVE, exp2)
  standardOctaveNumber = exp2 + 4     // For 1/1, exp2=0, and octave is 4 (e.g. C4)
  if (standardOctaveNumber >= numOverflow) {
    // Case 1000000...
    return [errorNotationUp, peo]
  } else if (standardOctaveNumber > 9) {
    // Case 10...999999
    return ["" + bl + on + su + standardOctaveNumber + br, peo]
  } else if (standardOctaveNumber >= 0) {
    // Case 0..9
    return ["" + standardOctaveNumber, peo]
  } else if (standardOctaveNumber <= -numOverflow) {
    // Case ...-1000000
    return [errorNotationDown, peo]
  } else {
    // Case -999999...-1. Minus sign already there! Don't need sd in middle
    return ["" + bl + on + standardOctaveNumber + br, peo]
  }
}

module.exports = getOctaveArray
