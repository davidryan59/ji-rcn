var ibn = require('is-bounded-number');

var consts = require('../constants/consts');
var getErrorNotation = require('./getErrorNotation');
var errorNotation = getErrorNotation('5');

var bl = consts.BRACKET_LEFT_STANDARD;
var br = consts.BRACKET_RIGHT_STANDARD;
var scu = consts.CHAR_SYNTONIC_ON;
var scd = consts.CHAR_SYNTONIC_OFF;

var numError = Math.pow(10, consts.BRACKET_MAX_DIGITS);
var numRepeats = consts.REPEAT_MAX_CHARS;


var get5Label = function get5Label(exp5Input) {
  // Shorthand for exponent of 5 is
  // repeated ' or . for
  // positive or negative exponents respectively
  var exp5 = exp5Input;

  // Deal with error cases
  if (!ibn(exp5, numError)) {
    // Error output
    return errorNotation;
  }
  // Its a valid number
  exp5 = Math.round(exp5);
  if (exp5 > numRepeats) {
    return '' + bl + scu + exp5 + br;
  } else if (exp5 > 0) {
    return scu.repeat(exp5);
  } else if (exp5 < -numRepeats) {
    return '' + bl + scd + -exp5 + br;
  } else if (exp5 < 0) {
    return scd.repeat(-exp5);
  }
  return '';
};

module.exports = get5Label;
