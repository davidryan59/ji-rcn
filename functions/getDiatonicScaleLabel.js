var chk = require('./checkNumber')

var getDiatonicScaleLabel = function(exp3) {

  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name

  // Deal with error cases
  if (!chk(exp3, 1e15)) {
    // Error output
    return "Na"
  }
  // Have a number
  exp3 = Math.round(exp3)
  if (exp3 < -1) {
    return "Lo"
  }
  if (exp3 > 5) {
    return "Hi"
  }

  // Give some output
  var result = null
  switch (exp3) {
    case -1: return "F"
    case 0: return "C"
    case 1: return "G"
    case 2: return "D"
    case 3: return "A"
    case 4: return "E"
    case 5: return "B"
  }
}

module.exports = getDiatonicScaleLabel
