var ibn = require('is-bounded-number')
var Peo = require('peo')

var constants = require('../constants/general')

var bl = constants.BRACKET_3_SHARP_FLAT_LEFT
var br = constants.BRACKET_3_SHARP_FLAT_RIGHT
var ot = constants.OVERFLOW_TEXT
var st = constants.NAME_3_SHARP
var ft = constants.NAME_3_FLAT

var numError = Math.pow(10, constants.MAX_ERROR_DIGITS_3_SHARPS_FLATS)
var numOverflow = Math.pow(10, constants.MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS)
var numRepeats = constants.MAX_REPEATS_3_SHARPS_FLATS


var getSharpFlatArray = function(exp3) {
  // Diatonic scale is between -1 and +5
  // Centre of this scale is +2
  // -> Subtract 2, then divide by 7, then round
  // to get number of sharps (+ve) or flats (-ve)

  // Deal with error cases
  if (!ibn(exp3, numError)) {
    // Error output
    return [constants.ERROR_TEXT_3_SHARPS_FLATS, new Peo(), 0]
  }
  // Its a valid number
  var offset = Math.round(exp3) - 2
  var sharps = Math.round(offset/7)
  var peo = new Peo(constants.PEO_3_SHARP, sharps)

  var getResult = function(txt) {
    return [txt, peo, sharps]
  }

  if (sharps >= numOverflow) {
    return getResult("" + bl + st + ot + br)
  } else if (sharps > numRepeats) {
    return getResult("" + bl + st + sharps + br)
  } else if (sharps > 0) {
    return getResult(st.repeat(sharps))
  } else if (sharps <= -numOverflow) {
    return getResult("" + bl + ft + ot + br)
  } else if (sharps < -numRepeats) {
    return getResult("" + bl + ft + -sharps + br)
  } else if (sharps < 0) {
    return getResult(ft.repeat(-sharps))
  } else {
    return getResult("")
  }
}

module.exports = getSharpFlatArray
