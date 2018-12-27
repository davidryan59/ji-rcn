var ibn = require('is-bounded-number')

var constants = require('../constants')


var get5Label = function(exp5) {
  // Shorthand for exponent of 5 is
  // repeated ' or . for
  // positive or negative exponents respectively

  // Deal with error cases
  if (!ibn(exp5, constants.MAX_ERROR_5_SYNTONIC_COMMA)) {
    // Error output
    return "(" + constants.ERROR_TEXT_5_SYNTONIC_COMMA + ")"
  }
  // Its a valid number
  exp5 = Math.round(exp5)
  if (exp5 >= constants.MAX_OVERFLOW_5_SYNTONIC_COMMA) {
    return "(" + constants.NAME_5_SYNTONIC_COMMA_UP + constants.OVERFLOW_TEXT + ")"
  } else if (exp5 > constants.MAX_REPEATS_5_SYNTONIC_COMMA) {
    return "(" + constants.NAME_5_SYNTONIC_COMMA_UP + exp5 + ")"
  } else if (exp5 > 0) {
    return constants.NAME_5_SYNTONIC_COMMA_UP.repeat(exp5)
  } else if (exp5 <= -constants.MAX_OVERFLOW_5_SYNTONIC_COMMA) {
    return "(" + constants.NAME_5_SYNTONIC_COMMA_DOWN + constants.OVERFLOW_TEXT + ")"
  } else if (exp5 < -constants.MAX_REPEATS_5_SYNTONIC_COMMA) {
    return "(" + constants.NAME_5_SYNTONIC_COMMA_DOWN + -exp5 + ")"
  } else if (exp5 < 0) {
    return constants.NAME_5_SYNTONIC_COMMA_DOWN.repeat(-exp5)
  } else {
    return ""
  }
}

module.exports = get5Label
