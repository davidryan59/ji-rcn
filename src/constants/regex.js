var esc = require('escape-string-regexp')

var constants = require('../constants/general')

var bls = constants.BRACKET_LEFT_STANDARD
var brs = constants.BRACKET_RIGHT_STANDARD

var octaveText = constants.CHAR_OCTAVE_MARK
var octaveUpText = constants.CHAR_OCTAVE_UP
var octaveDownText = constants.CHAR_OCTAVE_DOWN
var sharpText = constants.CHAR_SHARP
var flatText = constants.CHAR_FLAT
var syntonicAddText = constants.CHAR_SYNTONIC_ON
var syntonicRemoveText = constants.CHAR_SYNTONIC_OFF

var dig2 = constants.MAX_OVERFLOW_DIGITS_2_OCTAVE
var dig3 = constants.MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS
var dig5 = constants.MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA

var err0 = constants.OVERFLOW_TEXT
var err2 = constants.ERROR_TEXT_2_OCTAVE
var err5 = constants.ERROR_TEXT_5_SYNTONIC_COMMA

var makeRegexStringForBrackets = function(char1, char2, regexString) {
  // Going to allow four different types of bracket to parse
  var str1 = esc(char1+char2) + regexString
  var str2 = esc("(") + str1 + esc(")") + "|"
             + esc("[") + str1 + esc("]") + "|"
             + esc("{") + str1 + esc("}") + "|"
             + esc("<") + str1 + esc(">")
  return str2
}

var makeRegexStringForVariableDigits = function(char1, char2, digits) {
  // String to generate Regex for something like (o+11), (#999999)
  var regexString = "[0-9]{1," + digits + "}"
  return makeRegexStringForBrackets(char1, char2, regexString)
}

var makeRegexStringForComma = function(regexString) {
  return makeRegexStringForBrackets("", "", regexString)
}

var stringBracketedOctavesUp = makeRegexStringForVariableDigits(octaveText, octaveUpText, dig2)
var stringBracketedOctavesDown = makeRegexStringForVariableDigits(octaveText, octaveDownText, dig2)
var stringBracketedSharps = makeRegexStringForVariableDigits(sharpText, "", dig3)
var stringBracketedFlats = makeRegexStringForVariableDigits(flatText, "", dig3)
var stringBracketedPythagAdd = makeRegexStringForVariableDigits(constants.CHAR_PYTHAG_ON, "", dig3)
var stringBracketedPythagRemove = makeRegexStringForVariableDigits(constants.CHAR_PYTHAG_OFF, "", dig3)
var stringBracketedMercatorAdd = makeRegexStringForVariableDigits(constants.CHAR_MERCATOR_ON, "", dig3)
var stringBracketedMercatorRemove = makeRegexStringForVariableDigits(constants.CHAR_MERCATOR_OFF, "", dig3)
var stringBracketedSmallAdd = makeRegexStringForVariableDigits(constants.CHAR_SMALL_ON, "", dig3)
var stringBracketedSmallRemove = makeRegexStringForVariableDigits(constants.CHAR_SMALL_OFF, "", dig3)
var stringBracketedTinyAdd = makeRegexStringForVariableDigits(constants.CHAR_TINY_ON, "", dig3)
var stringBracketedTinyRemove = makeRegexStringForVariableDigits(constants.CHAR_TINY_OFF, "", dig3)
var stringBracketedSyntonicAdd = makeRegexStringForVariableDigits(syntonicAddText, "", dig5)
var stringBracketedSyntonicRemove = makeRegexStringForVariableDigits(syntonicRemoveText, "", dig5)

var regexStringInteger = "[" + esc(" " + constants.CHAR_COMMA_POWER) + "0-9]*"
var regexStringFraction = regexStringInteger + esc(constants.CHAR_COMMA_DIVIDE) + regexStringInteger
var stringBracketedCommaFraction = makeRegexStringForComma(regexStringFraction)
var stringBracketedCommaInteger = makeRegexStringForComma(regexStringInteger)

var stringBracketedOctaveError = esc(bls + err2 + brs)
var stringBracketedOctaveUpOverflow = esc(bls + octaveText + octaveUpText + err0 + brs)
var stringBracketedOctaveDownOverflow = esc(bls + octaveText + octaveDownText + err0 + brs)

var stringBracketedSharpOverflow = esc(bls + sharpText + err0 + brs)
var stringBracketedFlatOverflow = esc(bls + flatText + err0 + brs)

var stringBracketedSyntonicError = esc(bls + err5 + brs)
var stringBracketedSyntonicUpOverflow = esc(bls + syntonicAddText + err0 + brs)
var stringBracketedSyntonicDownOverflow = esc(bls + syntonicRemoveText + err0 + brs)


var flags = "g"

