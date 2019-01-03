var esc = require('escape-string-regexp')

var constants = require('../constants/general')

var sharedRegexFlags = "g"

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

var makeRegexStringForBrackets = function(text, regexString) {
  // Going to allow four different types of bracket to parse
  var str1 = esc(text) + regexString
  var str2 = esc("(") + str1 + esc(")") + "|"
             + esc("[") + str1 + esc("]") + "|"
             + esc("{") + str1 + esc("}") + "|"
             + esc("<") + str1 + esc(">")
  return str2
}

var makeRegexForVariableDigits = function(text, digits) {
  // String to generate Regex for something like (o+11), (#999999)
  var regexString = "[0-9]{1," + digits + "}"
  var regexBracketString = makeRegexStringForBrackets(text, regexString)
  return new RegExp(regexBracketString, sharedRegexFlags)
}

var makeRegexStringForComma = function(regexString) {
  return makeRegexStringForBrackets("", regexString)
}


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


var result = {

  REGEX_BRACKETED_OCTAVE_ERROR: new RegExp(stringBracketedOctaveError, sharedRegexFlags),
  REGEX_BRACKETED_OCTAVE_UP_OVERFLOW: new RegExp(stringBracketedOctaveUpOverflow, sharedRegexFlags),
  REGEX_BRACKETED_OCTAVE_DOWN_OVERFLOW: new RegExp(stringBracketedOctaveDownOverflow, sharedRegexFlags),
  REGEX_BRACKETED_SHARP_OVERFLOW: new RegExp(stringBracketedSharpOverflow, sharedRegexFlags),
  REGEX_BRACKETED_FLAT_OVERFLOW: new RegExp(stringBracketedFlatOverflow, sharedRegexFlags),
  REGEX_BRACKETED_SYNTONIC_ERROR: new RegExp(stringBracketedSyntonicError, sharedRegexFlags),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD_OVERFLOW: new RegExp(stringBracketedSyntonicUpOverflow, sharedRegexFlags),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE_OVERFLOW: new RegExp(stringBracketedSyntonicDownOverflow, sharedRegexFlags),

  REGEX_BRACKETED_OCTAVES_UP: makeRegexForVariableDigits(octaveText + octaveUpText, dig2),
  REGEX_BRACKETED_OCTAVES_DOWN: makeRegexForVariableDigits(octaveText + octaveDownText, dig2),
  REGEX_BRACKETED_SHARPS: makeRegexForVariableDigits(sharpText, dig3),
  REGEX_BRACKETED_FLATS: makeRegexForVariableDigits(flatText, dig3),
  REGEX_BRACKETED_PYTHAG_COMMA_ADD: makeRegexForVariableDigits(constants.CHAR_PYTHAG_ON, dig3),
  REGEX_BRACKETED_PYTHAG_COMMA_REMOVE: makeRegexForVariableDigits(constants.CHAR_PYTHAG_OFF, dig3),
  REGEX_BRACKETED_MERCATOR_COMMA_ADD: makeRegexForVariableDigits(constants.CHAR_MERCATOR_ON, dig3),
  REGEX_BRACKETED_MERCATOR_COMMA_REMOVE: makeRegexForVariableDigits(constants.CHAR_MERCATOR_OFF, dig3),
  REGEX_BRACKETED_SMALL_COMMA_ADD: makeRegexForVariableDigits(constants.CHAR_SMALL_ON, dig3),
  REGEX_BRACKETED_SMALL_COMMA_REMOVE: makeRegexForVariableDigits(constants.CHAR_SMALL_OFF, dig3),
  REGEX_BRACKETED_TINY_COMMA_ADD: makeRegexForVariableDigits(constants.CHAR_TINY_ON, dig3),
  REGEX_BRACKETED_TINY_COMMA_REMOVE: makeRegexForVariableDigits(constants.CHAR_TINY_OFF, dig3),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD: makeRegexForVariableDigits(syntonicAddText, dig5),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE: makeRegexForVariableDigits(syntonicRemoveText, dig5),

  REGEX_BRACKETED_COMMA_INTEGER: new RegExp(stringBracketedCommaInteger, sharedRegexFlags),
  REGEX_BRACKETED_COMMA_FRACTION: new RegExp(stringBracketedCommaFraction, sharedRegexFlags),

  REGEX_CHAR_SYNTONIC_COMMA_ADD: new RegExp(esc(constants.CHAR_SYNTONIC_ON), sharedRegexFlags),
  REGEX_CHAR_SYNTONIC_COMMA_REMOVE: new RegExp(esc(constants.CHAR_SYNTONIC_OFF), sharedRegexFlags),
  REGEX_CHAR_SHARP: new RegExp(esc(constants.CHAR_SHARP), sharedRegexFlags),
  REGEX_CHAR_FLAT: new RegExp(esc(constants.CHAR_FLAT), sharedRegexFlags),
  REGEX_CHAR_PYTHAG_COMMA_ADD: new RegExp(esc(constants.CHAR_PYTHAG_ON), sharedRegexFlags),
  REGEX_CHAR_PYTHAG_COMMA_REMOVE: new RegExp(esc(constants.CHAR_PYTHAG_OFF), sharedRegexFlags),
  REGEX_CHAR_MERCATOR_COMMA_ADD: new RegExp(esc(constants.CHAR_MERCATOR_ON), sharedRegexFlags),
  REGEX_CHAR_MERCATOR_COMMA_REMOVE: new RegExp(esc(constants.CHAR_MERCATOR_OFF), sharedRegexFlags),
  REGEX_CHAR_SMALL_COMMA_ADD: new RegExp(esc(constants.CHAR_SMALL_ON), sharedRegexFlags),
  REGEX_CHAR_SMALL_COMMA_REMOVE: new RegExp(esc(constants.CHAR_SMALL_OFF), sharedRegexFlags),
  REGEX_CHAR_TINY_COMMA_ADD: new RegExp(esc(constants.CHAR_TINY_ON), sharedRegexFlags),
  REGEX_CHAR_TINY_COMMA_REMOVE: new RegExp(esc(constants.CHAR_TINY_OFF), sharedRegexFlags),
  REGEX_CHAR_ERROR: new RegExp("Na|Lo|Hi|N", sharedRegexFlags),
  REGEX_CHAR_DIATONIC: new RegExp("[A-G]", sharedRegexFlags),
  REGEX_CHAR_OCTAVE: new RegExp("[0-9]", sharedRegexFlags),

  DUMMY: "DUMMY"
}

module.exports = result
