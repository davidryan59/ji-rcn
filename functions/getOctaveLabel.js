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
  octaves = Math.round(exp2)
  if (octaves >= 1e6) {
    return "(o+LOTS)"
  } else if (octaves >= 10) {
    return "(o+" + octaves + ")"
  } else if (octaves >= 0) {
    return "" + octaves
  } else if (octaves <= -1e6) {
    return "(o-LOTS)"
  } else {
    return "(o" + octaves + ")"
  }
}

module.exports = getOctaveLabel
