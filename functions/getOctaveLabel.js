var chk = require('./checkNumber')

var getOctaveLabel = function(exp2) {

  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name

  // Deal with error cases
  if (!chk(exp2, 1e15)) {
    // Error output
    return "(o.Err)"
  }
  // Its a valid number
  standardOctaveNumber = Math.round(exp2)+4     // For 1/1, exp2=0, and octave is 4 (e.g. C4)
  if (standardOctaveNumber >= 1e6) {
    return "(o+LOTS)"
  } else if (standardOctaveNumber >= 10) {
    return "(o+" + standardOctaveNumber + ")"
  } else if (standardOctaveNumber >= 0) {
    return "" + standardOctaveNumber
  } else if (standardOctaveNumber <= -1e6) {
    return "(o-LOTS)"
  } else {
    return "(o" + standardOctaveNumber + ")"
  }
}

module.exports = getOctaveLabel
