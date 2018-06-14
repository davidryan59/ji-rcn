var chk = require('./checkNumber')

var getSharpsAndFlats = function(exp3) {
  // Diatonic scale is between -1 and +5
  // Centre of this scale is +2
  // -> Subtract 2, then divide by 7, then round
  // to get number of sharps (+ve) or flats (-ve)

  // Deal with error cases
  if (!chk(exp3, 1e15)) {
    // Error output
    return "N"
  }
  // Have a number
  var offset = Math.round(exp3) - 2
  var sharps = Math.round(offset/7)
  if (sharps >= 1e6) {
    return "(#^LOTS)"
  } else if (sharps >= 6) {
    return "(#^" + sharps + ")"
  } else if (sharps > 0) {
    return "#".repeat(sharps)
  } else if (sharps <= -1e6) {
    return "(b^LOTS)"
  } else if (sharps <= -6) {
    return "(b^" + -sharps + ")"
  } else if (sharps < 0) {
    return "b".repeat(-sharps)
  } else {
    return ""
  }
}

module.exports = getSharpsAndFlats
