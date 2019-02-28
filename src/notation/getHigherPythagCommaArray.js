var ibn = require('is-bounded-number');
var Peo = require('peo');

var consts = require('../constants/consts');
var getErrorNotation = require('./getErrorNotation');

var bl = consts.BRACKET_LEFT_STANDARD;
var br = consts.BRACKET_RIGHT_STANDARD;
var numRepeats = consts.REPEAT_MAX_CHARS;
var numError = Math.pow(10, consts.BRACKET_MAX_DIGITS);
var zeroResult = function zeroResult(txtZero) {return [txtZero, new Peo()];};

var getHigherPythagCommaArray = function getHigherPythagCommaArray(exp3Input, exp3StartLevel, onPeo, onChar, offChar) {
  // Format of result: [resultAsNotation, resultAsPeo]

  // Deal with input error
  if (!ibn(exp3Input, numError)) return zeroResult(getErrorNotation(onChar));

  // Check the start level is OK
  var exp3Comma = onPeo.getPrimeExp(3);
  var startLevelChecked = exp3StartLevel || exp3Comma;

  // Use comma zero times if input was below start level
  var exp3Abs = Math.abs(exp3Input);
  if (exp3Abs < startLevelChecked) return zeroResult('');

  // Calculate integer value of how many times to use comma
  var exp3Adjusted = (exp3Abs - startLevelChecked) / exp3Comma;   // 0, 0.25, 0.5, 0.75, 1, 1.25, ...
  var intRes = Math.floor(exp3Adjusted) + 1;                   // 1, 1,    1,   1,    2, 2,    ...

  // Flip intRes if the input was negative
  if (exp3Input < 0) intRes = -intRes;
  var getResult = function getResult(txtRes) {return [txtRes, new Peo(onPeo, intRes)];};

  if (intRes > numRepeats) {
    return getResult('' + bl + onChar + intRes + br);
  } else if (intRes > 0) {
    return getResult(onChar.repeat(intRes));
  } else if (intRes < -numRepeats) {
    return getResult('' + bl + offChar + -intRes + br);
  }
  // intRes <= 0
  return getResult(offChar.repeat(-intRes));
};

module.exports = getHigherPythagCommaArray;
