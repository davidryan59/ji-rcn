var ibn = require('is-bounded-number')
var Peo = require('peo')

var getOctaveArray = function(exp2) {

  // Returns an octave number corresponding to a 2-exponent.
  // Note: 1 = 2^0 is in octave 4

  // Deal with error cases
  if (!ibn(exp2, 1e15)) {
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
