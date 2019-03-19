var ibn = require('is-bounded-number');

var consts = require('../constants/consts');
var peos = require('../constants/peos');
var getErrorNotation = require('./getErrorNotation');
var errorNotation = getErrorNotation('3');

var numError = Math.pow(10, consts.BRACKET_MAX_DIGITS);

var getDiatonicArray = function getDiatonicArray(exp3Input) {
  // Format of result: [resultAsNotation, resultAsPeo]

  // Turns an exponent of 3 between -1 and 6
  // into a standard scale note name (F, C... B)

  // Deal with error cases
  var exp3 = exp3Input;
  if (!ibn(exp3, numError)) {
    // Error output
    return [errorNotation, peos.C.copy()];
  }
  // Have a number
  exp3 = Math.round(exp3);
  switch (exp3) {
  case -1: return ['F', peos.F.copy()];
  case 0: return ['C', peos.C.copy()];
  case 1: return ['G', peos.G.copy()];
  case 2: return ['D', peos.D.copy()];
  case 3: return ['A', peos.A.copy()];
  case 4: return ['E', peos.E.copy()];
  case 5: return ['B', peos.B.copy()];
  default: return [errorNotation, peos.C.copy()];
  }
};

module.exports = getDiatonicArray;