var result = {

  REGEX_BRACKETED_OCTAVE_ERROR: new RegExp(stringBracketedOctaveError, flags),
  REGEX_BRACKETED_OCTAVE_UP_OVERFLOW: new RegExp(stringBracketedOctaveUpOverflow, flags),
  REGEX_BRACKETED_OCTAVE_DOWN_OVERFLOW: new RegExp(stringBracketedOctaveDownOverflow, flags),
  REGEX_BRACKETED_SHARP_OVERFLOW: new RegExp(stringBracketedSharpOverflow, flags),
  REGEX_BRACKETED_FLAT_OVERFLOW: new RegExp(stringBracketedFlatOverflow, flags),
  REGEX_BRACKETED_SYNTONIC_ERROR: new RegExp(stringBracketedSyntonicError, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD_OVERFLOW: new RegExp(stringBracketedSyntonicUpOverflow, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE_OVERFLOW: new RegExp(stringBracketedSyntonicDownOverflow, flags),

  REGEX_BRACKETED_OCTAVES_UP: new RegExp(stringBracketedOctavesUp, flags),
  REGEX_BRACKETED_OCTAVES_DOWN: new RegExp(stringBracketedOctavesDown, flags),
  REGEX_BRACKETED_SHARPS: new RegExp(stringBracketedSharps, flags),
  REGEX_BRACKETED_FLATS: new RegExp(stringBracketedFlats, flags),
  REGEX_BRACKETED_PYTHAG_COMMA_ADD: new RegExp(stringBracketedPythagAdd, flags),
  REGEX_BRACKETED_PYTHAG_COMMA_REMOVE: new RegExp(stringBracketedPythagRemove, flags),
  REGEX_BRACKETED_MERCATOR_COMMA_ADD: new RegExp(stringBracketedMercatorAdd, flags),
  REGEX_BRACKETED_MERCATOR_COMMA_REMOVE: new RegExp(stringBracketedMercatorRemove, flags),
  REGEX_BRACKETED_SMALL_COMMA_ADD: new RegExp(stringBracketedSmallAdd, flags),
  REGEX_BRACKETED_SMALL_COMMA_REMOVE: new RegExp(stringBracketedSmallRemove, flags),
  REGEX_BRACKETED_TINY_COMMA_ADD: new RegExp(stringBracketedTinyAdd, flags),
  REGEX_BRACKETED_TINY_COMMA_REMOVE: new RegExp(stringBracketedTinyRemove, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD: new RegExp(stringBracketedSyntonicAdd, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE: new RegExp(stringBracketedSyntonicRemove, flags),

  REGEX_BRACKETED_COMMA_INTEGER: new RegExp(stringBracketedCommaInteger, flags),
  REGEX_BRACKETED_COMMA_FRACTION: new RegExp(stringBracketedCommaFraction, flags),

  REGEX_CHAR_SYNTONIC_COMMA_ADD: new RegExp(esc(constants.CHAR_SYNTONIC_ON), flags),
  REGEX_CHAR_SYNTONIC_COMMA_REMOVE: new RegExp(esc(constants.CHAR_SYNTONIC_OFF), flags),
  REGEX_CHAR_SHARP: new RegExp(esc(constants.CHAR_SHARP), flags),
  REGEX_CHAR_FLAT: new RegExp(esc(constants.CHAR_FLAT), flags),
  REGEX_CHAR_PYTHAG_COMMA_ADD: new RegExp(esc(constants.CHAR_PYTHAG_ON), flags),
  REGEX_CHAR_PYTHAG_COMMA_REMOVE: new RegExp(esc(constants.CHAR_PYTHAG_OFF), flags),
  REGEX_CHAR_MERCATOR_COMMA_ADD: new RegExp(esc(constants.CHAR_MERCATOR_ON), flags),
  REGEX_CHAR_MERCATOR_COMMA_REMOVE: new RegExp(esc(constants.CHAR_MERCATOR_OFF), flags),
  REGEX_CHAR_SMALL_COMMA_ADD: new RegExp(esc(constants.CHAR_SMALL_ON), flags),
  REGEX_CHAR_SMALL_COMMA_REMOVE: new RegExp(esc(constants.CHAR_SMALL_OFF), flags),
  REGEX_CHAR_TINY_COMMA_ADD: new RegExp(esc(constants.CHAR_TINY_ON), flags),
  REGEX_CHAR_TINY_COMMA_REMOVE: new RegExp(esc(constants.CHAR_TINY_OFF), flags),
  REGEX_CHAR_ERROR: new RegExp("Na|Lo|Hi|N", flags),
  REGEX_CHAR_DIATONIC: new RegExp("[A-G]", flags),
  REGEX_CHAR_OCTAVE: new RegExp("[0-9]", flags),

  DUMMY: "DUMMY"
}

module.exports = result
