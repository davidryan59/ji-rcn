var ibn = require('is-bounded-number');
var Peo = require('peo');

var consts = require('../constants/consts');
var peos = require('../constants/peos');
var getErrorNotation = require('./getErrorNotation');

var bl = consts.BRACKET_LEFT_STANDARD;
var br = consts.BRACKET_RIGHT_STANDARD;
var st = consts.CHAR_SHARP;
var ft = consts.CHAR_FLAT;
var errorNotation = getErrorNotation(st);

var numError = Math.pow(10, consts.BRACKET_MAX_DIGITS);
var numRepeats = consts.REPEAT_MAX_CHARS;

var getSharpFlatArray = function getSharpFlatArray(exp3) {
  // Diatonic scale is between -1 and +5
  // Centre of this scale is +2
  // -> Subtract 2, then divide by 7, then round
  // to get number of sharps (+ve) or flats (-ve)

  // Deal with error cases
  if (!ibn(exp3, numError)) {
    // Error output
    return [errorNotation, new Peo(), 0];
  }
  // Its a valid number
  var offset = Math.round(exp3) - 2;
  var sharps = Math.round(offset / 7);
  var peo = new Peo(peos.PEO_SHARP, sharps);

  var getResult = function getResult(txt) {
    return [txt, peo, sharps];
  };

  if (sharps > numRepeats) {
    return getResult('' + bl + st + sharps + br);
  } else if (sharps > 0) {
    return getResult(st.repeat(sharps));
  } else if (sharps < -numRepeats) {
    return getResult('' + bl + ft + -sharps + br);
  } else if (sharps < 0) {
    return getResult(ft.repeat(-sharps));
  }
  return getResult('');
};

module.exports = getSharpFlatArray;
