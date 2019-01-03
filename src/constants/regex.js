var esc = require('escape-string-regexp')

var texts = require('../constants/text')

var sharedRegexFlags = "g"

var dig2 = texts.MAX_OVERFLOW_DIGITS_2_OCTAVE
var dig3 = texts.MAX_OVERFLOW_DIGITS_3_SHARPS_FLATS
var dig5 = texts.MAX_OVERFLOW_DIGITS_5_SYNTONIC_COMMA

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


var regexStringInteger = "[" + esc(texts.CHAR_COMMA_POWER) + " 0-9]*"
var regexStringFraction = regexStringInteger + esc(texts.CHAR_COMMA_DIVIDE) + regexStringInteger
var stringBracketedCommaFraction = makeRegexStringForComma(regexStringFraction)
var stringBracketedCommaInteger = makeRegexStringForComma(regexStringInteger)

// Errors are of form (.ERR) or (..ERR)
var regexErrorString = esc(texts.BRACKET_LEFT_STANDARD) + ".{0," + texts.ERROR_MAX_CHARS + "}" + esc(texts.ERROR_TEXT + texts.BRACKET_RIGHT_STANDARD)
var regexAnyError = new RegExp(regexErrorString, sharedRegexFlags)

var result = {
  REGEX_ANY_ERROR: regexAnyError,
  REGEX_BRACKETED_OCTAVES_UP: makeRegexForVariableDigits(texts.CHAR_OCTAVE_MARK + texts.CHAR_OCTAVE_UP, dig2),
  REGEX_BRACKETED_OCTAVES_DOWN: makeRegexForVariableDigits(texts.CHAR_OCTAVE_MARK + texts.CHAR_OCTAVE_DOWN, dig2),
  REGEX_BRACKETED_SHARPS: makeRegexForVariableDigits(texts.CHAR_SHARP, dig3),
  REGEX_BRACKETED_FLATS: makeRegexForVariableDigits(texts.CHAR_FLAT, dig3),
  REGEX_BRACKETED_PYTHAG_COMMA_ADD: makeRegexForVariableDigits(texts.CHAR_PYTHAG_ON, dig3),
  REGEX_BRACKETED_PYTHAG_COMMA_REMOVE: makeRegexForVariableDigits(texts.CHAR_PYTHAG_OFF, dig3),
  REGEX_BRACKETED_MERCATOR_COMMA_ADD: makeRegexForVariableDigits(texts.CHAR_MERCATOR_ON, dig3),
  REGEX_BRACKETED_MERCATOR_COMMA_REMOVE: makeRegexForVariableDigits(texts.CHAR_MERCATOR_OFF, dig3),
  REGEX_BRACKETED_SMALL_COMMA_ADD: makeRegexForVariableDigits(texts.CHAR_SMALL_ON, dig3),
  REGEX_BRACKETED_SMALL_COMMA_REMOVE: makeRegexForVariableDigits(texts.CHAR_SMALL_OFF, dig3),
  REGEX_BRACKETED_TINY_COMMA_ADD: makeRegexForVariableDigits(texts.CHAR_TINY_ON, dig3),
  REGEX_BRACKETED_TINY_COMMA_REMOVE: makeRegexForVariableDigits(texts.CHAR_TINY_OFF, dig3),
  REGEX_BRACKETED_SYNTONIC_COMMA_ADD: makeRegexForVariableDigits(texts.CHAR_SYNTONIC_ON, dig5),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE: makeRegexForVariableDigits(texts.CHAR_SYNTONIC_OFF, dig5),
  REGEX_BRACKETED_COMMA_INTEGER: new RegExp(stringBracketedCommaInteger, sharedRegexFlags),
  REGEX_BRACKETED_COMMA_FRACTION: new RegExp(stringBracketedCommaFraction, sharedRegexFlags),
  REGEX_CHAR_SYNTONIC_COMMA_ADD: new RegExp(esc(texts.CHAR_SYNTONIC_ON), sharedRegexFlags),
  REGEX_CHAR_SYNTONIC_COMMA_REMOVE: new RegExp(esc(texts.CHAR_SYNTONIC_OFF), sharedRegexFlags),
  REGEX_CHAR_SHARP: new RegExp(esc(texts.CHAR_SHARP), sharedRegexFlags),
  REGEX_CHAR_FLAT: new RegExp(esc(texts.CHAR_FLAT), sharedRegexFlags),
  REGEX_CHAR_PYTHAG_COMMA_ADD: new RegExp(esc(texts.CHAR_PYTHAG_ON), sharedRegexFlags),
  REGEX_CHAR_PYTHAG_COMMA_REMOVE: new RegExp(esc(texts.CHAR_PYTHAG_OFF), sharedRegexFlags),
  REGEX_CHAR_MERCATOR_COMMA_ADD: new RegExp(esc(texts.CHAR_MERCATOR_ON), sharedRegexFlags),
  REGEX_CHAR_MERCATOR_COMMA_REMOVE: new RegExp(esc(texts.CHAR_MERCATOR_OFF), sharedRegexFlags),
  REGEX_CHAR_SMALL_COMMA_ADD: new RegExp(esc(texts.CHAR_SMALL_ON), sharedRegexFlags),
  REGEX_CHAR_SMALL_COMMA_REMOVE: new RegExp(esc(texts.CHAR_SMALL_OFF), sharedRegexFlags),
  REGEX_CHAR_TINY_COMMA_ADD: new RegExp(esc(texts.CHAR_TINY_ON), sharedRegexFlags),
  REGEX_CHAR_TINY_COMMA_REMOVE: new RegExp(esc(texts.CHAR_TINY_OFF), sharedRegexFlags),
  REGEX_CHAR_DIATONIC: new RegExp("[A-G]", sharedRegexFlags),
  REGEX_CHAR_OCTAVE: new RegExp("[0-9]", sharedRegexFlags),
  DUMMY: "DUMMY"
}

module.exports = result
