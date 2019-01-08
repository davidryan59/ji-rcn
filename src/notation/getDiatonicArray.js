var ibn = require('is-bounded-number');

var consts = require('../constants/consts');
var peos = require('../constants/peos');
var getErrorNotation = require('./getErrorNotation');
var errorNotation = getErrorNotation('3');

var numError = Math.pow(10, consts.BRACKET_MAX_DIGITS);

var getDiatonicArray = function getDiatonicArray(exp3Input) {
  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name (F, C... B)
  var exp3 = exp3Input;

  // Deal with error cases
  if (!ibn(exp3, numError)) {
    // Error output
    return [errorNotation, peos.PEO_DIATONIC_C];
  }
  // Have a number
  exp3 = Math.round(exp3);
  switch (exp3) {
  case -1: return ['F', peos.PEO_DIATONIC_F.copy()];
  case 0: return ['C', peos.PEO_DIATONIC_C.copy()];
  case 1: return ['G', peos.PEO_DIATONIC_G.copy()];
  case 2: return ['D', peos.PEO_DIATONIC_D.copy()];
  case 3: return ['A', peos.PEO_DIATONIC_A.copy()];
  case 4: return ['E', peos.PEO_DIATONIC_E.copy()];
  case 5: return ['B', peos.PEO_DIATONIC_B.copy()];
  default: return [errorNotation, peos.PEO_DIATONIC_C];
  }
};

module.exports = getDiatonicArray;
