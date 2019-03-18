var esc = require('escape-string-regexp');

var consts = require('./consts');

var sharedRegexFlags = 'g';

var makeRegexStringForCommaBrackets = function makeRegexStringForCommaBrackets(regexString) {
  return esc(consts.BRACKET_LEFT_COMMA) + regexString + esc(consts.BRACKET_RIGHT_COMMA);
};

var regexStringInteger = '[' + esc(consts.CHAR_COMMA_POWER) + ' 0-9]{0,' + consts.BRACKET_MAX_DIGITS + '}';
var regexStringFraction = regexStringInteger + esc(consts.CHAR_COMMA_DIVIDE) + regexStringInteger;
var stringBracketedCommaFraction = makeRegexStringForCommaBrackets(regexStringFraction);
var stringBracketedCommaInteger = makeRegexStringForCommaBrackets(regexStringInteger);

// Errors are of form (.ERR) or (..ERR)
var regexErrorString = esc(consts.BRACKET_LEFT_STANDARD) + '.{1,' + consts.ERROR_MAX_CHARS + '}' + esc(consts.ERROR_TEXT + consts.BRACKET_RIGHT_STANDARD);

var charsRegexString = "("
  + consts.CHARS_OCTAVE_UP + "|"
  + consts.CHARS_OCTAVE_DOWN + "|"
  + consts.CHAR_SHARP + "|"
  + consts.CHAR_FLAT + "|"
  + consts.CHAR_SYNTONIC_ON + "|"
  + consts.CHAR_SYNTONIC_OFF + "|"
  + consts.CHAR_PYTHAG_ON + "|"
  + consts.CHAR_PYTHAG_OFF + "|"
  + consts.CHAR_MERCATOR_ON + "|"
  + consts.CHAR_MERCATOR_OFF + "|"
  + consts.CHAR_SMALL_ON + "|"
  + consts.CHAR_SMALL_OFF + "|"
  + consts.CHAR_TINY_ON + "|"
  + consts.CHAR_TINY_OFF + "|"
  + ")";

var singleCharRegex = new RegExp(charsRegexString, sharedRegexFlags);

var numbersBracketRegexString = '[0-9]{1,' + consts.BRACKET_MAX_DIGITS + '}';

var makeBracketRegex = function makeBracketRegex(text) {
  // String to generate Regex for something like (o+11), (#999999)
  var textInBracketRegexString = esc(consts.BRACKET_LEFT_STANDARD) + esc(text) + numbersBracketRegexString + esc(consts.BRACKET_RIGHT_STANDARD);
  return new RegExp(textInBracketRegexString, sharedRegexFlags);
};

// Generate Regex for something like (o+11), (#999999)
var bracketCharRegexString = esc(consts.BRACKET_LEFT_STANDARD) + charsRegexString + numbersBracketRegexString + esc(consts.BRACKET_RIGHT_STANDARD);
var bracketCharRegex = new RegExp(bracketCharRegexString, sharedRegexFlags);


module.exports = {
  REGEX_SINGLE_ELT: singleCharRegex,
  REGEX_BRACKET_ELT: bracketCharRegex,

  REGEX_ANY_ERROR: new RegExp(regexErrorString, sharedRegexFlags),
  REGEX_COMMA_SPLIT: new RegExp('[' + esc(' ' + consts.BRACKET_LEFT_COMMA + consts.BRACKET_RIGHT_COMMA) + ']', sharedRegexFlags),

  REGEX_BRACKETED_OCTAVES_UP: makeBracketRegex(consts.CHARS_OCTAVE_UP),
  REGEX_BRACKETED_OCTAVES_DOWN: makeBracketRegex(consts.CHARS_OCTAVE_DOWN),
  REGEX_BRACKETED_SHARPS: makeBracketRegex(consts.CHAR_SHARP),
  REGEX_BRACKETED_FLATS: makeBracketRegex(consts.CHAR_FLAT),

  REGEX_BRACKETED_PYTHAG_COMMA_ADD: makeBracketRegex(consts.CHAR_PYTHAG_ON),
  REGEX_BRACKETED_PYTHAG_COMMA_REMOVE: makeBracketRegex(consts.CHAR_PYTHAG_OFF),
  REGEX_BRACKETED_MERCATOR_COMMA_ADD: makeBracketRegex(consts.CHAR_MERCATOR_ON),
  REGEX_BRACKETED_MERCATOR_COMMA_REMOVE: makeBracketRegex(consts.CHAR_MERCATOR_OFF),
  REGEX_BRACKETED_SMALL_COMMA_ADD: makeBracketRegex(consts.CHAR_SMALL_ON),
  REGEX_BRACKETED_SMALL_COMMA_REMOVE: makeBracketRegex(consts.CHAR_SMALL_OFF),
  REGEX_BRACKETED_TINY_COMMA_ADD: makeBracketRegex(consts.CHAR_TINY_ON),
  REGEX_BRACKETED_TINY_COMMA_REMOVE: makeBracketRegex(consts.CHAR_TINY_OFF),

  REGEX_BRACKETED_SYNTONIC_COMMA_ADD: makeBracketRegex(consts.CHAR_SYNTONIC_ON),
  REGEX_BRACKETED_SYNTONIC_COMMA_REMOVE: makeBracketRegex(consts.CHAR_SYNTONIC_OFF),

  REGEX_BRACKETED_COMMA_INTEGER: new RegExp(stringBracketedCommaInteger, sharedRegexFlags),
  REGEX_BRACKETED_COMMA_FRACTION: new RegExp(stringBracketedCommaFraction, sharedRegexFlags),

  REGEX_CHAR_SYNTONIC_COMMA_ADD: new RegExp(esc(consts.CHAR_SYNTONIC_ON), sharedRegexFlags),
  REGEX_CHAR_SYNTONIC_COMMA_REMOVE: new RegExp(esc(consts.CHAR_SYNTONIC_OFF), sharedRegexFlags),
  REGEX_CHAR_SHARP: new RegExp(esc(consts.CHAR_SHARP), sharedRegexFlags),
  REGEX_CHAR_FLAT: new RegExp(esc(consts.CHAR_FLAT), sharedRegexFlags),
  REGEX_CHAR_PYTHAG_COMMA_ADD: new RegExp(esc(consts.CHAR_PYTHAG_ON), sharedRegexFlags),
  REGEX_CHAR_PYTHAG_COMMA_REMOVE: new RegExp(esc(consts.CHAR_PYTHAG_OFF), sharedRegexFlags),
  REGEX_CHAR_MERCATOR_COMMA_ADD: new RegExp(esc(consts.CHAR_MERCATOR_ON), sharedRegexFlags),
  REGEX_CHAR_MERCATOR_COMMA_REMOVE: new RegExp(esc(consts.CHAR_MERCATOR_OFF), sharedRegexFlags),
  REGEX_CHAR_SMALL_COMMA_ADD: new RegExp(esc(consts.CHAR_SMALL_ON), sharedRegexFlags),
  REGEX_CHAR_SMALL_COMMA_REMOVE: new RegExp(esc(consts.CHAR_SMALL_OFF), sharedRegexFlags),
  REGEX_CHAR_TINY_COMMA_ADD: new RegExp(esc(consts.CHAR_TINY_ON), sharedRegexFlags),
  REGEX_CHAR_TINY_COMMA_REMOVE: new RegExp(esc(consts.CHAR_TINY_OFF), sharedRegexFlags),
  REGEX_CHAR_DIATONIC: new RegExp('[A-G]', sharedRegexFlags),
  REGEX_CHAR_OCTAVE: new RegExp('[0-9]', sharedRegexFlags)
};
