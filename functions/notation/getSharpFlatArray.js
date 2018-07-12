var ibn = require('is-bounded-number')
var Peo = require('peo')

var getSharpFlatArray = function(exp3) {
  // Diatonic scale is between -1 and +5
  // Centre of this scale is +2
  // -> Subtract 2, then divide by 7, then round
  // to get number of sharps (+ve) or flats (-ve)

  // Deal with error cases
  if (!ibn(exp3, 1e15)) {
    // Error output
    return ["N", new Peo(), 0]
  }
  // Its a valid number
  var offset = Math.round(exp3) - 2
  var sharps = Math.round(offset/7)
  var peo = new Peo({3:7, 2:-11}, sharps)

  var getResult = function(txt) {
    return [txt, peo, sharps]
  }

  if (sharps >= 1e6) {
    return getResult("(#LOTS)")
  } else if (sharps >= 5) {
    return getResult("(#" + sharps + ")")
  } else if (sharps > 0) {
    return getResult("#".repeat(sharps))
  } else if (sharps <= -1e6) {
    return getResult("(bLOTS)")
  } else if (sharps <= -5) {
    return getResult("(b" + -sharps + ")")
  } else if (sharps < 0) {
    return getResult("b".repeat(-sharps))
  } else {
    return getResult("")
  }
}

module.exports = getSharpFlatArray
