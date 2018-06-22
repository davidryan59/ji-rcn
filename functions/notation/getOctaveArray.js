var Peo = require('peo')

var chk = require('../maths/checkNumber')

var getOctaveArray = function(exp2) {

  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name

  // Deal with error cases
  if (!chk(exp2, 1e15)) {
    // Error output
    return ["(o.Err)", new Peo()]
  }
  // Its a valid number
  exp2 = Math.round(exp2)
  var peo = new Peo({2:exp2})
  standardOctaveNumber = exp2 + 4     // For 1/1, exp2=0, and octave is 4 (e.g. C4)
  if (standardOctaveNumber >= 1e6) {
    return ["(o+LOTS)", peo]
  } else if (standardOctaveNumber >= 10) {
    return ["(o+" + standardOctaveNumber + ")", peo]
  } else if (standardOctaveNumber >= 0) {
    return ["" + standardOctaveNumber, peo]
  } else if (standardOctaveNumber <= -1e6) {
    return ["(o-LOTS)", peo]
  } else {
    return ["(o" + standardOctaveNumber + ")", peo]
  }
}

module.exports = getOctaveArray
