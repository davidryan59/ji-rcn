var ibn = require('is-bounded-number')
var Peo = require('peo')

var texts = require('../constants/text')
var peos = require('../constants/peo')
var getErrorNotation = require('./getErrorNotation')

var bl = texts.BRACKET_LEFT_STANDARD
var br = texts.BRACKET_RIGHT_STANDARD
var st = texts.CHAR_SHARP
var ft = texts.CHAR_FLAT
var errorNotationSF = getErrorNotation(st+ft)
var errorNotationSharp = getErrorNotation(st)
var errorNotationFlat = getErrorNotation(ft)

var numError = Math.pow(10, texts.MAX_ERROR_DIGITS_3_SHARPS_FLATS)
var numOverflow = Math.pow(10, texts.MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS)
var numRepeats = texts.MAX_REPEATS_3_SHARPS_FLATS


var getSharpFlatArray = function(exp3) {
  // Diatonic scale is between -1 and +5
  // Centre of this scale is +2
  // -> Subtract 2, then divide by 7, then round
  // to get number of sharps (+ve) or flats (-ve)

  // Deal with error cases
  if (!ibn(exp3, numError)) {
    // Error output
    return [errorNotationSF, new Peo(), 0]
  }
  // Its a valid number
  var offset = Math.round(exp3) - 2
  var sharps = Math.round(offset/7)
  var peo = new Peo(peos.PEO_SHARP, sharps)

  var getResult = function(txt) {
    return [txt, peo, sharps]
  }

  if (sharps >= numOverflow) {
    return getResult(errorNotationSharp)
  } else if (sharps > numRepeats) {
    return getResult("" + bl + st + sharps + br)
  } else if (sharps > 0) {
    return getResult(st.repeat(sharps))
  } else if (sharps <= -numOverflow) {
    return getResult(errorNotationFlat)
  } else if (sharps < -numRepeats) {
    return getResult("" + bl + ft + -sharps + br)
  } else if (sharps < 0) {
    return getResult(ft.repeat(-sharps))
  } else {
    return getResult("")
  }
}

module.exports = getSharpFlatArray
