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
var pythagAddText = constants.NAME_3_PYTHAG_COMMA_ADD
var pythagRemoveText = constants.NAME_3_PYTHAG_COMMA_REMOVE
var dig3 = constants.MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS
var br3 = constants.BRACKET_3_SHARP_FLAT_RIGHT

var bl5 = constants.BRACKET_5_SYNTONIC_LEFT
var syntonicAddText = constants.NAME_5_SYNTONIC_COMMA_ADD
var syntonicRemoveText = constants.NAME_5_SYNTONIC_COMMA_REMOVE
var dig5 = constants.MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA
var br5 = constants.BRACKET_5_SYNTONIC_RIGHT

var err0 = constants.OVERFLOW_TEXT
var err2 = constants.ERROR_TEXT_2_OCTAVE
var err5 = constants.ERROR_TEXT_5_SYNTONIC_COMMA

var makeRegexStringForBrackets = function(char1, char2, regexString) {
  var str = esc(char1+char2) + regexString
  var str2 = esc("(") + str + esc(")") + "|"
             + esc("[") + str + esc("]") + "|"
             + esc("{") + str + esc("}") + "|"
             + esc("<") + str + esc(">")
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
var stringBracketedPythagAdd = makeRegexStringForVariableDigits(pythagAddText, "", dig3)
var stringBracketedPythagRemove = makeRegexStringForVariableDigits(pythagRemoveText, "", dig3)
var stringBracketedSyntonicAdd = makeRegexStringForVariableDigits(syntonicAddText, "", dig5)
var stringBracketedSyntonicRemove = makeRegexStringForVariableDigits(syntonicRemoveText, "", dig5)

var regexStringInteger = "[ " + esc("^") + "0-9]*"
var regexStringFraction = regexStringInteger + esc("/") + regexStringInteger
var stringBracketedCommaFraction = makeRegexStringForComma(regexStringFraction)
var stringBracketedCommaInteger = makeRegexStringForComma(regexStringInteger)

var stringBracketedOctaveError = esc(bl2 + err2 + br2)
var stringBracketedOctaveUpOverflow = esc(bl2 + octaveText + octaveUpText + err0 + br2)
var stringBracketedOctaveDownOverflow = esc(bl2 + octaveText + octaveDownText + err0 + br2)

var stringBracketedSharpOverflow = esc(bl3 + sharpText + err0 + br3)
var stringBracketedFlatOverflow = esc(bl3 + flatText + err0 + br3)

var stringBracketedSyntonicError = esc(bl5 + err5 + br5)
var stringBracketedSyntonicUpOverflow = esc(bl5 + syntonicAddText + err0 + br5)
var stringBracketedSyntonicDownOverflow = esc(bl5 + syntonicRemoveText + err0 + br5)


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
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD: new RegExp(stringBracketedSyntonicAdd, flags),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE: new RegExp(stringBracketedSyntonicRemove, flags),

  REGEX_BRACKETED_COMMA_INTEGER: new RegExp(stringBracketedCommaInteger, flags),
  REGEX_BRACKETED_COMMA_FRACTION: new RegExp(stringBracketedCommaFraction, flags),

  REGEX_CHAR_SYNTONIC_COMMA_ADD: new RegExp(esc(constants.NAME_5_SYNTONIC_COMMA_ADD), flags),
  REGEX_CHAR_SYNTONIC_COMMA_REMOVE: new RegExp(esc(constants.NAME_5_SYNTONIC_COMMA_REMOVE), flags),
  REGEX_CHAR_SHARP: new RegExp(esc(constants.NAME_3_SHARP), flags),
  REGEX_CHAR_FLAT: new RegExp(esc(constants.NAME_3_FLAT), flags),
  REGEX_CHAR_PYTHAG_COMMA_ADD: new RegExp(esc(constants.NAME_3_PYTHAG_COMMA_ADD), flags),
  REGEX_CHAR_PYTHAG_COMMA_REMOVE: new RegExp(esc(constants.NAME_3_PYTHAG_COMMA_REMOVE), flags),
  REGEX_CHAR_MERCATOR_COMMA_ADD: new RegExp(esc(constants.NAME_3_MERCATOR_COMMA_ADD), flags),
  REGEX_CHAR_MERCATOR_COMMA_REMOVE: new RegExp(esc(constants.NAME_3_MERCATOR_COMMA_REMOVE), flags),
  REGEX_CHAR_SMALL_COMMA_ADD: new RegExp(esc(constants.NAME_3_SMALL_COMMA_ADD), flags),
  REGEX_CHAR_SMALL_COMMA_REMOVE: new RegExp(esc(constants.NAME_3_SMALL_COMMA_REMOVE), flags),
  REGEX_CHAR_TINY_COMMA_ADD: new RegExp(esc(constants.NAME_3_TINY_COMMA_ADD), flags),
  REGEX_CHAR_TINY_COMMA_REMOVE: new RegExp(esc(constants.NAME_3_TINY_COMMA_REMOVE), flags),
  REGEX_CHAR_ERROR: new RegExp("Na|Lo|Hi|N", flags),
  REGEX_CHAR_DIATONIC: new RegExp("[A-G]", flags),
  REGEX_CHAR_OCTAVE: new RegExp("[0-9]", flags),

  DUMMY: "DUMMY"
}

module.exports = result
