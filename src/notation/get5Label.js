var ibn = require('is-bounded-number')

var constants = require('../constants/general')

var bl = constants.BRACKET_5_SYNTONIC_LEFT
var br = constants.BRACKET_5_SYNTONIC_RIGHT
var scu = constants.NAME_5_SYNTONIC_COMMA_ADD
var scd = constants.NAME_5_SYNTONIC_COMMA_REMOVE
var ot = constants.OVERFLOW_TEXT

var numError = 10 ** constants.MAX_ERROR_DIGITS_5_SYNTONIC_COMMA
var numOverflow = 10 ** constants.MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA
var numRepeats = constants.MAX_REPEATS_5_SYNTONIC_COMMA


var get5Label = function(exp5) {
  // Shorthand for exponent of 5 is
  // repeated ' or . for
  // positive or negative exponents respectively

  // Deal with error cases
  if (!ibn(exp5, numError)) {
    // Error output
    return "" + bl + constants.ERROR_TEXT_5_SYNTONIC_COMMA + br
  }
  // Its a valid number
  exp5 = Math.round(exp5)
  if (exp5 >= numOverflow) {
    return "" + bl + scu + ot + br
  } else if (exp5 > numRepeats) {
    return "" + bl + scu + exp5 + br
  } else if (exp5 > 0) {
    return scu.repeat(exp5)
  } else if (exp5 <= -numOverflow) {
    return "" + bl + scd + ot + br
  } else if (exp5 < -numRepeats) {
    return "" + bl + scd + -exp5 + br
  } else if (exp5 < 0) {
    return scd.repeat(-exp5)
  } else {
    return ""
  }
}

module.exports = get5Label
