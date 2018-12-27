var ibn = require('is-bounded-number')
var Peo = require('peo')

var constants = require('../constants')


var getSharpFlatArray = function(exp3) {
  // Diatonic scale is between -1 and +5
  // Centre of this scale is +2
  // -> Subtract 2, then divide by 7, then round
  // to get number of sharps (+ve) or flats (-ve)

  // Deal with error cases
  if (!ibn(exp3, constants.MAX_ERROR_3_SHARPS_FLATS)) {
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

  if (sharps >= constants.MAX_OVERFLOW_3_SHARPS_FLATS) {
    return getResult("(" + constants.NAME_3_SHARP + constants.OVERFLOW_TEXT + ")")
  } else if (sharps > constants.MAX_REPEATS_3_SHARPS_FLATS) {
    return getResult("(" + constants.NAME_3_SHARP + sharps + ")")
  } else if (sharps > 0) {
    return getResult(constants.NAME_3_SHARP.repeat(sharps))
  } else if (sharps <= -constants.MAX_OVERFLOW_3_SHARPS_FLATS) {
    return getResult("(" + constants.NAME_3_FLAT + constants.OVERFLOW_TEXT + ")")
  } else if (sharps < -constants.MAX_REPEATS_3_SHARPS_FLATS) {
    return getResult("(" + constants.NAME_3_FLAT + -sharps + ")")
  } else if (sharps < 0) {
    return getResult(constants.NAME_3_FLAT.repeat(-sharps))
  } else {
    return getResult("")
  }
}

module.exports = getSharpFlatArray
