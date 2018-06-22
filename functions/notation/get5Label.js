var chk = require('../maths/checkNumber')

var get5Label = function(exp5) {
  // Shorthand for exponent of 5 is
  // repeated ' or . for
  // positive or negative exponents respectively

  // Deal with error cases
  if (!chk(exp5, 1e15)) {
    // Error output
    return "N"
  }
  // Its a valid number
  exp5 = Math.round(exp5)
  if (exp5 >= 1e6) {
    return "('LOTS)"
  } else if (exp5 >= 5) {
    return "('" + exp5 + ")"
  } else if (exp5 > 0) {
    return "'".repeat(exp5)
  } else if (exp5 <= -1e6) {
    return "(.LOTS)"
  } else if (exp5 <= -5) {
    return "(." + -exp5 + ")"
  } else if (exp5 < 0) {
    return ".".repeat(-exp5)
  } else {
    return ""
  }
}

module.exports = get5Label
