var esc = require('escape-string-regexp')

var constants = require('../constants/general')

var bl2 = constants.BRACKET_2_OCTAVE_LEFT
var octaveText = constants.NAME_2_OCTAVE
var octaveUpText = constants.SYMBOL_2_OCTAVE_UP
var octaveDownText = constants.SYMBOL_2_OCTAVE_DOWN
var dig2 = constants.MAX_OVERFLOW_DIGITS_2_OCTAVE
var br2 = constants.BRACKET_2_OCTAVE_RIGHT

var bl3 = constants.BRACKET_3_SHARP_FLAT_LEFT
var sharpText = constants.NAME_3_SHARP
var flatText = constants.NAME_3_FLAT
var dig3 = constants.MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS
var br3 = constants.BRACKET_3_SHARP_FLAT_RIGHT

var bl5 = constants.BRACKET_5_SYNTONIC_LEFT
var syntonicUpText = constants.NAME_5_SYNTONIC_COMMA_ADD
var syntonicDownText = constants.NAME_5_SYNTONIC_COMMA_REMOVE
var dig5 = constants.MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA
var br5 = constants.BRACKET_5_SYNTONIC_RIGHT

var err0 = constants.OVERFLOW_TEXT
var err2 = constants.ERROR_TEXT_2_OCTAVE
var err5 = constants.ERROR_TEXT_5_SYNTONIC_COMMA


var makeRegexStringForVariableDigits = function(bl, char1, char2, digits, br) {
  // String to generate Regex for something like (o+11), (#999999)
  return esc(bl+char1+char2) + "[0-9]{1," + digits + "}" + esc(br)
}
var stringBracketedOctavesUp = makeRegexStringForVariableDigits(bl2, octaveText, octaveUpText, dig2, br2)
var stringBracketedOctavesDown = makeRegexStringForVariableDigits(bl2, octaveText, octaveDownText, dig2, br2)

var stringBracketedSharps = makeRegexStringForVariableDigits(bl3, sharpText, "", dig3, br3)
var stringBracketedFlats = makeRegexStringForVariableDigits(bl3, flatText, "", dig3, br3)

var stringBracketedSyntonicUp = makeRegexStringForVariableDigits(bl5, syntonicUpText, "", dig5, br5)
var stringBracketedSyntonicDown = makeRegexStringForVariableDigits(bl5, syntonicDownText, "", dig5, br5)


var stringBracketedOctaveError = esc(bl2 + err2 + br2)
var stringBracketedOctaveUpOverflow = esc(bl2 + octaveText + octaveUpText + err0 + br2)
var stringBracketedOctaveDownOverflow = esc(bl2 + octaveText + octaveDownText + err0 + br2)

var stringBracketedSharpOverflow = esc(bl3 + sharpText + err0 + br3)
var stringBracketedFlatOverflow = esc(bl3 + flatText + err0 + br3)

var stringBracketedSyntonicError = esc(bl5 + err5 + br5)
var stringBracketedSyntonicUpOverflow = esc(bl5 + syntonicUpText + err0 + br5)
var stringBracketedSyntonicDownOverflow = esc(bl5 + syntonicDownText + err0 + br5)


var flags = "g"

var result = {
  REGEX_BRACKETED_OCTAVES_UP: new RegExp(stringBracketedOctavesUp, flags),
  REGEX_BRACKETED_OCTAVES_DOWN: new RegExp(stringBracketedOctavesDown, flags),
  REGEX_BRACKETED_SHARPS: new RegExp(stringBracketedSharps, flags),
  REGEX_BRACKETED_FLATS: new RegExp(stringBracketedFlats, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD: new RegExp(stringBracketedSyntonicUp, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE: new RegExp(stringBracketedSyntonicDown, flags),

  REGEX_BRACKETED_OCTAVE_ERROR: new RegExp(stringBracketedOctaveError, flags),
  REGEX_BRACKETED_OCTAVE_UP_OVERFLOW: new RegExp(stringBracketedOctaveUpOverflow, flags),
  REGEX_BRACKETED_OCTAVE_DOWN_OVERFLOW: new RegExp(stringBracketedOctaveDownOverflow, flags),
  REGEX_BRACKETED_SHARP_OVERFLOW: new RegExp(stringBracketedSharpOverflow, flags),
  REGEX_BRACKETED_FLAT_OVERFLOW: new RegExp(stringBracketedFlatOverflow, flags),
  REGEX_BRACKETED_SYNTONIC_ERROR: new RegExp(stringBracketedSyntonicError, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD_OVERFLOW: new RegExp(stringBracketedSyntonicUpOverflow, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE_OVERFLOW: new RegExp(stringBracketedSyntonicDownOverflow, flags),

  REGEX_CHAR_OCTAVE: new RegExp("[0-9]", flags),
  REGEX_CHAR_DIATONIC: new RegExp("[A-G]", flags),
  REGEX_CHAR_SHARP: new RegExp(esc(constants.NAME_3_SHARP), flags),
  REGEX_CHAR_FLAT: new RegExp(esc(constants.NAME_3_FLAT), flags),
  REGEX_CHAR_SYNTONIC_COMMA_ADD: new RegExp(esc(constants.NAME_5_SYNTONIC_COMMA_ADD), flags),
  REGEX_CHAR_SYNTONIC_COMMA_REMOVE: new RegExp(esc(constants.NAME_5_SYNTONIC_COMMA_REMOVE), flags),

  DUMMY: "DUMMY"
}

module.exports = result
