var ibn = require('is-bounded-number')

var texts = require('../constants/text')
var getErrorNotation = require('./getErrorNotation')
var errorNotation = getErrorNotation("5")

var bl = texts.BRACKET_LEFT_STANDARD
var br = texts.BRACKET_RIGHT_STANDARD
var scu = texts.CHAR_SYNTONIC_ON
var scd = texts.CHAR_SYNTONIC_OFF

var numError = Math.pow(10, texts.MAX_ERROR_DIGITS_5_SYNTONIC_COMMA)
var numOverflow = Math.pow(10, texts.MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA)
var numRepeats = texts.MAX_REPEATS_5_SYNTONIC_COMMA


var get5Label = function(exp5) {
  // Shorthand for exponent of 5 is
  // repeated ' or . for
  // positive or negative exponents respectively

  // Deal with error cases
  if (!ibn(exp5, numError)) {
    // Error output
    return errorNotation
  }
  // Its a valid number
  exp5 = Math.round(exp5)
  if (exp5 >= numOverflow) {
    return errorNotation
  } else if (exp5 > numRepeats) {
    return "" + bl + scu + exp5 + br
  } else if (exp5 > 0) {
    return scu.repeat(exp5)
  } else if (exp5 <= -numOverflow) {
    return errorNotation
  } else if (exp5 < -numRepeats) {
    return "" + bl + scd + -exp5 + br
  } else if (exp5 < 0) {
    return scd.repeat(-exp5)
  } else {
    return ""
  }
}

module.exports = get5Label
