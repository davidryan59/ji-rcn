var esc = require('escape-string-regexp');

var consts = require('./consts');

var sharedRegexFlags = 'g';

// Errors are of form (.ERR) where . is any single character
var bracketErrorStringRegex = esc(consts.BRACKET_LEFT_STANDARD) + '.' + esc(consts.ERROR_TEXT + consts.BRACKET_RIGHT_STANDARD);
var bracketErrorRegex = new RegExp(bracketErrorStringRegex, sharedRegexFlags);
var commaSplitRegex = new RegExp('[' + esc(' ' + consts.BRACKET_LEFT_COMMA + consts.BRACKET_RIGHT_COMMA) + ']', sharedRegexFlags);

var integerRegexString = '[' + esc(consts.CHAR_COMMA_POWER) + ' 0-9]{0,' + consts.BRACKET_MAX_DIGITS + '}';
var fractionRegexString = integerRegexString + esc(consts.CHAR_COMMA_DIVIDE) + integerRegexString;
var makeCommaBracketRegexString = function makeCommaBracketRegexString(regexString) {
  return esc(consts.BRACKET_LEFT_COMMA) + regexString + esc(consts.BRACKET_RIGHT_COMMA);
};
var integerCommaBracketRegex = new RegExp(makeCommaBracketRegexString(integerRegexString), sharedRegexFlags);
var fractionCommaBracketRegex = new RegExp(makeCommaBracketRegexString(fractionRegexString), sharedRegexFlags);

var numberInBracketRegexString = '[0-9]{1,' + consts.BRACKET_MAX_DIGITS + '}';

var bracketOctaveRegexString = esc('(')
  + esc(consts.CHAR_OCTAVE)
  + '(' + esc('+')
  + '|' + esc('-')
  + ')' + numberInBracketRegexString
  + esc(')');
var bracketOctaveRegex = new RegExp(bracketOctaveRegexString, sharedRegexFlags);

var singleCharRegexString = '['
  + esc(consts.CHAR_SHARP)
  + esc(consts.CHAR_FLAT)
  + esc(consts.CHAR_SYNTONIC_ON)
  + esc(consts.CHAR_SYNTONIC_OFF)
  + esc(consts.CHAR_PYTHAG_ON)
  + esc(consts.CHAR_PYTHAG_OFF)
  + esc(consts.CHAR_MERCATOR_ON)
  + esc(consts.CHAR_MERCATOR_OFF)
  + esc(consts.CHAR_SMALL_ON)
  + esc(consts.CHAR_SMALL_OFF)
  + esc(consts.CHAR_TINY_ON)
  + esc(consts.CHAR_TINY_OFF)
  + esc(consts.CHAR_IDENTITY)
  + ']';
var singleCharRegex = new RegExp(singleCharRegexString, sharedRegexFlags);

// Generate Regex for something like (o+11), (#999999)
var charInBracketRegexString = esc(consts.BRACKET_LEFT_STANDARD) + singleCharRegexString + numberInBracketRegexString + esc(consts.BRACKET_RIGHT_STANDARD);
var charInBracketRegex = new RegExp(charInBracketRegexString, sharedRegexFlags);

var diatonicSingleCharRegex = new RegExp('[A-G]', sharedRegexFlags);
var octaveNumberSingleCharRegex = new RegExp('[0-9]', sharedRegexFlags);

module.exports = {
  REGEX_BRACKET_ERROR: bracketErrorRegex,
  REGEX_BRACKET_ACCIDENTAL: charInBracketRegex,
  REGEX_BRACKET_OCTAVE: bracketOctaveRegex,
  REGEX_BRACKET_COMMA_INTEGER: integerCommaBracketRegex,
  REGEX_BRACKET_COMMA_FRACTION: fractionCommaBracketRegex,
  REGEX_CHAR_ACCIDENTAL: singleCharRegex,
  REGEX_CHAR_DIATONIC: diatonicSingleCharRegex,
  REGEX_CHAR_OCTAVE: octaveNumberSingleCharRegex,

  REGEX_BRACKET_COMMA_SPLIT: commaSplitRegex
};
