var ibn = require('is-bounded-number');
var Peo = require('peo');

var consts = require('../constants/consts');
var getErrorNotation = require('./getErrorNotation');

var bracketLeft = consts.BRACKET_LEFT_STANDARD;
var octaveChar = consts.CHAR_OCTAVE;
var bracketRight = consts.BRACKET_RIGHT_STANDARD;
var errorNotation = getErrorNotation(octaveChar);

var numError = Math.pow(10, consts.BRACKET_MAX_DIGITS);

var getOctaveArray = function getOctaveArray(exp2Input) {
  // Returns an octave number corresponding to a 2-exponent.
  // Note: 1 = 2^0 is in octave 4
  // Simpler format for octaves 0 to 9 (just use a single digit)
  // Full format for outside of this range, like (o+10) or (o-4321)
  var exp2 = exp2Input;

  // Deal with error cases
  if (!ibn(exp2, numError)) {
    // Error output
    return [errorNotation, new Peo()];
  }

  // Its a valid number
  exp2 = Math.round(exp2);
  var peo = new Peo(consts.PEO_OCTAVE, exp2);
  var standardOctaveNumber = exp2 + 4;     // For 1/1, exp2=0, and octave is 4 (e.g. C4)
  if (standardOctaveNumber > 9) {
    // Case 10...999999
    return ['' + bracketLeft + octaveChar + '+' + standardOctaveNumber + bracketRight, peo];
  } else if (standardOctaveNumber >= 0) {
    // Case 0..9
    return ['' + standardOctaveNumber, peo];
  }
  // Case -999999...-1
  return ['' + bracketLeft + octaveChar + '-' + (-standardOctaveNumber) + bracketRight, peo];
};

module.exports = getOctaveArray;
